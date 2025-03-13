export default {
    // 设置草稿
    SET_DRAFT(state, {dialogId, content}) {
        const index = state.cacheDrafts.findIndex(item => item.dialogId === dialogId)
        const item = {
            dialogId,
            content: $A.filterInvalidLine(content),
            time: new Date().getTime()
        }

        if (index !== -1) {
            // 更新已存在的草稿
            item.tag = state.cacheDrafts[index].tag
            state.cacheDrafts.splice(index, 1, item)
        } else {
            // 添加新草稿
            item.tag = state.dialogId != dialogId
            state.cacheDrafts.push(item)
        }

        // 保存到 IndexedDB
        $A.IDBSave("cacheDrafts", state.cacheDrafts)
    },

    // 显示草稿标签
    TAG_DRAFT(state, dialogId) {
        const index = state.cacheDrafts.findIndex(item => item.dialogId === dialogId)
        if (index !== -1) {
            state.cacheDrafts[index].tag = !!state.cacheDrafts[index].content
            $A.IDBSave("cacheDrafts", state.cacheDrafts)
        }
    },
}
