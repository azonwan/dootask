<?php

namespace App\Models;

use Carbon\Carbon;
use App\Module\Base;
use App\Module\Image;
use App\Tasks\PushTask;
use App\Exceptions\ApiException;
use App\Tasks\WebSocketDialogMsgTask;
use Hhxsv5\LaravelS\Swoole\Task\Task;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\WebSocketDialogMsg
 *
 * @property int $id
 * @property int|null $dialog_id 对话ID
 * @property string|null $dialog_type 对话类型
 * @property int|null $userid 发送会员ID
 * @property string|null $type 消息类型
 * @property string|null $mtype 消息类型（用于搜索）
 * @property array|mixed $msg 详细消息
 * @property array|mixed $emoji emoji回复
 * @property string|null $key 搜索关键词
 * @property int|null $read 已阅数量
 * @property int|null $send 发送数量
 * @property int|null $tag 标注会员ID
 * @property int|null $todo 设为待办会员ID
 * @property int|null $link 是否存在链接
 * @property int|null $modify 是否编辑
 * @property int|null $reply_num 有多少条回复
 * @property int|null $reply_id 回复ID
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read int|mixed $percentage
 * @property-read \App\Models\WebSocketDialogMsg|null $reply_data
 * @property-read \App\Models\WebSocketDialog|null $webSocketDialog
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg query()
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereDialogId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereDialogType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereEmoji($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereModify($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereMsg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereMtype($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereReplyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereReplyNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereSend($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereTodo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg whereUserid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|WebSocketDialogMsg withoutTrashed()
 * @mixin \Eloquent
 */
class WebSocketDialogMsg extends AbstractModel
{
    use SoftDeletes;

    protected $appends = [
        'percentage',
        'reply_data',
        'forward_data',
    ];

    protected $hidden = [
        'key',
        'updated_at',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function webSocketDialog(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(WebSocketDialog::class, 'id', 'dialog_id');
    }

    /**
     * 阅读占比
     * @return int|mixed
     */
    public function getPercentageAttribute()
    {
        if (!isset($this->appendattrs['percentage'])) {
            $this->generatePercentage();
        }
        return $this->appendattrs['percentage'];
    }

    /**
     * 回复消息详情
     * @return WebSocketDialogMsg|null
     */
    public function getReplyDataAttribute()
    {
        if (!isset($this->appendattrs['reply_data'])) {
            $this->appendattrs['reply_data'] = null;
            if ($this->reply_id > 0) {
                $this->appendattrs['reply_data'] = self::find($this->reply_id, ['id', 'userid', 'type', 'msg'])?->cancelAppend() ?: null;
            }
        }
        return $this->appendattrs['reply_data'];
    }

    /**
     * 转发消息详情
     * @return WebSocketDialogMsg|null
     */
    public function getForwardDataAttribute()
    {
        if (!isset($this->appendattrs['forward_data'])) {
            $this->appendattrs['forward_data'] = null;
            if ($this->forward_id > 0) {
                $this->appendattrs['forward_data'] = self::find($this->forward_id, ['id', 'userid', 'type', 'msg'])?->cancelAppend() ?: null;
            }
        }
        return $this->appendattrs['forward_data'];
    }

    /**
     * 消息格式化
     * @param $value
     * @return array|mixed
     */
    public function getMsgAttribute($value)
    {
        if (is_array($value)) {
            return $value;
        }
        $value = Base::json2array($value);
        if ($this->type === 'file') {
            $value['type'] = in_array($value['ext'], ['jpg', 'jpeg', 'webp', 'png', 'gif']) ? 'img' : 'file';
            $value['path'] = Base::fillUrl($value['path']);
            $value['thumb'] = Base::fillUrl($value['thumb'] ?: Base::extIcon($value['ext']));
        } else if ($this->type === 'record') {
            $value['path'] = Base::fillUrl($value['path']);
        }
        return $value;
    }

    /**
     * emoji回复格式化
     * @param $value
     * @return array|mixed
     */
    public function getEmojiAttribute($value)
    {
        if (is_array($value)) {
            return $value;
        }
        return Base::json2array($value);
    }

    /**
     * 获取占比
     * @param bool|int $increment 是否新增阅读数
     * @return int
     */
    public function generatePercentage($increment = false) {
        if ($increment) {
            $this->increment('read', is_bool($increment) ? 1 : $increment);
        }
        if ($this->read > $this->send || empty($this->send)) {
            return $this->appendattrs['percentage'] = 100;
        } else {
            return $this->appendattrs['percentage'] = intval($this->read / $this->send * 100);
        }
    }

    /**
     * 标记已送达 同时 告诉发送人已送达
     * @param $userid
     * @return bool
     */
    public function readSuccess($userid)
    {
        if (empty($userid)) {
            return false;
        }
        self::transaction(function() use ($userid) {
            $msgRead = WebSocketDialogMsgRead::whereMsgId($this->id)->whereUserid($userid)->lockForUpdate()->first();
            if (empty($msgRead)) {
                $msgRead = WebSocketDialogMsgRead::createInstance([
                    'dialog_id' => $this->dialog_id,
                    'msg_id' => $this->id,
                    'userid' => $userid,
                    'after' => 1,
                ]);
                if ($msgRead->saveOrIgnore()) {
                    $this->send = WebSocketDialogMsgRead::whereMsgId($this->id)->count();
                    $this->save();
                } else {
                    return;
                }
            }
            if (!$msgRead->read_at) {
                $msgRead->read_at = Carbon::now();
                $msgRead->save();
                $this->generatePercentage(true);
                PushTask::push([
                    'userid' => $this->userid,
                    'msg' => [
                        'type' => 'dialog',
                        'mode' => 'readed',
                        'data' => [
                            'id' => $this->id,
                            'read' => $this->read,
                            'percentage' => $this->percentage,
                        ],
                    ]
                ]);
            }
        });
        return true;
    }

    /**
     * emoji回复
     * @param $symbol
     * @param int $sender       发送的会员ID
     * @return mixed
     */
    public function emojiMsg($symbol, $sender)
    {
        $exist = false;
        $array = $this->emoji;
        foreach ($array as $index => &$item) {
            if ($item['symbol'] === $symbol) {
                if (in_array($sender, $item['userids'])) {
                    // 已存在 去除
                    $item['userids'] = array_values(array_diff($item['userids'], [$sender]));
                    if (empty($item['userids'])) {
                        unset($array[$index]);
                        $array = array_values($array);
                    }
                } else {
                    // 未存在 添加
                    array_unshift($item['userids'], $sender);
                }
                $exist = true;
                break;
            }
        }
        if (!$exist) {
            array_unshift($array, [
                'symbol' => $symbol,
                'userids' => [$sender]
            ]);
        }
        //
        $this->emoji = Base::array2json($array);
        $this->save();
        $resData = [
            'id' => $this->id,
            'emoji' => $array,
        ];
        //
        $dialog = WebSocketDialog::find($this->dialog_id);
        $dialog?->pushMsg('update', $resData);
        //
        return Base::retSuccess('success', $resData);
    }

    /**
     * 标注、取消标注
     * @param int $sender       标注的会员ID
     * @return mixed
     */
    public function toggleTagMsg($sender)
    {
        if (in_array($this->type, ['tag', 'todo', 'notice'])) {
            return Base::retError('此消息不支持标注');
        }
        $before = $this->tag;
        $this->tag = $before ? 0 : $sender;
        $this->save();
        $resData = [
            'id' => $this->id,
            'tag' => $this->tag,
        ];
        //
        $data = [
            'update' => $resData
        ];
        $res = self::sendMsg(null, $this->dialog_id, 'tag', [
            'action' => $this->tag ? 'add' : 'remove',
            'data' => [
                'id' => $this->id,
                'type' => $this->type,
                'msg' => $this->quoteTextMsg(),
            ]
        ], $sender);
        if (Base::isSuccess($res)) {
            $data['add'] = $res['data'];
            $dialog = WebSocketDialog::find($this->dialog_id);
            $dialog->pushMsg('update', $resData);
        } else {
            $this->tag = $before;
            $this->save();
        }
        //
        return Base::retSuccess($this->tag ? '标注成功' : '取消成功', $data);
    }

    /**
     * 设待办、取消待办
     * @param int $sender       设待办的会员ID
     * @param array $userids    设置给指定会员
     * @return mixed
     */
    public function toggleTodoMsg($sender, $userids = [])
    {
        if (in_array($this->type, ['tag', 'todo', 'notice'])) {
            return Base::retError('此消息不支持设待办');
        }
        if ($this->todo && $this->todo != $sender) {
            return Base::retError('仅支持设此待办人员【' . User::userid2nickname($this->todo) . '】取消');
        }
        $before = $this->todo;
        $this->todo = $before ? 0 : $sender;
        $this->save();
        $resData = [
            'id' => $this->id,
            'todo' => $this->todo,
        ];
        //
        $data = [
            'update' => $resData
        ];
        $res = self::sendMsg(null, $this->dialog_id, 'todo', [
            'action' => $this->todo ? 'add' : 'remove',
            'data' => [
                'id' => $this->id,
                'type' => $this->type,
                'msg' => $this->quoteTextMsg(),
                'userids' => implode(",", $userids),
            ]
        ], $sender);
        if (Base::isSuccess($res)) {
            $data['add'] = $res['data'];
            $dialog = WebSocketDialog::find($this->dialog_id);
            $dialog->pushMsg('update', array_merge($resData, ['dialog_id' => $this->dialog_id]));
            //
            if ($this->todo) {
                $useridList = $dialog->dialogUser->pluck('userid')->toArray();
                foreach ($useridList as $userid) {
                    if ($userids && !in_array($userid, $userids)) {
                        continue;
                    }
                    if (empty($userid)) {
                        continue;
                    }
                    WebSocketDialogMsgTodo::createInstance([
                        'dialog_id' => $this->dialog_id,
                        'msg_id' => $this->id,
                        'userid' => $userid,
                    ])->saveOrIgnore();
                }
            } else {
                WebSocketDialogMsgTodo::whereMsgId($this->id)->delete();
            }
        } else {
            $this->todo = $before;
            $this->save();
        }
        //
        return Base::retSuccess($this->todo ? '设置成功' : '取消成功', $data);
    }

    /**
     * 置顶、取消置顶
     * @param int $sender       置顶的会员ID
     * @return mixed
     */
    public function toggleTopMsg($sender)
    {
        $before = $this->top;
        $beforeTopAt = $this->top_at;
        $this->top = $before ? 0 : $sender;
        $this->top_at = $before ? null : Carbon::now();
        $this->save();
        $resData = [
            'id' => $this->id,
            'top' => $this->top,
            'top_at' => $this->top_at,
            'dialog_id' => $this->dialog_id
        ];
        //
        $data = [
            'update' => $resData
        ];
        $res = self::sendMsg(null, $this->dialog_id, 'top', [
            'action' => $this->top ? 'add' : 'remove',
            'data' => [
                'id' => $this->id,
                'type' => $this->type,
                'msg' => $this->quoteTextMsg(),
            ]
        ], $sender);
        if (Base::isSuccess($res)) {
            $dialog = WebSocketDialog::find($this->dialog_id);
            if ($this->top) {
                $oldTops = self::whereDialogId($this->dialog_id)->where('id', '!=', $this->id)->where('top', '>', 0)->get();
                foreach($oldTops as $oldTop){
                    $oldTop->top = 0;
                    $oldTop->top_at = null;
                    $oldTop->save();
                    $dialog->pushMsg('update', [
                        'id' => $oldTop->id,
                        'top' => $oldTop->top,
                        'top_at' => $oldTop->top_at,
                    ]);
                }
            }
            $data['add'] = $res['data'];
            $resData['tops'] = self::whereDialogId($dialog->id)->whereNotNull('top_at')->orderByDesc('top_at')->take(50)->get();
            $dialog->pushMsg('update', $resData);
        } else {
            $this->top = $before;
            $this->top_at = $beforeTopAt;
            $this->save();
        }
        //
        return Base::retSuccess($this->top ? '置顶成功' : '取消成功', $data);
    }

    /**
     * 转发消息
     * @param array|int $dialogids
     * @param array|int $userids
     * @param User $user    发送的会员
     * @param int $showSource    是否显示原发送者信息
     * @param string $leaveMessage    转发留言
     * @return mixed
     */
    public function forwardMsg($dialogids, $userids, $user, $showSource = 1, $leaveMessage = '')
    {
        return AbstractModel::transaction(function() use ($dialogids, $user, $userids, $showSource, $leaveMessage) {
            $originalMsg = Base::json2array($this->getRawOriginal('msg'));
            $msgs = [];
            $already = [];
            if ($dialogids) {
                if (!is_array($dialogids)) {
                    $dialogids = [$dialogids];
                }
                foreach ($dialogids as $dialogid) {
                    $res = self::sendMsg('forward-'.( $showSource ? 1 : 0).'-'.($this->forward_id ?: $this->id), $dialogid, $this->type, $originalMsg, $user->userid);
                    if (Base::isSuccess($res)) {
                        $msgs[] = $res['data'];
                        $already[] = $dialogid;
                    }
                    if ($leaveMessage) {
                        self::sendMsg(null, $dialogid, 'text', ['text' => $leaveMessage], $user->userid);
                    }
                }
            }
            if ($userids) {
                if (!is_array($userids)) {
                    $userids = [$userids];
                }
                foreach ($userids as $userid) {
                    if (!User::whereUserid($userid)->exists()) {
                        continue;
                    }
                    $dialog = WebSocketDialog::checkUserDialog($user, $userid);
                    if ($dialog && !in_array($dialog->id, $already)) {
                        $res = self::sendMsg('forward-'.( $showSource ? 1 : 0).'-'.($this->forward_id  ?: $this->id), $dialog->id, $this->type, $originalMsg, $user->userid);
                        if (Base::isSuccess($res)) {
                            $msgs[] = $res['data'];
                        }
                        if ($leaveMessage) {
                            self::sendMsg(null, $dialog->id, 'text', ['text' => $leaveMessage], $user->userid);
                        }
                    }
                }
            }
            return Base::retSuccess('转发成功', [
                'msgs' => $msgs
            ]);
        });
    }

    /**
     * 删除消息
     * @param array|int $ids
     * @return void
     */
    public static function deleteMsgs($ids) {
        $ids = Base::arrayRetainInt(is_array($ids) ? $ids : [$ids], true);
        AbstractModel::transaction(function() use ($ids) {
            $dialogIds = WebSocketDialogMsg::select('dialog_id')->whereIn("id", $ids)->distinct()->get()->pluck('dialog_id');
            $replyIds = WebSocketDialogMsg::select('reply_id')->whereIn("id", $ids)->distinct()->get()->pluck('reply_id');
            //
            WebSocketDialogMsgRead::whereIn('msg_id', $ids)->whereNull('read_at')->delete();    // 未阅读记录不需要软删除，直接删除即可
            WebSocketDialogMsgTodo::whereIn('msg_id', $ids)->delete();
            self::whereIn('id', $ids)->delete();
            //
            $dialogDatas = WebSocketDialog::whereIn('id', $dialogIds)->get();
            foreach ($dialogDatas as $dialogData) {
                $dialogData->updateMsgLastAt();
            }
            foreach ($replyIds as $id) {
                self::whereId($id)->update(['reply_num' => self::whereReplyId($id)->count()]);
            }
        });
    }

    /**
     * 撤回消息
     * @return void
     */
    public function withdrawMsg()
    {
        $send_dt = Carbon::parse($this->created_at)->addDay();
        if ($send_dt->lt(Carbon::now())) {
            throw new ApiException('已超过24小时，此消息不能撤回');
        }
        AbstractModel::transaction(function() {
            $deleteRead = WebSocketDialogMsgRead::whereMsgId($this->id)->whereNull('read_at')->delete();    // 未阅读记录不需要软删除，直接删除即可
            $this->delete();
            //
            if ($this->reply_id > 0) {
                self::whereId($this->reply_id)->decrement('reply_num');
            }
            //
            $dialogData = $this->webSocketDialog;
            if ($dialogData) {
                foreach ($dialogData->dialogUser as $dialogUser) {
                    $dialogUser->updated_at = Carbon::now();
                    $dialogUser->save();
                }
                $userids = $dialogData->dialogUser->pluck('userid')->toArray();
                PushTask::push([
                    'userid' => $userids,
                    'msg' => [
                        'type' => 'dialog',
                        'mode' => 'delete',
                        'data' => [
                            'id' => $this->id,
                            'dialog_id' => $this->dialog_id,
                            'last_msg' => $dialogData->updateMsgLastAt(),
                            'update_read' => $deleteRead ? 1 : 0
                        ],
                    ]
                ]);
            }
            //
            WebSocketDialogMsgTodo::whereMsgId($this->id)->delete();
        });
    }

    /**
     * 预览消息
     * @param bool $preserveHtml    保留html格式
     * @param null|array $data
     * @return string
     */
    public function previewMsg($preserveHtml = false, $data = null)
    {
        if ($data === null) {
            $data = [
                'type' => $this->type,
                'msg' => $this->msg,
            ];
        }
        switch ($data['type']) {
            case 'text':
            case 'word-chain':
            case 'vote':
                return $this->previewTextMsg($data['msg']['text'], $preserveHtml);
            case 'record':
                return "[语音]";
            case 'meeting':
                return "[会议] ${$data['msg']['name']}";
            case 'file':
                if ($data['msg']['type'] == 'img') {
                    return "[图片]";
                }
                return "[文件] {$data['msg']['name']}";
            case 'tag':
                $action = $data['msg']['action'] === 'remove' ? '取消标注' : '标注';
                return "[{$action}] {$this->previewMsg(false, $data['msg']['data'])}";
            case 'top':
                $action = $data['msg']['action'] === 'remove' ? '取消置顶' : '置顶';
                return "[{$action}] {$this->previewMsg(false, $data['msg']['data'])}";
            case 'todo':
                $action = $data['msg']['action'] === 'remove' ? '取消待办' : ($data['msg']['action'] === 'done' ? '完成' : '设待办');
                return "[{$action}] {$this->previewMsg(false, $data['msg']['data'])}";
            case 'notice':
                return $data['msg']['notice'];
            default:
                return "[未知的消息]";
        }
    }

    /**
     * 生成关键词
     * @return string
     */
    public function generateMsgKey()
    {
        return match ($this->type) {
            'text' => str_replace("&nbsp;", " ", strip_tags($this->msg['text'])),
            'meeting', 'file' => $this->msg['name'],
            default => '',
        };
    }

    /**
     * 返回引用消息（如果是文本消息则截取）
     * @param int $strlen
     * @return array|mixed
     */
    public function quoteTextMsg($strlen = 30)
    {
        $msg = $this->msg;
        if ($this->type === 'text') {
            $msg['text'] = $this->previewTextMsg($msg['text']);
            if (mb_strlen($msg['text']) > $strlen) {
                $msg['text'] = mb_substr($msg['text'], 0, $strlen - 3) . "...";
            }
        }
        return $msg;
    }

    /**
     * 返回文本预览消息
     * @param $text
     * @param bool $preserveHtml    保留html格式
     * @return string|string[]|null
     */
    private function previewTextMsg($text, $preserveHtml = false)
    {
        if (!$text) return '';
        $text = preg_replace("/<img\s+class=\"emoticon\"[^>]*?alt=\"(\S+)\"[^>]*?>/", "[$1]", $text);
        $text = preg_replace("/<img\s+class=\"emoticon\"[^>]*?>/", "[动画表情]", $text);
        $text = preg_replace("/<img\s+class=\"browse\"[^>]*?>/", "[图片]", $text);
        if (!$preserveHtml) {
            $text = strip_tags($text);
            $text = str_replace(["&nbsp;", "&amp;", "&lt;", "&gt;"], [" ", "&", "<", ">"], $text);
        }
        return $text;
    }

    /**
     * 处理文本消息内容，用于发送前
     * @param $text
     * @param $dialog_id
     * @return mixed|string|string[]
     */
    public static function formatMsg($text, $dialog_id)
    {
        @ini_set("pcre.backtrack_limit", 999999999);
        // 基础处理
        $text = preg_replace("/<(\/[a-zA-Z]+)\s*>/s", "<$1>", $text);
        // 图片 [:IMAGE:className:width:height:src:alt:]
        preg_match_all("/<img\s+src=\"data:image\/(png|jpg|jpeg|webp|gif);base64,(.*?)\"(.*?)>(<\/img>)*/s", $text, $matchs);
        foreach ($matchs[2] as $key => $base64) {
            $imagePath = "uploads/chat/" . date("Ym") . "/" . $dialog_id . "/";
            Base::makeDir(public_path($imagePath));
            $imagePath .= md5s($base64) . "." . $matchs[1][$key];
            if (Base::saveContentImage(public_path($imagePath), base64_decode($base64))) {
                $imageSize = getimagesize(public_path($imagePath));
                if ($extension = Image::thumbImage(public_path($imagePath), public_path($imagePath) . "_thumb.{*}", 320, 0)) {
                    $imagePath .= "_thumb.{$extension}";
                }
                $text = str_replace($matchs[0][$key], "[:IMAGE:browse:{$imageSize[0]}:{$imageSize[1]}:{$imagePath}::]", $text);
            }
        }
        // 表情图片
        preg_match_all("/<img\s+class=\"emoticon\"(.*?)>/s", $text, $matchs);
        foreach ($matchs[1] as $key => $str) {
            preg_match("/data-asset=\"(.*?)\"/", $str, $matchAsset);
            preg_match("/data-name=\"(.*?)\"/", $str, $matchName);
            $imageSize = null;
            $imagePath = "";
            $imageName = "";
            if ($matchAsset[1] === "emosearch") {
                preg_match("/src=\"(.*?)\"/", $str, $matchSrc);
                if ($matchSrc) {
                    $srcMd5 = md5($matchSrc[1]);
                    $imagePath = "uploads/emosearch/" . substr($srcMd5, 0, 2) . "/" . substr($srcMd5, 32 - 2) . "/";
                    Base::makeDir(public_path($imagePath));
                    $imagePath .= md5s($matchSrc[1]);
                    if (file_exists(public_path($imagePath))) {
                        $imageSize = getimagesize(public_path($imagePath));
                    } else {
                        $image = file_get_contents($matchSrc[1]);
                        if ($image && file_put_contents(public_path($imagePath), $image)) {
                            $imageSize = getimagesize(public_path($imagePath));
                            // 添加后缀
                            if ($imageSize && !str_contains($imagePath, '.')) {
                                preg_match("/^image\/(png|jpg|jpeg|webp|gif)$/", $imageSize['mime'], $matchMine);
                                if ($matchMine) {
                                    $imageNewPath = $imagePath . "." . $matchMine[1];
                                    if (rename(public_path($imagePath), public_path($imageNewPath))) {
                                        $imagePath = $imageNewPath;
                                    }
                                }
                            }
                        }
                    }
                }
            } elseif (file_exists(public_path($matchAsset[1]))) {
                $imagePath = $matchAsset[1];
                $imageName = $matchName[1];
                $imageSize = getimagesize(public_path($matchAsset[1]));
            }
            if ($imageSize) {
                $text = str_replace($matchs[0][$key], "[:IMAGE:emoticon:{$imageSize[0]}:{$imageSize[1]}:{$imagePath}:{$imageName}:]", $text);
            } else {
                $text = str_replace($matchs[0][$key], "[:IMAGE:browse:90:90:images/other/imgerr.jpg::]", $text);
            }
        }
        // 其他网络图片
        $imageSaveLocal = Base::settingFind("system", "image_save_local");
        preg_match_all("/<img[^>]*?src=([\"'])(.*?(png|jpg|jpeg|webp|gif).*?)\\1[^>]*?>/is", $text, $matchs);
        foreach ($matchs[2] as $key => $str) {
            if ($imageSaveLocal === 'close') {
                $imageSize = getimagesize($str);
                if ($imageSize === false) {
                    $imageSize = ["auto", "auto"];
                }
                $imagePath = "base64-" . base64_encode($str);
                $text = str_replace($matchs[0][$key], "[:IMAGE:browse:{$imageSize[0]}:{$imageSize[1]}:{$imagePath}::]", $text);
                continue;
            }
            if (str_starts_with($str, "{{RemoteURL}}")) {
                $imagePath = Base::leftDelete($str, "{{RemoteURL}}");
                $imagePath = Base::thumbRestore($imagePath);
            } else {
                $imagePath = "uploads/chat/" . date("Ym") . "/" . $dialog_id . "/";
                Base::makeDir(public_path($imagePath));
                $imagePath .= md5s($str) . "." . $matchs[3][$key];
            }
            if (file_exists(public_path($imagePath))) {
                $imageSize = getimagesize(public_path($imagePath));
                if ($extension = Image::thumbImage(public_path($imagePath), public_path($imagePath) . "_thumb.{*}", 320, 0)) {
                    $imagePath .= "_thumb.{$extension}";
                }
                $text = str_replace($matchs[0][$key], "[:IMAGE:browse:{$imageSize[0]}:{$imageSize[1]}:{$imagePath}::]", $text);
            } else {
                $image = file_get_contents($str);
                if (empty($image)) {
                    $text = str_replace($matchs[0][$key], "[:IMAGE:browse:90:90:images/other/imgerr.jpg::]", $text);
                } else if (Base::saveContentImage(public_path($imagePath), $image)) {
                    $imageSize = getimagesize(public_path($imagePath));
                    if ($extension = Image::thumbImage(public_path($imagePath), public_path($imagePath) . "_thumb.{*}", 320, 0)) {
                        $imagePath .= "_thumb.{$extension}";
                    }
                    $text = str_replace($matchs[0][$key], "[:IMAGE:browse:{$imageSize[0]}:{$imageSize[1]}:{$imagePath}::]", $text);
                }
            }
        }
        // @成员、#任务、~文件
        preg_match_all("/<span\s+class=\"mention\"(.*?)>.*?<\/span>.*?<\/span>.*?<\/span>/s", $text, $matchs);
        foreach ($matchs[1] as $key => $str) {
            preg_match("/data-denotation-char=\"(.*?)\"/", $str, $matchChar);
            preg_match("/data-id=\"(.*?)\"/", $str, $matchId);
            preg_match("/data-value=\"(.*?)\"/s", $str, $matchValye);
            $keyId = $matchId[1];
            if ($matchChar[1] === "~") {
                if (Base::isNumber($keyId)) {
                    $file = File::permissionFind($keyId, User::auth());
                    if ($file->type == 'folder') {
                        throw new ApiException('文件夹不支持分享');
                    }
                    $fileLink = $file->getShareLink(User::userid());
                    $keyId = $fileLink['code'];
                } else {
                    preg_match("/\/single\/file\/(.*?)$/i", $keyId, $match);
                    if ($match && strlen($match[1]) >= 8) {
                        $keyId = $match[1];
                    } else {
                        throw new ApiException('文件分享错误');
                    }
                }
            }
            $text = str_replace($matchs[0][$key], "[:{$matchChar[1]}:{$keyId}:{$matchValye[1]}:]", $text);
        }
        // 处理快捷消息
        preg_match_all("/<span[^>]*?data-quick-key=([\"'])(.*?)\\1[^>]*?>(.*?)<\/span>/is", $text, $matchs);
        foreach ($matchs[0] as $key => $str) {
            $quickKey = $matchs[2][$key];
            $quickLabel = $matchs[3][$key];
            if ($quickKey && $quickLabel) {
                $quickKey = str_replace(":", "", $quickKey);
                $quickLabel = str_replace(":", "", $quickLabel);
                $text = str_replace($str, "[:QUICK:{$quickKey}:{$quickLabel}:]", $text);
            }
        }
        // 处理链接标签
        preg_match_all("/<a[^>]*?href=([\"'])(.*?)\\1[^>]*?>(.*?)<\/a>/is", $text, $matchs);
        foreach ($matchs[0] as $key => $str) {
            $herf = $matchs[2][$key];
            $title = $matchs[3][$key] ?: $herf;
            preg_match("/\/single\/file\/(.*?)$/i", strip_tags($title), $match);
            if ($match && strlen($match[1]) >= 8) {
                $file = File::select(['files.id', 'files.name', 'files.ext'])->join('file_links as L', 'files.id', '=', 'L.file_id')->where('L.code', $match[1])->first();
                if ($file && $file->name) {
                    $name = $file->ext ? "{$file->name}.{$file->ext}" : $file->name;
                    $text = str_replace($str, "[:~:{$match[1]}:{$name}:]", $text);
                    continue;
                }
            }
            $herf = base64_encode($herf);
            $title = base64_encode($title);
            $text = str_replace($str, "[:LINK:{$herf}:{$title}:]", $text);
        }
        // 文件分享链接
        preg_match_all("/(https*:\/\/)((\w|=|\?|\.|\/|&|-|:|\+|%|;|#|@|,|!)+)/i", $text, $matchs);
        if ($matchs) {
            foreach ($matchs[0] as $str) {
                preg_match("/\/single\/file\/(.*?)$/i", $str, $match);
                if ($match && strlen($match[1]) >= 8) {
                    $file = File::select(['files.id', 'files.name', 'files.ext'])->join('file_links as L', 'files.id', '=', 'L.file_id')->where('L.code', $match[1])->first();
                    if ($file && $file->name) {
                        $name = $file->ext ? "{$file->name}.{$file->ext}" : $file->name;
                        $text = str_replace($str, "[:~:{$match[1]}:{$name}:]", $text);
                    }
                }
            }
        }
        // 过滤标签
        $text = strip_tags($text, '<blockquote> <strong> <pre> <ol> <ul> <li> <em> <p> <s> <u> <a>');
        $text = preg_replace("/\<(blockquote|strong|pre|ol|ul|li|em|p|s|u).*?\>/is", "<$1>", $text);    // 不用去除a标签，上面已经处理过了
        $text = preg_replace_callback("/\[:LINK:(.*?):(.*?):\]/i", function (array $match) {
            return "<a href=\"" . base64_decode($match[1]) . "\" target=\"_blank\">" . base64_decode($match[2]) . "</a>";
        }, $text);
        $text = preg_replace_callback("/\[:IMAGE:(.*?):(.*?):(.*?):(.*?):(.*?):\]/i", function (array $match) {
            $wh = $match[2] === 'auto' ? "" : " width=\"{$match[2]}\" height=\"{$match[3]}\"";
            $src = str_starts_with($match[4], "base64-") ? base64_decode(substr($match[4], 7)) : "{{RemoteURL}}{$match[4]}";
            return "<img class=\"{$match[1]}\"{$wh} src=\"{$src}\" alt=\"{$match[5]}\"/>";
        }, $text);
        $text = preg_replace("/\[:@:(.*?):(.*?):\]/i", "<span class=\"mention user\" data-id=\"$1\">@$2</span>", $text);
        $text = preg_replace("/\[:#:(.*?):(.*?):\]/is", "<span class=\"mention task\" data-id=\"$1\">#$2</span>", $text);
        $text = preg_replace("/\[:~:(.*?):(.*?):\]/i", "<a class=\"mention file\" href=\"{{RemoteURL}}single/file/$1\" target=\"_blank\">~$2</a>", $text);
        $text = preg_replace("/\[:QUICK:(.*?):(.*?):\]/i", "<span data-quick-key=\"$1\">$2</span>", $text);
        return preg_replace("/^(<p><\/p>)+|(<p><\/p>)+$/i", "", $text);
    }

    /**
     * 发送消息、修改消息
     * @param string $action            动作
     * - reply-98：回复消息ID=98
     * - update-99：更新消息ID=99（标记修改）
     * - change-99：更新消息ID=99（不标记修改）
     * - forward-99：转发消息ID=99
     * @param int $dialog_id            会话ID（即 聊天室ID）
     * @param string $type              消息类型
     * @param array $msg                发送的消息
     * @param int|null $sender          发送的会员ID（默认自己，0为系统）
     * @param bool $push_self           推送-是否推给自己
     * @param bool $push_retry          推送-失败后重试1次（有时候在事务里执行，数据还没生成时会出现找不到消息的情况）
     * @param bool|null $push_silence   推送-静默
     * - type = [text|file|record|meeting]  默认为：false
     * @return array
     */
    public static function sendMsg($action, $dialog_id, $type, $msg, $sender = null, $push_self = false, $push_retry = false, $push_silence = null)
    {
        $link = 0;
        $mtype = $type;
        if ($type === 'text') {
            if (str_contains($msg['text'], '<a ') || preg_match("/https*:\/\//", $msg['text'])) {
                $link = 1;
            }
            if (str_contains($msg['text'], '<img ')) {
                $mtype = str_contains($msg['text'], '"emoticon"') ? 'emoticon' : 'image';
            }
            preg_match_all("/@([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6})/i", $msg['text'], $matchs);
            foreach($matchs[0] as $key => $item) {
                $aiUser = User::whereEmail($matchs[1][$key])->whereDisableAt(null)->first();
                if ($aiUser) {
                    $msg['text'] = str_replace($item, "<span class=\"mention user\" data-id=\"{$aiUser->userid}\">@{$aiUser->nickname}</span>", $msg['text']);
                }
            }
        } elseif ($type === 'file') {
            if (in_array($msg['ext'], ['jpg', 'jpeg', 'webp', 'png', 'gif'])) {
                $mtype = 'image';
            }
        }
        if ($push_silence === null) {
            $push_silence = !in_array($type, ["text", "file", "record", "meeting"]);
        }
        //
        $update_id = preg_match("/^update-(\d+)$/", $action, $match) ? $match[1] : 0;
        $change_id = preg_match("/^change-(\d+)$/", $action, $match) ? $match[1] : 0;
        $reply_id = preg_match("/^reply-(\d+)$/", $action, $match) ? $match[1] : 0;
        $forward_id = preg_match("/^forward-(\d+)-(\d+)$/", $action, $match) ? $match[2] : 0;
        $sender = $sender === null ? User::userid() : $sender;
        //
        $dialog = WebSocketDialog::find($dialog_id);
        if (empty($dialog)) {
            throw new ApiException('获取会话失败');
        }
        if ($sender > 0) {
            $dialog->checkMute($sender);
        }
        //
        $modify = 1;
        if ($change_id) {
            $modify = 0;
            $update_id = $change_id;
        }
        if ($update_id) {
            // 修改
            $dialogMsg = self::whereId($update_id)->whereDialogId($dialog_id)->first();
            if (empty($dialogMsg)) {
                throw new ApiException('消息不存在');
            }
            if ($dialogMsg->type !== 'text' && $dialogMsg->type !== 'vote') {
                throw new ApiException('此消息不支持此操作');
            }
            if ($dialogMsg->userid != $sender && $dialogMsg->type !== 'vote') {
                throw new ApiException('仅支持修改自己的消息');
            }
            //
            $updateData = [
                'mtype' => $mtype,
                'link' => $link,
                'msg' => $msg,
                'modify' => $modify,
            ];
            $dialogMsg->updateInstance($updateData);
            $dialogMsg->key = $dialogMsg->generateMsgKey();
            $dialogMsg->save();
            //
            $dialogMsg->msgJoinGroup($dialog);
            //
            $dialog->pushMsg('update', array_merge($updateData, [
                'id' => $dialogMsg->id
            ]));
            //
            return Base::retSuccess('修改成功', $dialogMsg);
        } else {
            // 发送
            if ($reply_id && !self::whereId($reply_id)->increment('reply_num')) {
                throw new ApiException('回复的消息不存在');
            }
            // 转发
            if ($forward_id && !self::whereId($forward_id)->increment('forward_num')) {
                throw new ApiException('转发的消息不存在');
            }
            //
            $dialogMsg = self::createInstance([
                'dialog_id' => $dialog_id,
                'dialog_type' => $dialog->type,
                'reply_id' => $reply_id,
                'userid' => $sender,
                'type' => $type,
                'mtype' => $mtype,
                'link' => $link,
                'msg' => $msg,
                'read' => 0,
                'forward_id' => $forward_id,
                'forward_show' => $forward_id ? $match[1] : 1,
            ]);
            AbstractModel::transaction(function () use ($dialog, $dialogMsg) {
                $dialog->last_at = Carbon::now();
                $dialog->save();
                $dialogMsg->send = 1;
                $dialogMsg->key = $dialogMsg->generateMsgKey();
                $dialogMsg->save();
                WebSocketDialogUser::whereDialogId($dialog->id)->change(['updated_at' => Carbon::now()->toDateTimeString('millisecond')]);
            });
            //
            $task = new WebSocketDialogMsgTask($dialogMsg->id);
            if ($push_self) {
                $task->setIgnoreFd(null);
            }
            if ($push_retry) {
                $task->setMsgNotExistRetry(true);
            }
            if ($push_silence) {
                $task->setSilence($push_silence);
            }
            Task::deliver($task);
            //
            return Base::retSuccess('发送成功', $dialogMsg);
        }
    }

    /**
     * 将被@的人加入群
     * @param WebSocketDialog $dialog 对话
     * @return array
     */
    public function msgJoinGroup(WebSocketDialog $dialog)
    {
        $updateds = [];
        $silences = [];
        foreach ($dialog->dialogUser as $dialogUser) {
            $updateds[$dialogUser->userid] = $dialogUser->updated_at;
            $silences[$dialogUser->userid] = $dialogUser->silence;
        }
        $userids = array_keys($silences);

        // 提及会员
        $mentions = [];
        if ($this->type === 'text') {
            preg_match_all("/<span class=\"mention user\" data-id=\"(\d+)\">/", $this->msg['text'], $matchs);
            if ($matchs) {
                $mentions = array_values(array_filter(array_unique($matchs[1])));
            }
        }

        // 将会话以外的成员加入会话内
        $diffids = array_values(array_diff($mentions, $userids));
        if ($diffids) {
            // 仅(群聊)且(是群主或没有群主)才可以@成员以外的人
            if ($dialog->type === 'group' && in_array($dialog->owner_id, [0, $this->userid])) {
                $dialog->joinGroup($diffids, $this->userid);
                $dialog->pushMsg("groupJoin", null, $diffids);
                $userids = array_values(array_unique(array_merge($mentions, $userids)));
            }
        }

        return compact('updateds', 'silences', 'userids', 'mentions');
    }
}
