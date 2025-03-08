/**
 * Vue指令: v-emoji-class
 * 
 * 用法:
 * 1. 基本用法: v-emoji-class="className" - 将emoji包装在<span class="className">emoji</span>中
 * 2. 高级用法: v-emoji-class="{className: 'className', tagName: 'div'}" - 自定义标签名
 * 
 * 示例:
 * <div v-emoji-class="emoji-icon">我爱中国🇨🇳</div>
 * <p v-emoji-class="{className: 'large-emoji', tagName: 'em'}">Hello 😊</p>
 */

import { debounce } from "lodash";

// 正则表达式用于匹配emoji - 使用预编译正则提高性能
const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

// 使用WeakMap存储元素状态，避免直接修改DOM元素
const elementStates = new WeakMap();

/**
 * 检查文本是否包含emoji
 * @param {string} text - 要检查的文本
 * @returns {boolean} - 是否包含emoji
 */
function containsEmoji(text) {
    emojiRegex.lastIndex = 0;
    return emojiRegex.test(text);
}

/**
 * 处理文本节点中的emoji
 * @param {Text} textNode - 文本节点
 * @param {string} className - 添加给emoji的类名
 * @param {string} tagName - 包裹emoji的标签名
 * @returns {boolean} - 是否有修改
 */
function processTextNode(textNode, className, tagName) {
    const text = textNode.textContent;
    
    // 快速检查是否包含emoji
    if (!containsEmoji(text)) return false;
    
    // 重置正则索引并准备替换
    emojiRegex.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;
    
    // 逐个匹配emoji并替换
    while ((match = emojiRegex.exec(text)) !== null) {
        // 添加emoji前的文本
        if (match.index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        }
        
        // 创建包装emoji的元素
        const emojiWrapper = document.createElement(tagName);
        emojiWrapper.className = className;
        emojiWrapper.textContent = match[0];
        fragment.appendChild(emojiWrapper);
        
        lastIndex = emojiRegex.lastIndex;
    }
    
    // 添加剩余文本
    if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
    
    // 替换原始节点
    textNode.parentNode.replaceChild(fragment, textNode);
    return true;
}

/**
 * 递归处理元素及其子元素中的文本节点
 * @param {Node} node - 要处理的节点
 * @param {string} className - 添加给emoji的类名
 * @param {string} tagName - 包裹emoji的标签名
 * @returns {boolean} - 是否有修改
 */
function processNodeEmojis(node, className, tagName) {
    // 如果是文本节点，直接处理
    if (node.nodeType === Node.TEXT_NODE) {
        return processTextNode(node, className, tagName);
    } 
    
    // 如果是元素节点，递归处理其子节点
    if (node.nodeType === Node.ELEMENT_NODE) {
        let modified = false;
        
        // 使用childNodes的副本避免在迭代过程中修改集合
        const childNodes = Array.from(node.childNodes);
        for (const childNode of childNodes) {
            if (processNodeEmojis(childNode, className, tagName)) {
                modified = true;
            }
        }
        
        return modified;
    }
    
    return false;
}

/**
 * 解析指令绑定值
 * @param {Object} binding - 指令的绑定值
 * @returns {Object} - 解析后的className和tagName
 */
function parseBinding(binding) {
    const value = binding.value;
    return {
        className: typeof value === 'string' ? value : (value?.className || ''),
        tagName: typeof value === 'object' ? (value?.tagName || 'span') : 'span'
    };
}

/**
 * 计算元素内容的哈希值
 * @param {HTMLElement} el - 元素
 * @returns {string} - 哈希值
 */
function getContentHash(el) {
    // 使用innerHTML长度和前20个字符作为简单哈希
    const content = el.innerHTML;
    return `${content.length}:${content.substring(0, 20)}`;
}

/**
 * 处理元素中的emoji表情
 * @param {HTMLElement} el - 指令所在的元素
 * @param {Object} binding - 指令的绑定值
 */
function processEmoji(el, binding) {
    if (!el) return;
    
    // 解析绑定值
    const { className, tagName } = parseBinding(binding);
    if (!className) return;
    
    // 获取或初始化元素状态
    let state = elementStates.get(el) || {};
    elementStates.set(el, state);
    
    // 计算内容哈希值，用于快速比较
    const contentHash = getContentHash(el);
    
    // 如果内容哈希值与上次相同且已处理过，则跳过
    if (state.contentHash === contentHash && state.processed) {
        return;
    }
    
    // 创建一个克隆节点进行处理
    const clone = el.cloneNode(true);
    
    // 递归处理所有文本节点
    if (processNodeEmojis(clone, className, tagName)) {
        // 使用requestAnimationFrame优化DOM更新
        requestAnimationFrame(() => {
            el.innerHTML = clone.innerHTML;
            
            // 更新元素状态
            state.contentHash = contentHash;
            state.processed = true;
            elementStates.set(el, state);
        });
    }
}

// 创建防抖处理函数 - 使用更短的防抖时间提高响应速度
const debouncedProcessEmoji = debounce(processEmoji, 20);

export default {
    inserted(el, binding) {
        // 直接处理，不使用防抖
        processEmoji(el, binding);
    },
    
    update(el, binding) {
        // 获取元素状态
        const state = elementStates.get(el) || {};
        
        // 只有当绑定值变化时才重新处理
        if (binding.oldValue !== binding.value) {
            debouncedProcessEmoji(el, binding);
            return;
        }
        
        // 内容变化时也需要重新处理
        const contentHash = getContentHash(el);
        if (state.contentHash !== contentHash) {
            debouncedProcessEmoji(el, binding);
        }
    },
    
    unbind(el) {
        // 清理元素状态
        elementStates.delete(el);
    }
};
