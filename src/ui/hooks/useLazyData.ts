import { ref } from 'vue';
//@ts-ignore
import { useIntersectionObserver } from '@vueuse/core';

// 封装一个Hook方法实现数据懒加载
export const useLazyData = (apiFn: Function, cb?: Function) => {
    // 当前组件进入可视区时触发接口调用
    // 被监听的DOM元素
    // 调用接口获取的结果
    const target = ref<HTMLElement>();
    const result = ref([]);
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            // 进入可视区
            apiFn().then(data => {
                result.value = data;
                console.log("lazyDataLoaded", data);
                if (cb) cb();
            })
            // 停止监听
            stop();
        }
    })
    return { target, result };
}