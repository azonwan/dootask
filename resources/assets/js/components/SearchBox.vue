<template>
    <Modal
        v-model="showModal"
        class-name="common-search-box-modal"
        :closable="!isFullscreen"
        :fullscreen="isFullscreen"
        :mask-closable="false"
        :footer-hide="true"
        width="640">

        <div class="search-header">
            <div class="search-input">
                <div class="search-pre">
                    <Loading v-if="loadIng > 0"/>
                    <Icon v-else type="ios-search" />
                </div>
                <Input ref="searchKey" v-model="searchKey" :placeholder="$L('请输入关键字')"/>
            </div>
            <i class="taskfont search-close" @click="onHide">&#xe6e5;</i>
        </div>

        <div class="search-body">
            <template v-if="listLength === 0">
                <div v-if="loadIng > 0 || !searchKey.trim()" class="search-empty">
                    <i class="taskfont">&#xe60b;</i>
                    <span>{{ $L(loadIng > 0 ? '正在拼命搜索...' : '请输入关键字搜索') }}</span>
                </div>
                <div v-else class="search-empty">
                    <i class="taskfont">&#xe60b;</i>
                    <span class="empty-label">{{ $L('暂无相关结果') }}</span>
                    <span>{{ $L('未搜到跟「(*)」相关的结果', searchKey) }}</span>
                </div>
            </template>
            <div v-else class="search-list">
                <ul v-for="(items, type) in list" :key="type">
                    <li class="item-label">{{typeLabel(type)}}</li>
                    <li v-for="item in items.slice(0, 10)" :key="item.id" @click="onClick(item)">
                        <div class="item-icon">
                            <EAvatar v-if="item.icon[0]==='avatar'" class="img-avatar" :src="item.icon[1]" :size="38"/>
                            <i v-else-if="item.icon[0]==='department'" class="taskfont icon-avatar department">&#xe75c;</i>
                            <i v-else-if="item.icon[0]==='project'" class="taskfont icon-avatar project">&#xe6f9;</i>
                            <i v-else-if="item.icon[0]==='task'" class="taskfont icon-avatar task">&#xe6f4;</i>
                            <UserAvatarTip v-else-if="item.icon[0]==='user'" :userid="item.icon[1]" :size="38"/>
                            <Icon v-else-if="item.icon[0]==='people'" class="icon-avatar" type="ios-people" />
                            <Icon v-else class="icon-avatar" type="md-person" />
                        </div>
                        <div class="item-content">
                            <div class="item-title">{{item.title}}</div>
                            <div class="item-desc">
                                <span
                                    class="desc-tag no-dark-content"
                                    v-if="item.tags"
                                    v-for="tag in item.tags"
                                    :style="tag.style">{{tag.name}}</span>
                                <span class="desc-text" v-html="item.desc"></span>
                            </div>
                        </div>
                        <div v-if="item.action" class="item-action" :title="item.action">{{$A.timeFormat(item.action)}}</div>
                    </li>
                </ul>
            </div>
        </div>

    </Modal>
</template>

<script>
import {mapState} from "vuex";
import UserAvatarTip from "./UserAvatar/tip.vue";
import emitter from "../store/events";

