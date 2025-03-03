<template>
    <ModalAlive
        v-model="showModal"
        class-name="common-search-box-modal"
        :closable="!isFullscreen"
        :fullscreen="isFullscreen"
        :mask-closable="false"
        :footer-hide="true"
        width="768">

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

        <div class="search-body" @touchstart="onTouchstart">
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
                    <li v-for="item in items" :key="item.id" @click="onClick(item)">
                        <div class="item-icon">
                            <div v-if="item.icons[0]==='file'" :class="`no-dark-content file-icon ${item.icons[1]}`"></div>
                            <i v-else-if="item.icons[0]==='department'" class="taskfont icon-avatar department">&#xe75c;</i>
                            <i v-else-if="item.icons[0]==='project'" class="taskfont icon-avatar project">&#xe6f9;</i>
                            <i v-else-if="item.icons[0]==='task'" class="taskfont icon-avatar task">&#xe6f4;</i>
                            <UserAvatar v-else-if="item.icons[0]==='user'" class="user-avatar" :userid="item.icons[1]" :size="38"/>
                            <EAvatar v-else-if="item.icons[0]==='avatar'" class="img-avatar" :src="item.icons[1]" :size="38"/>
                            <Icon v-else-if="item.icons[0]==='people'" class="icon-avatar" type="ios-people" />
                            <Icon v-else class="icon-avatar" type="md-person" />
                        </div>
                        <div class="item-content">
                            <div class="item-title">
                                <div class="title-text">{{item.title}}</div>
                                <div
                                    v-if="item.activity"
                                    class="title-activity"
                                    :title="item.activity">{{activityFormat(item.activity)}}</div>
                            </div>
                            <div class="item-desc">
                                <span
                                    class="desc-tag"
                                    v-if="item.tags"
                                    v-for="tag in item.tags"
                                    :style="tag.style">{{tag.name}}</span>
                                <span class="desc-text" v-html="item.desc"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </ModalAlive>
</template>

<script>
import {mapState} from "vuex";
import ModalAlive from "view-design-hi/src/components/modal/modal-alive";
import emitter from "../store/events";

