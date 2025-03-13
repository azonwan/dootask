export default {
    // 设置草稿
    SET_DIALOG_DRAFT(state, {id, content}) {
        const index = state.dialogDrafts.findIndex(item => item.id === id)
        const item = {
            id,
            content: $A.filterInvalidLine(content),
            time: new Date().getTime()
        }
        if (index === -1 && !item.content) {
            return
        }

        // 草稿标签
        if (state.dialogId == id) {
            item.tag = index !== -1 ? state.dialogDrafts[index].tag : false
        } else {
            item.tag = !!item.content
        }

        if (index !== -1) {
            // 更新已存在的草稿
            state.dialogDrafts.splice(index, 1, item)
        } else {
            // 添加新草稿
            state.dialogDrafts.push(item)
        }

        // 保存到 IndexedDB
        $A.IDBSave("dialogDrafts", state.dialogDrafts)
    },

    // 草稿标签
    TAG_DIALOG_DRAFT(state, id) {
        if (state.dialogId == id) {
            return
        }
        const index = state.dialogDrafts.findIndex(item => item.id === id)
        if (index !== -1) {
            state.dialogDrafts[index].tag = !!state.dialogDrafts[index].content
            $A.IDBSave("dialogDrafts", state.dialogDrafts)
        }
    },
}
