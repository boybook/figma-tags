// utils/theme.js
import { ref, onMounted, onUnmounted } from 'vue';

// 检测当前是否为暗色主题
export const useTheme = () => {
    const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = (e) => {
        isDark.value = e.matches;
    };

    onMounted(() => {
        themeMediaQuery.addEventListener('change', updateTheme);
    });

    onUnmounted(() => {
        themeMediaQuery.removeEventListener('change', updateTheme);
    });

    return {
        isDark,
    };
};