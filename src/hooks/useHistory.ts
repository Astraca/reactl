import { useSyncExternalStore } from "react"

// history api 去实现页面跳转
// 监听history变化
export const useHistory = () => {

    const subscribe = (callback: () => void) => {
        // 订阅浏览器api 监听history变化
        // vue路由中 三种模式，一个是用于ssr, 其余是用于Web(history和hash)
        // history底层是通过监听popstate
        // hash底层是通过监听hashchange

        window.addEventListener('popstate', callback)
        window.addEventListener('hashchange', callback)

        return () => {
            // 取消订阅
            window.removeEventListener('popstate', callback)
            window.removeEventListener('hashchange', callback)
        }
        // popstate只能监听浏览器前进/后退按钮 无法监听 pushstate replacestate
    }

    const getSnapshot = () => {
        return [window.location.href]
    }

    const url = useSyncExternalStore(subscribe, getSnapshot)

    const push = (url: string) => {
        window.history.pushState({}, '', url)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }
    
    // 跳转的时候没有历史记录
    const replace = (url: string) => {
        window.history.replaceState({}, '', url)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    // return [url, push, replace]  // 返回会报错，变成联合类型了
    return [url, push, replace] as const // 元组类型
    //  as const 断言，它用于精确控制数组的类型推断，确保数组的类型被严格锁定
    // as const 的作用：将数组转为「只读元组」（不能修改元素、不能增减长度）
}

// url: 当前页面路径