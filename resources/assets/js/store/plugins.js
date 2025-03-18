/**
 * electron 同步插件
 * @param store
 */
const createElectronSyncPlugin = (store) => {
    const {electron} = window

    if (!electron) {
        return
    }

    const sourceId = $A.randomString(6) + "_" + Date.now().toString()

    let isSyncing = false
    electron.registerMsgListener('syncStore', ({type, payload, sourceId: targetId}) => {
        if (sourceId === targetId) {
            return
        }
        isSyncing = true
        try {
            store.commit(type, payload)
        } finally {
            isSyncing = false
        }
    })

    store.subscribe((mutation) => {
        if (isSyncing) {
            return
        }
        electron.sendMessage('syncStore', {
            type: mutation.type,
            payload: mutation.payload,
            sourceId
        });
    });
};


export default [createElectronSyncPlugin]
