import { computed, Ref } from 'vue';
import { rgbToHsb, hsbToRgb } from '../utils';

/**
 * Computes background and text colors for a given tag.
 * @param {Object} tag - Tag object containing background and color properties.
 * @param {Object} isDark - A ref indicating whether the current theme is dark.
 * @returns {{ colorBackground: ComputedRef, colorText: ComputedRef }}
 */
export function useTagColors(tag: {background: {r: number, g: number, b: number, a: number}, color: {r: number, g: number, b: number, a: number}}, isDark: Ref<boolean>) {
    const colorBackground = computed(() => {
        if (isDark.value) {
            const { h } = rgbToHsb(tag.background.r, tag.background.g, tag.background.b);
            return { ...hsbToRgb(h, 50, 45), a: 1 }; // Dark mode adjustment
        } else {
            return tag.background; // Use original color for light mode
        }
    });

    const colorText = computed(() => {
        if (isDark.value) {
            const { h } = rgbToHsb(tag.color.r, tag.color.g, tag.color.b);
            return { ...hsbToRgb(h, 5, 90), a: 1 }; // Dark mode adjustment
        } else {
            return tag.color; // Use original color for light mode
        }
    });

    return {
        colorBackground,
        colorText,
    };
}