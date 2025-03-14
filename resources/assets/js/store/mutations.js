export default {
    // 会员管理
    'user/push': function(state, data) {
        state.cacheUserBasic.push(data)
        $A.IDBSave("cacheUserBasic", state.cacheUserBasic, 600)
    },

    'user/splice': function(state, {index, data, count = 1}) {
        if (typeof data === "undefined") {
            state.cacheUserBasic.splice(index, count)
        } else {
            state.cacheUserBasic.splice(index, count, data)
        }
        $A.IDBSave("cacheUserBasic", state.cacheUserBasic, 600)
    },

    'user/save': function(state, data) {
        state.cacheUserBasic = data
        $A.IDBSave("cacheUserBasic", state.cacheUserBasic, 600)
    },

    // 消息管理
    'message/push': function(state, data) {
        state.dialogMsgs.push(data)
        $A.IDBSave("dialogMsgs", state.dialogMsgs, 600)
    },

    'message/splice': function(state, {index, data, count = 1}) {
        if (typeof data === "undefined") {
            state.dialogMsgs.splice(index, count)
        } else {
            state.dialogMsgs.splice(index, count, data)
        }
        $A.IDBSave("dialogMsgs", state.dialogMsgs, 600)
    },

    'message/save': function(state, data) {
        state.dialogMsgs = data
        $A.IDBSave("dialogMsgs", state.dialogMsgs, 600)
    },

    // 任务管理
    'task/push': function(state, data) {
        state.cacheTasks.push(data)
        $A.IDBSave("cacheTasks", state.cacheTasks, 600)
    },

    'task/splice': function(state, {index, data, count = 1}) {
        if (typeof data === "undefined") {
            state.cacheTasks.splice(index, count)
        } else {
            state.cacheTasks.splice(index, count, data)
        }
        $A.IDBSave("cacheTasks", state.cacheTasks, 600)
    },

    // 对话管理
    'dialog/push': function(state, data) {
        state.cacheDialogs.push(data)
        $A.IDBSave("cacheDialogs", state.cacheDialogs, 600)
    },

    'dialog/splice': function(state, {index, data, count = 1}) {
        if (typeof data === "undefined") {
            state.cacheDialogs.splice(index, count)
        } else {
            state.cacheDialogs.splice(index, count, data)
        }
        $A.IDBSave("cacheDialogs", state.cacheDialogs, 600)
    },

    // 草稿管理
    'draft/set': function(state, {id, content}) {
        const index = state.dialogDrafts.findIndex(item => item.id === id)
        const item = {
            id,
            content: $A.filterInvalidLine(content),
            time: new Date().getTime()
        }
        if (index === -1 && !item.content) {
            return
        }

        if (state.dialogId == id) {
            item.tag = index !== -1 ? state.dialogDrafts[index].tag : false
        } else {
            item.tag = !!item.content
        }

        if (index !== -1) {
            state.dialogDrafts.splice(index, 1, item)
        } else {
            state.dialogDrafts.push(item)
        }

        $A.IDBSave("dialogDrafts", state.dialogDrafts)
    },

    'draft/tag': function(state, id) {
        if (state.dialogId == id) {
            return
        }
        const index = state.dialogDrafts.findIndex(item => item.id === id)
        if (index !== -1) {
            state.dialogDrafts[index].tag = !!state.dialogDrafts[index].content
            $A.IDBSave("dialogDrafts", state.dialogDrafts)
        }
    },

    // 引用管理
    'quote/set': function(state, {id, type, content}) {
        const index = state.dialogQuotes.findIndex(item => item.id === id)
        const item = {
            id,
            type,
            content,
            time: new Date().getTime()
        }
        if (index === -1 && !item.content) {
            return
        }

        if (index !== -1) {
            state.dialogQuotes.splice(index, 1, item)
        } else {
            state.dialogQuotes.push(item)
        }

        $A.IDBSave("dialogQuotes", state.dialogQuotes)
    },

    'quote/remove': function(state, id) {
        const index = state.dialogQuotes.findIndex(item => item.id === id)
        if (index !== -1) {
            state.dialogQuotes.splice(index, 1)
            $A.IDBSave("dialogQuotes", state.dialogQuotes)
        }
    },
}
