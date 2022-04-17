import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
//@ts-ignore
import App from './ui.vue';
import { messages } from "./I18n";
import VueGtag from "vue-gtag";

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages
})

const app = createApp(App);

// 注册一个全局自定义指令 `v-focus`
app.directive('focus', {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el) {
        // 聚焦元素
        el.focus()
    }
})

app.use(i18n);
app.use(VueGtag, {
    globalObjectName: "FigmaTags",
    config: {
        id: "G-VLF0LP4C5W"
    }
});

app.mount('#app');