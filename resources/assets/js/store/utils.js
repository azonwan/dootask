/**
 * @param key
 * @param requestData
 * @param state
 * @returns {$callData}
 */
function __callData(key, requestData, state) {
    if (!$A.isJson(requestData)) {
        requestData = {}
    }
    const callKey = key + "::" + encodeURIComponent(new URLSearchParams($A.sortObject(requestData, [
        'page',
        'pagesize',
        'timerange',
    ])).toString())
    const callData = state.callAt.find(item => item.key === callKey) || {}
    callData.__last = $A.dayjs().unix()
    if (typeof callData.key === "undefined") {
        callData.key = callKey
        callData.updated = 0
        callData.deleted = 0
        state.callAt.push(callData)
        $A.IDBSet("callAt", state.callAt).catch(_ => { })
    }

    /**
     * @returns {*}
     */
    this.get = () => {
        requestData.timerange = requestData.timerange || `${callData.updated || 0},${callData.deleted || 0}`
        return requestData
    }

    /**
     * @param total
     * @param current_page
     * @param deleted_id
     * @returns {Promise<unknown>}
     */
    this.save = ({total, current_page, deleted_id}) => {
        return new Promise(async resolve => {
            if (current_page !== 1) {
                return
            }
            let hasUpdate = false
            const time = callData.__last || $A.dayjs().unix()
            if (total > 0) {
                callData.updated = time
                hasUpdate = true
            }
            if ($A.isArray(deleted_id) && deleted_id.length > 0) {
                callData.deleted = time
                hasUpdate = true
            } else {
                deleted_id = []
            }
            if (hasUpdate) {
                await $A.IDBSet("callAt", state.callAt)
            }
            resolve(deleted_id)
        })
    }

    return this
}

export function $callData(key, requestData, state) {
    return new __callData(key, requestData, state)
}

export function $urlSafe(value, encode = true) {
    if (value) {
        if (encode) {
            value = String(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/\n/g, '$')
        } else {
            value = String(value).replace(/\-/g, "+").replace(/\_/g, "/").replace(/\$/g, '\n')
        }
    }
    return value
}

/**
 * EventSource
 */
const SSEDefaultOptions = {
    retry: 5,
    interval: 3 * 1000,
}

export class SSEClient {
    constructor(url, options = SSEDefaultOptions) {
        this.url = url;
        this.es = null;
        this.options = options;
        this.retry = options.retry;
        this.timer = null;
    }

    _onOpen() {
        if (window.systemInfo.debug === "yes") {
            console.log("SSE open: " + this.url);
        }
    }

    _onMessage(type, handler) {
        return (event) => {
            this.retry = this.options.retry;
            if (typeof handler === "function") {
                handler(type, event);
            }
        };
    }

    _onError(type, handler) {
        return () => {
            if (window.systemInfo.debug === "yes") {
                console.log("SSE retry: " + this.url);
            }
            if (this.es) {
                this._removeAllEvent(type, handler);
                this.unsunscribe();
            }

            if (this.retry > 0) {
                this.retry--;
                this.timer = setTimeout(() => {
                    this.subscribe(type, handler);
                }, this.options.interval);
            }
        };
    }

    _removeAllEvent(type, handler) {
        type = $A.isArray(type) ? type : [type]
        this.es.removeEventListener("open", this._onOpen);
        type.some(item => {
            this.es.removeEventListener(item, this._onMessage(item, handler));
        })
        this.es.removeEventListener("error", this._onError(type, handler));
    }

    subscribe(type, handler) {
        type = $A.isArray(type) ? type : [type]
        this.es = new EventSource(this.url);
        this.es.addEventListener("open", this._onOpen);
        type.some(item => {
            this.es.addEventListener(item, this._onMessage(item, handler));
        })
        this.es.addEventListener("error", this._onError(type, handler));
    }

    unsunscribe() {
        if (this.es) {
            this.es.close();
            this.es = null;
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (window.systemInfo.debug === "yes") {
            console.log("SSE cancel: " + this.url);
        }
    }
}

export function AIModelList(email) {
    switch (email) {
        case "openai":
        case "ai-openai@bot.system":
            return [
                'gpt-4',
                'gpt-4-turbo',
                'gpt-4o',
                'gpt-4o-mini',
                'gpt-3.5-turbo',
                'gpt-3.5-turbo-16k',
                'gpt-3.5-turbo-0125',
                'gpt-3.5-turbo-1106'
            ]

        case "claude":
        case "ai-claude@bot.system":
            return [
                'claude-3-5-sonnet-latest',
                'claude-3-5-sonnet-20241022',
                'claude-3-5-haiku-latest',
                'claude-3-5-haiku-20241022',
                'claude-3-opus-latest',
                'claude-3-opus-20240229',
                'claude-3-haiku-20240307',
                'claude-2.1',
                'claude-2.0'
            ]

        case "deepseek":
        case "ai-deepseek@bot.system":
            return [
                'deepseek-chat',
                'deepseek-reasoner'
            ]

        case "wenxin":
        case "ai-wenxin@bot.system":
            return [
                'gemini-1.5-flash',
                'gemini-1.5-flash-8b',
                'gemini-1.5-pro',
                'gemini-1.0-pro',
            ]

        case "qianwen":
        case "ai-qianwen@bot.system":
            return [
                'glm-4',
                'glm-4-plus',
                'glm-4-air',
                'glm-4-airx',
                'glm-4-long',
                'glm-4-flash',
                'glm-4v',
                'glm-4v-plus',
                'glm-3-turbo'
            ]

        case "gemini":
        case "ai-gemini@bot.system":
            return [
                'qwen-turbo',
                'qwen-turbo-latest',
                'qwen-plus',
                'qwen-plus-latest',
                'qwen-max',
                'qwen-max-latest',
                'qwen-long',
            ]

        case "zhipu":
        case "ai-zhipu@bot.system":
            return [
                'ernie-4.0-8k',
                'ernie-4.0-8k-latest',
                'ernie-4.0-turbo-128k',
                'ernie-4.0-turbo-8k',
                'ernie-3.5-128k',
                'ernie-3.5-8k',
                'ernie-speed-128k',
                'ernie-speed-8k',
                'ernie-lite-8k',
                'ernie-tiny-8k',
            ]
    }
}
