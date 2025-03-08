<?php

namespace App\Module\ElasticSearch;

use App\Models\WebSocketDialogMsg;
use App\Models\WebSocketDialogUser;
use Illuminate\Support\Facades\Log;

/**
 * 对话系统消息索引
 *
 * Class ElasticSearchUserMsg
 * @package App\Module\ElasticSearch
 */
class ElasticSearchUserMsg extends ElasticSearchBase
{
    const indexName = 'dialog_user_msg';

    /**
     * 构造函数
     * @return ElasticSearchBase
     * @throws \Elastic\Elasticsearch\Exception\ConfigException
     */
    public function __construct()
    {
        return parent::__construct(self::indexName());
    }

    /** ******************************************************************************************************** */
    /** *********************************************** 基础 ************************************************** */
    /** ******************************************************************************************************** */

    /**
     * 创建聊天系统索引 - 使用父子关系
     * @return array
     */
    public static function generateIndex()
    {
        // 定义映射
        $mappings = [
            'properties' => [
                // 共用字段
                'dialog_id' => ['type' => 'keyword'],
                'created_at' => ['type' => 'date'],
                'updated_at' => ['type' => 'date'],

                // dialog_users 字段
                'userid' => ['type' => 'keyword'],
                'top_at' => ['type' => 'date'],
                'last_at' => ['type' => 'date'],
                'mark_unread' => ['type' => 'integer'],
                'silence' => ['type' => 'integer'],
                'hide' => ['type' => 'integer'],
                'color' => ['type' => 'keyword'],

                // dialog_msgs 字段
                'msg_id' => ['type' => 'keyword'],
                'sender_userid' => ['type' => 'keyword'],
                'msg_type' => ['type' => 'keyword'],
                'key' => ['type' => 'text'],
                'bot' => ['type' => 'integer'],

                // Join字段定义父子关系
                'relationship' => [
                    'type' => 'join',
                    'relations' => [
                        'dialog_user' => 'dialog_msg' // dialog_user是父文档，dialog_msg是子文档
                    ]
                ],
            ]
        ];

        // 索引设置
        $settings = [
            'number_of_shards' => 5,
            'number_of_replicas' => 1,
            'refresh_interval' => '5s'
        ];

        try {
            $es = new self();
            return $es->createIndex($settings, $mappings);
        } catch (\Exception $e) {
            Log::error('创建聊天系统索引失败: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * 构建对话系统特定的搜索 - 根据用户ID和消息关键词搜索会话
     * @param string $userid 用户ID
     * @param string $keyword 消息关键词
     * @param int $size 返回结果数量
     * @return array
     */
    public static function searchByKeyword($userid, $keyword, $size = 20)
    {
        // 注意这里的类型名称要与创建索引时的一致
        $query = [
            'bool' => [
                'must' => [
                    [
                        'term' => [
                            'userid' => $userid
                        ]
                    ],
                    [
                        'has_child' => [
                            'type' => 'dialog_msg',
                            'query' => [
                                'bool' => [
                                    'must' => [
                                        [
                                            'match_phrase' => [
                                                'key' => $keyword
                                            ]
                                        ],
                                        [
                                            'term' => [
                                                'bot' => 0
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            'inner_hits' => [
                                'size' => 1,
                                'sort' => [
                                    'msg_id' => 'desc'
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ];

        // 结果集合
        $searchMap = [];

        try {
            // 开始搜索
            $es = new self();
            $results = $es->search($query, 0, $size, ['last_at' => 'desc']);

            // 处理搜索结果
            $hits = $results['hits']['hits'] ?? [];

            foreach ($hits as $hit) {
                if (isset($hit['inner_hits']['dialog_msg']['hits']['hits'][0])) {
                    $msgHit = $hit['inner_hits']['dialog_msg']['hits']['hits'][0];
                    $source = $hit['_source'];
                    $msgSource = $msgHit['_source'];

                    $searchMap[] = [
                        'id' => $source['dialog_id'],
                        'top_at' => $source['top_at'],
                        'last_at' => $source['last_at'],
                        'mark_unread' => $source['mark_unread'],
                        'silence' => $source['silence'],
                        'hide' => $source['hide'],
                        'color' => $source['color'],
                        'user_at' => $source['updated_at'],
                        'search_msg_id' => $msgSource['msg_id'],
                    ];
                }
            }
        } catch (\Exception $e) {
            Log::error('searchByKeyword: ' . $e->getMessage());
        }

        // 返回搜索结果
        return $searchMap;
    }

    /** ******************************************************************************************************** */
    /** *********************************************** 用户 ************************************************** */
    /** ******************************************************************************************************** */

    /**
     * 会话用户 - 生成文档ID
     * @param WebSocketDialogUser $dialogUser
     * @return string
     */
    public static function generateUserDicId(WebSocketDialogUser $dialogUser)
    {
        return "user_{$dialogUser->userid}_dialog_{$dialogUser->dialog_id}";
    }

    /**
     * 会话用户 - 生成文档格式
     * @param WebSocketDialogUser $dialogUser
     * @return array
     */
    public static function generateUserFormat(WebSocketDialogUser $dialogUser)
    {
        return [
            'dialog_id' => $dialogUser->dialog_id,
            'created_at' => $dialogUser->created_at,
            'updated_at' => $dialogUser->updated_at,

            'userid' => $dialogUser->userid,
            'top_at' => $dialogUser->top_at,
            'last_at' => $dialogUser->last_at,
            'mark_unread' => $dialogUser->mark_unread ? 1 : 0,
            'silence' => $dialogUser->silence ? 1 : 0,
            'hide' => $dialogUser->hide ? 1 : 0,
            'color' => $dialogUser->color,

            'relationship' => [
                'name' => 'dialog_user'
            ]
        ];
    }

    /**
     * 会话用户 - 同步到Elasticsearch
     * @param WebSocketDialogUser $dialogUser
     * @return void
     */
    public static function syncUser(WebSocketDialogUser $dialogUser)
    {
        try {
            $es = new self();
            $es->indexDocument(self::generateUserFormat($dialogUser), self::generateUserDicId($dialogUser));
        } catch (\Exception $e) {
            Log::error('syncUser: ' . $e->getMessage());
        }
    }

    /**
     * 会话用户 - 从Elasticsearch删除
     */
    public static function deleteUser(WebSocketDialogUser $dialogUser)
    {
        try {
            $es = new self();

            $docId = "user_{$dialogUser->userid}_dialog_{$dialogUser->dialog_id}";

            // 删除用户-会话文档
            $es->deleteDocument($docId);

            // 注意：这里可能还需要删除所有关联的消息文档
            // 但由于父子关系，可以通过查询找到所有子文档并删除
            // 这里为简化，可以选择在后台任务中处理，或者直接依赖ES的级联删除功能

        } catch (\Exception $e) {
            Log::error('deleteUser: ' . $e->getMessage());
        }
    }

    /** ******************************************************************************************************** */
    /** *********************************************** 消息 ************************************************** */
    /** ******************************************************************************************************** */

    /**
     * 会话消息 - 生成父文档ID
     * @param WebSocketDialogMsg $dialogMsg
     * @param $userid
     * @return string
     */
    public static function generateMsgParentId(WebSocketDialogMsg $dialogMsg, $userid)
    {
        return "user_{$userid}_dialog_{$dialogMsg->dialog_id}";
    }

    /**
     * 会话消息 - 生成文档ID
     * @param WebSocketDialogMsg $dialogMsg
     * @param $userid
     * @return string
     */
    public static function generateMsgDicId(WebSocketDialogMsg $dialogMsg, $userid)
    {
        return "msg_{$dialogMsg->id}_user_{$userid}";
    }

    /**
     * 会话消息 - 生成文档格式
     * @param WebSocketDialogMsg $dialogMsg
     * @param $userid
     * @return array
     */
    public static function generateMsgFormat(WebSocketDialogMsg $dialogMsg, $userid)
    {
        return [
            'dialog_id' => $dialogMsg->dialog_id,
            'created_at' => $dialogMsg->created_at,
            'updated_at' => $dialogMsg->updated_at,

            'msg_id' => $dialogMsg->id,
            'sender_userid' => $dialogMsg->userid,
            'msg_type' => $dialogMsg->type,
            'key' => $dialogMsg->key,
            'bot' => $dialogMsg->bot ? 1 : 0,

            'relationship' => [
                'name' => 'dialog_msg',
                'parent' => self::generateMsgParentId($dialogMsg, $userid)
            ]
        ];
    }

    /**
     * 会话消息 - 同步到Elasticsearch
     */
    public static function syncMsg(WebSocketDialogMsg $dialogMsg)
    {
        try {
            $es = new self();

            // 获取此会话的所有用户
            $dialogUsers = WebSocketDialogUser::whereDialogId($dialogMsg->dialog_id)->get();

            if ($dialogUsers->isEmpty()) {
                return;
            }

            $params = ['body' => []];

            foreach ($dialogUsers as $dialogUser) {
                $params['body'][] = [
                    'index' => [
                        '_index' => self::indexName(),
                        '_id' => self::generateMsgDicId($dialogMsg, $dialogUser->userid),
                        'routing' => self::generateMsgParentId($dialogMsg, $dialogUser->userid)
                    ]
                ];
                $params['body'][] = self::generateMsgFormat($dialogMsg, $dialogUser->userid);
            }

            if (!empty($params['body'])) {
                $es->bulk($params);
            }
        } catch (\Exception $e) {
            Log::error('syncMsg: ' . $e->getMessage());
        }
    }

    /**
     * 会话消息 - 从Elasticsearch删除
     */
    public static function deleteMsg(WebSocketDialogMsg $dialogMsg)
    {
        try {
            $es = new self();

            // 获取此会话的所有用户
            $dialogUsers = WebSocketDialogUser::whereDialogId($dialogMsg->dialog_id)->get();

            if ($dialogUsers->isEmpty()) {
                return;
            }

            $params = ['body' => []];

            foreach ($dialogUsers as $dialogUser) {
                $params['body'][] = [
                    'delete' => [
                        '_index' => self::indexName(),
                        '_id' => self::generateMsgDicId($dialogMsg, $dialogUser->userid),
                        'routing' => self::generateMsgParentId($dialogMsg, $dialogUser->userid)
                    ]
                ];
            }

            if (!empty($params['body'])) {
                $es->bulk($params);
            }
        } catch (\Exception $e) {
            Log::error('deleteMsg: ' . $e->getMessage());
        }
    }
}
