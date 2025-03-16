<template>
    <div v-show="false">
        <!-- 转发选择 -->
        <UserSelect
            ref="forwardSelect"
            :title="title"
            :multiple-max="userMaxSelect"
            :before-submit="onSelectBefore"
            :show-select-all="false"
            show-dialog
            module/>

        <!-- 转发确认 -->
        <ForwardConfirm
            ref="forwardConfirm"
            v-model="confirmShow"
            :title="confirmTitle"
            :sender-hidden="senderHidden"
            :before-submit="onConfirmBefore"

            :dialog-id="forwardDialogId"
            :forward-to="forwardTo"
            :msg-detail="msgDetail"/>
    </div>
</template>

<script>
import UserSelect from "../../../../components/UserSelect.vue";
import ForwardConfirm from "./confirm.vue";

export default {
    name: "Forwarder",
    components: {UserSelect, ForwardConfirm},
    props: {
        // 标题
        title: {
            type: String,
            default: 'Forward'
        },
        // 确认标题
        confirmTitle: {
            type: String,
            default: 'Forward Confirm'
        },
        // 隐藏（不显示原发送者信息）选项
        senderHidden: {
            type: Boolean,
            default: false
        },
        // 最大选择数量
        userMaxSelect: {
            type: Number,
            default: 50
        },
        // 提交前的回调
        beforeSubmit: Function,

        // 消息详情
        msgDetail: {
            type: Object,
            default: () => ({})
        },
    },

    data() {
        return {
            confirmShow: false,
            forwardDialogId: 0,
            forwardTo: [],
        }
    },

    methods: {
        onSelection() {
            this.$refs.forwardSelect.onSelection()
        },

        onSelectBefore() {
            return new Promise((_, reject) => {
                this.forwardTo = this.$refs.forwardSelect.formatSelect(this.$refs.forwardSelect.selects);
                if (this.forwardTo.length === 0) {
                    $A.messageError("请选择对话或成员");
                } else {
                    this.forwardDialogId = 0;
                    if (this.forwardTo.length === 1) {
                        const {type, userid} = this.forwardTo[0];
                        if (type === "group" && /^d:/.test(userid)) {
                            this.forwardDialogId = parseInt(userid.replace(/^d:/, ''));
                        }
                    }
                    this.confirmShow = true;
                }
                reject();
            })
        },

        onConfirmBefore(data) {
            return new Promise((resolve, reject) => {
                const selects = this.$refs.forwardSelect.selects;
                if (selects.length === 0) {
                    $A.messageError("请选择对话或成员");
                    reject();
                    return;
                }
                //
                data.dialogids = selects.filter(value => $A.leftExists(value, 'd:')).map(value => value.replace('d:', ''));
                data.userids = selects.filter(value => !$A.leftExists(value, 'd:'));
                data.msg_id = this.msgDetail.id;
                //
                const success = () => {
                    this.$refs.forwardSelect.hide();
                    resolve();
                }
                if (!this.beforeSubmit) {
                    success()
                    return
                }
                const before = this.beforeSubmit(data);
                if (before && before.then) {
                    before.then(success).catch(reject)
                } else {
                    success()
                }
            })
        }
    }
}
</script>