export default {
    name: 'SearchBox',
    props: {
        //
    },
    components: {
        ModalAlive,
    },

    data() {
        return {
            loadIng: 0,
            searchKey: '',
            searchResults: [],
            searchTimer: null,

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
            'keyboardType'
        ]),

        list({searchKey, searchResults}) {
            const items = searchResults.filter(item => item.key === searchKey)
            const groups = {}
            items.forEach(item => {
                if (!groups[item.type]) {
                    groups[item.type] = []
                }
                if (groups[item.type].length < 10) {
                    groups[item.type].push(item)
                }
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
                case 'project':
                    return this.$L('项目')
                case 'message':
                    return this.$L('消息')
                case 'contact':
                    return this.$L('联系人')
                case 'file':
                    return this.$L('文件')
            }
            return type;
        },

        activityFormat(date) {
            const local = $A.daytz(),
                time = $A.dayjs(date);
            if (local.format("YYYY/MM/DD") === time.format("YYYY/MM/DD")) {
                return time.format("HH:mm")
            }
            if (local.year() === time.year()) {
                return time.format("MM/DD")
            }
            return time.format("YYYY/MM/DD") || '';
        },

        onClick(item) {
            switch (item.type) {
                case 'task':
                    this.$store.dispatch('openTask', item.rawData)
                    this.onHide()
                    break;

                case 'project':
                    this.goForward({name: 'manage-project', params: {projectId: item.id}})
                    this.onHide()
                    break;

                case 'message':
                    this.$store.dispatch("openDialog", item.id).then(() => {
                        this.onHide()
                        this.goForward({name: 'manage-messenger', params: {dialogAction: 'dialog'}})
                        this.$store.state.dialogSearchMsgId = /^\d+$/.test(item.rawData.search_msg_id) ? item.rawData.search_msg_id : 0
                    }).catch(({msg}) => {
                        $A.modalError(msg || this.$L('打开会话失败'))
                    })
                    break;

                case 'contact':
                    this.$store.dispatch("openDialogUserid", item.id).then(_ => {
                        this.onHide()
                        this.goForward({name: 'manage-messenger', params: {dialogAction: 'dialog'}})
                    }).catch(({msg}) => {
                        $A.modalError(msg || this.$L('打开会话失败'))
                    });
                    break;

                case 'file':
                    this.goForward({name: 'manage-file', params: {folderId: item.rawData.pid, fileId: null, shakeId: item.id}})
                    this.$store.state.fileShakeId = item.id
                    setTimeout(() => {
                        this.$store.state.fileShakeId = 0
                    }, 600)
                    this.onHide()
                    break;
            }
        },

        onTouchstart() {
            if (this.keyboardType === "show") {
                $A.eeuiAppKeyboardHide();
            }
        },

        onShow() {
            this.showModal = true
            this.$nextTick(() => {
                const $el = this.$refs.searchKey?.$refs?.input;
                if ($el) {
                    $el.style.caretColor = 'transparent';
                    $el.focus()
                    const len = $el.value.length;
                    $el.setSelectionRange(len, len);
                    setTimeout(() => {
                        $el.style.caretColor = null
                    }, 300)
                }
            })
        },

        onHide() {
            this.showModal = false
        },

        onSearch() {
            this.searchTask(this.searchKey)
            this.searchProject(this.searchKey)
            this.searchMessage(this.searchKey)
            this.searchContact(this.searchKey)
            this.searchFile(this.searchKey)
        },

        pushResults(items) {
            items.forEach(item => {
                const index = this.searchResults.findIndex(({id, type}) => id === item.id && type === item.type)
                if (index > -1) {
                    this.searchResults.splice(index, 1, item)
                } else {
                    this.searchResults.push(item)
                }
            })
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
                const nowTime = $A.dayjs().unix()
                const items = data.data.map(item => {
                    const tags = [];
                    if (item.complete_at) {
                        tags.push({
                            name: this.$L('已完成'),
                            style: 'background-color:#ccc',
                        })
                    } else if (item.overdue) {
                        tags.push({
                            name: this.$L('超期'),
                            style: 'background-color:#f00',
                        })
                    } else if ($A.dayjs(item.end_at).unix() - nowTime < 86400) {
                        tags.push({
                            name: this.$L('即将到期'),
                            style: 'background-color:#f80',
                        })
                    }
                    return {
                        key,
                        type: 'task',
                        icons: ['task', null],
                        tags,

                        id: item.id,
                        title: item.name,
                        desc: item.desc,
                        activity: item.end_at,

                        rawData: item,
                    };
                });
                this.pushResults(items)
            }).finally(_ => {
                this.loadIng--;
            })
        },

        searchProject(key) {
            this.loadIng++;
            this.$store.dispatch("call", {
                url: 'project/lists',
                data: {
                    keys: {
                        name: key
                    },
                    archived: 'all',
                    pagesize: 10,
                },
            }).then(({data}) => {
                const items = data.data.map(item => {
                    const tags = [];
                    if (item.owner) {
                        tags.push({
                            name: this.$L('负责人'),
                            style: 'background-color:#0bc037',
                        })
                    }
                    if (item.archived_at) {
                        tags.push({
                            name: this.$L('已归档'),
                            style: 'background-color:#ccc',
                        })
                    }
                    return {
                        key,
                        type: 'project',
                        icons: ['project', null],
                        tags,

                        id: item.id,
                        title: item.name,
                        desc: item.desc || '',
                        activity: item.updated_at,

                        rawData: item,
                    };
                })
                this.pushResults(items)
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
                    let desc = null;
                    if (item.type == 'group') {
                        if (item.avatar) {
                            icon = 'avatar';
                            desc = item.avatar;
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
                        desc = item.dialog_user.userid
                    }
                    return {
                        key,
                        type: 'message',
                        icons: [icon, desc],
                        tags: [],

                        id: item.id,
                        title: item.name,
                        desc: $A.getMsgSimpleDesc(item.last_msg),
                        activity: item.last_at,

                        rawData: item,
                    };
                })
                this.pushResults(items)
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
                        icons: ['user', item.userid],
                        tags: [],

                        id: item.userid,
                        title: item.nickname,
                        desc: item.profession || '',
                        activity: item.line_at,

                        rawData: item,
                    };
                })
                this.pushResults(items)
            }).finally(_ => {
                this.loadIng--;
            })
        },

        searchFile(key) {
            this.loadIng++;
            this.$store.dispatch("call", {
                url: 'file/search',
                data: {key},
            }).then(({data}) => {
                const items = data.map(item => {
                    const tags = [];
                    if (item.share) {
                        tags.push({
                            name: this.$L(item.userid == this.userId ? '已共享' : '共享'),
                            style: 'background-color:#0bc037',
                        })
                    }
                    return {
                        key,
                        type: 'file',
                        icons: ['file', item.type],
                        tags,

                        id: item.id,
                        title: item.name,
                        desc: item.type === 'folder' ? '' : $A.bytesToSize(item.size),
                        activity: item.updated_at,

                        rawData: item,
                    };
                })
                this.pushResults(items)
            }).finally(_ => {
                this.loadIng--;
            })
        }
    }
};
</script>
