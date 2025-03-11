<template>
    <DialogWrapper v-if="dialogShow" :dialog-id="projectData.dialog_id" class="project-dialog">
        <template slot="head">
            <div class="dialog-user">
                <div class="member-head">
                    <div class="member-title">{{$L('项目成员')}}<span @click="memberShowAll=!memberShowAll">({{projectData.project_user.length}})</span></div>
                    <div class="member-open" @click="onMsgOpen" :title="$L('在消息中打开')">
                        <Icon type="ios-chatbubbles-outline"/>
                    </div>
                    <div class="member-close" @click="onClose">
                        <Icon type="ios-close"/>
                    </div>
                </div>
                <ul :class="['member-list', memberShowAll ? 'member-all' : '']">
                    <li v-for="item in projectData.project_user">
                        <UserAvatar :userid="item.userid" :size="36"/>
                    </li>
                </ul>
            </div>
            <div class="nav-wrapper">
                <div class="dialog-title">
                    <h2>{{$L('群聊')}}</h2>
                </div>
            </div>
        </template>
    </DialogWrapper>
</template>

<script>
import {mapGetters} from "vuex";
import DialogWrapper from "./DialogWrapper";

export default {
    name: "ProjectDialog",
    components: {DialogWrapper},
    data() {
        return {
            loadIng: false,
            memberShowAll: false,
            beforeDestroyClose: false,
        }
    },

    beforeDestroy() {
        if (this.beforeDestroyClose) {
            requestAnimationFrame(_ => {
                this.$store.dispatch('toggleProjectParameter', 'chat');
            })
        }
    },

    computed: {
        ...mapGetters(['projectData']),

        dialogShow() {
            return this.windowLandscape && this.projectData.dialog_id && this.projectData.cacheParameter.chat
        }
    },

    methods: {
        onMsgOpen() {
            this.$store.dispatch("openDialog", this.projectData.dialog_id);
            this.goForward({name: 'manage-messenger', params: {dialogAction: 'dialog'}});
            this.beforeDestroyClose = true;
        },

        onClose() {
            this.$emit('on-close');
            this.$store.dispatch('toggleProjectParameter', 'chat');
        }
    }
}
</script>
