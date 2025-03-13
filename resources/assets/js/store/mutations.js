export default {
    // 设置草稿
    SET_DIALOG_DRAFT(state, {id, content}) {
        const index = state.dialogDrafts.findIndex(item => item.id === id)
        const item = {
            id,
            content: $A.filterInvalidLine(content),
            time: new Date().getTime()
        }

        if (index !== -1) {
            // 更新已存在的草稿
            item.tag = state.dialogDrafts[index].tag
            state.dialogDrafts.splice(index, 1, item)
        } else {
            // 添加新草稿
            item.tag = state.dialogId != id
            state.dialogDrafts.push(item)
        }

        // 保存到 IndexedDB
        $A.IDBSave("dialogDrafts", state.dialogDrafts)
    },

    // 显示草稿标签
    TAG_DIALOG_DRAFT(state, id) {
        const index = state.dialogDrafts.findIndex(item => item.id === id)
        if (index !== -1) {
            state.dialogDrafts[index].tag = !!state.dialogDrafts[index].content
            $A.IDBSave("dialogDrafts", state.dialogDrafts)
        }
    },
}
