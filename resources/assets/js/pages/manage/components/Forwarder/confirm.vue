<template>
    <!-- 确认转发 -->
    <Modal
        v-model="show"
        :title="title"
        class-name="common-user-select-modal forwarder-message-modal"
        :mask-closable="false"
        width="420">
        <div class="user-modal-search">
            <Scrollbar class="search-selected" enable-x :enable-y="false">
                <ul>
                    <li v-for="item in forwardTo" :data-id="item.userid">
                        <div v-if="item.type=='group'" :title="item.name" class="user-modal-avatar">
                            <EAvatar v-if="item.avatar" class="img-avatar" :src="item.avatar" :size="32"></EAvatar>
                            <i v-else-if="item.group_type=='department'" class="taskfont icon-avatar department">&#xe75c;</i>
                            <i v-else-if="item.group_type=='project'" class="taskfont icon-avatar project">&#xe6f9;</i>
                            <i v-else-if="item.group_type=='task'" class="taskfont icon-avatar task">&#xe6f4;</i>
                            <i v-else-if="item.group_type=='okr'" class="taskfont icon-avatar task">&#xe6f4;</i>
                            <Icon v-else class="icon-avatar" type="ios-people" />
                            <div v-if="forwardTo.length == 1" class="avatar-name">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                        <UserAvatar v-else :userid="item.userid" :size="32" :show-name="forwardTo.length == 1"/>
                    </li>
                </ul>
            </Scrollbar>
        </div>
        <div class="twice-affirm-body-extend">
            <div class="forwarder-wrapper-body">
                <div v-if="msgDetail" class="dialog-wrapper inde-list">
                    <Scrollbar class-name="dialog-scroller">
                        <DialogItem
                            :source="msgDetail"
                            @on-view-text="onViewText"
                            @on-view-file="onViewFile"
                            @on-down-file="onDownFile"
                            @on-emoji="onEmoji"
                            @on-other="onOther"
                            simpleView/>
                    </Scrollbar>
                </div>
                <div class="leave-message">
                    <ChatInput
                        v-if="dialogId > 0"
                        v-model="message"
                        :dialog-id="dialogId"
                        :emoji-bottom="windowPortrait"
                        :maxlength="200000"
                        :placeholder="placeholder || $L('留言')"
                        :disabled="loading"
                        disabled-record
                        simple-mode/>
                    <Input
                        v-else
                        type="textarea"
                        :autosize="{minRows: 1,maxRows: 3}"
                        v-model="message"
                        :maxlength="200000"
                        :placeholder="placeholder || $L('留言')"
                        :disabled="loading"
                        clearable/>
                </div>
            </div>
        </div>
        <template #footer>
            <div v-if="!senderHidden" class="forwarder-wrapper-footer" :class="{selected: !sender}" @click="onSender">
                <Icon class="user-modal-icon" :type="sender ? 'ios-radio-button-off' : 'ios-checkmark-circle'" />
                <span class="forward-text-tip">{{$L('不显示原发送者信息')}}</span>
            </div>
            <Button type="primary" :loading="loading" @click="onSubmit">
                {{$L('确定')}}
                <template v-if="forwardTo.length > 0">({{forwardTo.length}})</template>
            </Button>
        </template>
    </Modal>
</template>

<script>
import DialogItem from "../DialogItem.vue";
import ChatInput from "../ChatInput/index.vue";

export default {
    components: {ChatInput, DialogItem},
    props: {
        value: {
            type: Boolean,
            default: false
        },
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 输入框占位符
        placeholder: {
            type: String,
            default: null
        },
        // 隐藏（不显示原发送者信息）选项
        senderHidden: {
            type: Boolean,
            default: false
        },
        // 提交前的回调
        beforeSubmit: Function,

        // 对话ID
        dialogId: {
            type: Number,
            default: 0
        },
        // 转发给谁
        forwardTo: {
            type: Array,
            default: () => []
        },
        // 消息详情
        msgDetail: {
            type: Object,
            default: null
        },
    },

    data() {
        return {
            show: false,
            loading: false,

            message: '',    // 留言
            sender: true,  // 是否隐藏原发送者信息
        }
    },

    computed: {

    },

    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            this.$emit('input', val);
            if (!val) {
                this.loading = false;
                this.message = '';
                this.sender = true;
            }
        }
    },

    methods: {
        onViewText(...args) {
            this.$emit('on-view-text', ...args);
        },
        onViewFile(...args) {
            this.$emit('on-view-file', ...args);
        },
        onDownFile(...args) {
            this.$emit('on-down-file', ...args);
        },
        onEmoji(...args) {
            this.$emit('on-emoji', ...args);
        },
        onOther(...args) {
            this.$emit('on-other', ...args);
        },

        onSender() {
            if (this.loading) {
                return
            }
            this.sender = !this.sender
        },

        onSubmit() {
            if (this.loading) {
                return
            }
            if (!this.beforeSubmit) {
                this.hide()
                return
            }
            const data = {
                message: this.message,
            }
            if (!this.senderHidden) {
                data.sender = this.sender
            }
            const before = this.beforeSubmit(data);
            if (before && before.then) {
                this.loading = true
                before.then(() => {
                    this.hide()
                }).catch(_ => {
                    // do nothing
                }).finally(() => {
                    this.loading = false
                })
            } else {
                this.hide()
            }
        },

        hide() {
            this.show = false
        }
    }
}
</script>
