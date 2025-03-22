<template>
    <div>
        <p>{{$L("您可以通过发送以下命令来控制我")}}：</p>
        <p>&nbsp;</p>

        <template v-if="msg.manager">
            <p><span class="mark-color mark-set">/list</span> - {{$L("机器人列表")}}</p>
            <p><span class="mark-color mark-set">/newbot ({{$L('机器人名称')}})</span> - {{$L("创建机器人")}}</p>
        </template>
        <template v-else>
            <p><span class="mark-color mark-set">/info</span> - {{$L("查看机器人详情")}}</p>
        </template>
        <p>&nbsp;</p>

        <p><b>{{$L("修改机器人")}}</b></p>
        <p><span class="mark-color mark-set">/setname{{IDLabel}} ({{$L('机器人名称')}})</span> - {{$L("修改机器人名称")}}</p>
        <p><span class="mark-color mark-set">/deletebot{{IDLabel}}</span> - {{$L("删除机器人")}}</p>
        <p><span class="mark-color mark-set">/clearday{{IDLabel}} ({{$L('天数')}})</span> - {{$L("设置保留消息时间（默认30天）")}}</p>
        <p><span class="mark-color mark-set">/webhook{{IDLabel}} [url]</span> - {{$L("设置消息Webhook（详情请看 API接口文档）")}}</p>
        <p>&nbsp;</p>

        <p><b>{{$L("机器人设置")}}</b></p>
        <p><span class="mark-color mark-set">/token{{IDLabel}}</span> - {{$L("生成Token令牌")}}</p>
        <p><span class="mark-color mark-set">/revoke{{IDLabel}}</span> - {{$L("撤销机器人Token令牌")}}</p>
        <p>&nbsp;</p>

        <p><b>{{$L("会话管理")}}</b></p>
        <p><span class="mark-color mark-set">/dialog{{IDLabel}} [{{$L('搜索关键词')}}]</span> - {{$L("查看会话ID")}}</p>
        <p>&nbsp;</p>

        <p><b>{{$L("API接口文档")}}</b></p>
        <p><span class="mark-color mark-set">/api</span> - {{$L("查看接口列表")}}</p>
    </div>
</template>

<script>
export default {
    props: {
        msg: Object,
    },
    data() {
        return {};
    },
    computed: {
        IDLabel() {
            return this.msg.manager ? this.$L(' {机器人ID}') : '';
        },
    },
}
</script>