export default {
    name: 'SearchBox',
    components: {UserAvatarTip},
    props: {
        //
    },

    data() {
        return {
            loadIng: 0,
            searchKey: '',
            searchResults: [],

            showModal: false,
        }
    },

    mounted() {
        emitter.on('openSearch', this.onShow);
    },

    beforeDestroy() {
        emitter.off('openSearch', this.onShow);
    },

    watch: {
        searchKey: {
            handler: function () {
                if (!this.searchKey.trim()) {
                    return;
                }
                if (this.searchTimer) {
                    clearTimeout(this.searchTimer)
                    this.searchTimer = null;
                    this.loadIng--;
                }
                this.loadIng++;
                this.searchTimer = setTimeout(() => {
                    if (this.searchKey.trim()) {
                        this.onSearch()
                    }
                    this.searchTimer = null;
                    this.loadIng--;
                }, 500)
            },
            immediate: true
        }
    },

    computed: {
        ...mapState([
            'themeName',
        ]),

        list({searchKey, searchResults}) {
            const items = searchResults.filter(item => item.key === searchKey)
            const groups = {}
            items.forEach(item => {
                if (!groups[item.type]) {
                    groups[item.type] = []
                }
                groups[item.type].push(item)
            })
            return groups
        },

        listLength({searchKey, searchResults}) {
            const items = searchResults.filter(item => item.key === searchKey)
            return items.length
        },

        isFullscreen({windowWidth}) {
            return windowWidth < 576
        },
    },

    methods: {
        typeLabel(type) {
            switch (type) {
                case 'task':
                    return this.$L('任务')
                case 'message':
                    return this.$L('消息')
                case 'contact':
                    return this.$L('联系人')
                case 'file':
                    return this.$L('文件')
                case 'project':
                    return this.$L('项目')
            }
            return type;
        },

        within24Hours(date) {
            return ($A.dayjs(date).unix() - $A.dayjs().unix()) < 86400
        },

        showProfessionDesc(dialog_user) {
            if (dialog_user && dialog_user.profession) {
                return `[${dialog_user.profession}]`
            }
            return ''
        },

        onClick(item) {
            console.log(item);
        },

        onShow() {
            this.showModal = true
            this.$nextTick(() => {
                this.$refs.searchKey?.focus()
            })
        },

        onHide() {
            this.showModal = false
        },

        onSearch() {
            this.searchTask(this.searchKey)
            this.searchMessage(this.searchKey)
            this.searchContact(this.searchKey)
            // todo searchFile、searchProject
        },

        searchTask(key) {
            this.loadIng++;
            this.$store.dispatch("call", {
                url: 'project/task/lists',
                data: {
                    keys: {name: key},
                    archived: 'all',
                    pagesize: 10,
                },
            }).then(({data}) => {
                const items = data.data.map(item => {
                    const tags = [];
                    if (item.complete_at) {
                        tags.push({
                            name: this.$L('已完成'),
                            style: 'background-color:#666;color:#ddd',
                        })
                    } else if (item.overdue) {
                        tags.push({
                            name: this.$L('超期'),
                            style: 'background-color:red;color:#ddd',
                        })
                    } else if (this.within24Hours(item.end_at)) {
                        tags.push({
                            name: this.$L('即将到期'),
                            style: 'background-color:orange;color:#ddd',
                        })
                    }
                    return {
                        key,
                        type: 'task',
                        icon: ['task', null],
                        tags,

                        id: item.id,
                        title: item.name,
                        desc: item.desc,
                        action: item.end_at,

                        rawData: item,
                    };
                });
                items.forEach(item => {
                    const index = this.searchResults.findIndex(it => it.id === item.id && it.type === 'task')
                    if (index > -1) {
                        this.searchResults.splice(index, 1, item)
                    } else {
                        this.searchResults.push(item)
                    }
                })
            }).finally(_ => {
                this.loadIng--;
            })
        },

        searchMessage(key) {
            this.loadIng++;
            this.$store.dispatch("call", {
                url: 'dialog/msg/esearch',
                data: {
                    key,
                    pagesize: 10,
                },
            }).then(({data}) => {
                const items = data.data.map(item => {
                    let icon = 'person';
                    let ival = null;
                    if (item.type == 'group') {
                        if (item.avatar) {
                            icon = 'avatar';
                            ival = item.avatar;
                        } else if (item.group_type == 'department') {
                            icon = 'department';
                        } else if (item.group_type == 'project') {
                            icon = 'project';
                        } else if (['task', 'okr'].includes(item.group_type)) {
                            icon = 'task';
                        } else {
                            icon = 'people';
                        }
                    } else if (item.dialog_user) {
                        icon = 'user';
                        ival = item.dialog_user.userid
                    }
                    return {
                        key,
                        type: 'message',
                        icon: [icon, ival],
                        tags: [],

                        id: item.id,
                        title: item.name,
                        desc: $A.getMsgSimpleDesc(item.last_msg) || this.showProfessionDesc(item.dialog_user),
                        action: item.last_at,

                        rawData: item,
                    };
                })
                items.forEach(item => {
                    const index = this.searchResults.findIndex(it => it.id === item.id && it.type === 'task')
                    if (index > -1) {
                        this.searchResults.splice(index, 1, item)
                    } else {
                        this.searchResults.push(item)
                    }
                })
            }).finally(_ => {
                this.loadIng--;
            })
        },

        searchContact(key) {
            this.loadIng++;
            this.$store.dispatch("call", {
                url: 'users/search',
                data: {
                    keys: {key},
                    pagesize: 10,
                },
            }).then(({data}) => {
                const items = data.map(item => {
                    return {
                        key,
                        type: 'contact',
                        icon: ['user', item.userid],
                        tags: [],

                        id: item.userid,
                        title: item.nickname,
                        desc: this.showProfessionDesc(item),
                        action: item.line_at,

                        rawData: item,
                    };
                })
                items.forEach(item => {
                    const index = this.searchResults.findIndex(it => it.id === item.id && it.type === 'contact')
                    if (index > -1) {
                        this.searchResults.splice(index, 1, item)
                    } else {
                        this.searchResults.push(item)
                    }
                })
            }).finally(_ => {
                this.loadIng--;
            })
        },
    }
};
</script>
