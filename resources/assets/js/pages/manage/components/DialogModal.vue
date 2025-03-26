<template>
    <Modal
        :value="visible"
        :mask="false"
        :mask-closable="false"
        :footer-hide="true"
        :transition-names="['mobile-dialog', '']"
        :beforeClose="onBeforeClose"
        :class-name="`dialog-modal${closIng > 0 ? ' dialog-closing' : ''}`"
        fullscreen>
        <DialogWrapper v-if="windowPortrait && dialogId > 0" ref="dialogWrapper" :dialogId="dialogId" :beforeBack="onBeforeClose" location="modal"/>
    </Modal>
</template>

<style lang="scss">
body {
    .ivu-modal-wrap {
        &.dialog-modal {
            position: absolute;
            overflow: hidden;

            .ivu-modal {
                margin: 0;
                padding: 0;

                .ivu-modal-content {
                    background: transparent;

                    .ivu-modal-close {
                        display: none;
                    }

                    .ivu-modal-body {
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }
                }
            }
        }
        &.dialog-closing {
            .ql-editor {
                caret-color: transparent;
            }
        }
    }
}
</style>

<script>
import {mapState} from "vuex";
import DialogWrapper from "./DialogWrapper";

export default {
    name: "DialogModal",
    components: {DialogWrapper},

    data() {
        return {
            timer: null,
            closIng: false,
        }
    },

    computed: {
        ...mapState(['dialogId']),

        visible() {
            return this.dialogId > 0 && this.windowPortrait
        }
    },

    watch: {
        visible(v) {
            $A.eeuiAppSetScrollEnabled(!v)
        }
    },

    methods: {
        onBeforeClose() {
            if (this.$refs.dialogWrapper) {
                this.$refs.dialogWrapper.operateVisible = false
            }
            return new Promise(async _ => {
                this.closIng++
                await this.$store.dispatch("openDialog", 0)
                setTimeout(() => {
                    this.closIng--
                }, 300)
            })
        },
    }
}
</script>
