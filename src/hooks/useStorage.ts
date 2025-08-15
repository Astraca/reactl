import { useSyncExternalStore } from "react"

export const useStorage = (key:string, initialValue:any) => {

    // 订阅者
    const subscribe = (callback: () => void) => {
        // 订阅浏览器API
        window.addEventListener('storage', callback)  // 浏览器storage发生变化就执行callback
        // 需要返回一个函数
        return () => {
            // 返回取消订阅
            window.removeEventListener('storage', callback)
        }
    }

    // 返回当前的快照
    const getSnapshot = () => {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : initialValue
    }

    const res = useSyncExternalStore(subscribe, getSnapshot)

    const updateStorage = (value:any) => {
        localStorage.setItem(key, JSON.stringify(value))
        // 手动触发Storage事件
        window.dispatchEvent(new StorageEvent('storage'))
    }

    return [res, updateStorage]
}