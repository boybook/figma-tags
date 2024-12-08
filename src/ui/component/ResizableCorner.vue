<template>
  <div ref="resizer" class="resizer" @mousedown="startResize">
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_729_663)">
        <path d="M7.5 4C7.5 4.45963 7.40947 4.91475 7.23358 5.33939C7.05769 5.76403 6.79988 6.14987 6.47487 6.47487C6.14987 6.79988 5.76403 7.05769 5.33939 7.23358C4.91475 7.40947 4.45963 7.5 4 7.5" stroke="black" stroke-miterlimit="1.41421" stroke-linecap="round"/>
      </g>
      <defs>
        <clipPath id="clip0_729_663">
          <rect width="8" height="8" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from "vue";
import { dispatch } from "../uiMessageHandler";

export default defineComponent({
  name: "ResizableCorner",
  setup() {
    const resizer = ref<HTMLElement | null>(null);

    // 窗口的当前尺寸
    const windowSize = reactive({
      width: 0,
      height: 0
    });

    let isResizing = false; // 是否正在调整大小
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;

    const startResize = (event: MouseEvent) => {
      isResizing = true;
      startX = event.clientX;
      startY = event.clientY;
      if (!windowSize.width || !windowSize.height) {
        windowSize.width = window.innerWidth;
        windowSize.height = window.innerHeight;
      }
      startWidth = windowSize.width;
      startHeight = windowSize.height;

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    };

    const resize = (event: MouseEvent) => {
      if (!isResizing) return;

      // 计算新的宽度和高度
      const newWidth = Math.max(500, startWidth + (event.clientX - startX));
      const newHeight = Math.max(400, startHeight + (event.clientY - startY));

      // 更新窗口尺寸
      windowSize.width = newWidth;
      windowSize.height = newHeight;

      // 通过 API 传递新的尺寸
      dispatch("resize", { width: newWidth, height: newHeight });
    };

    const stopResize = () => {
      isResizing = false;
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    };

    onMounted(() => {
      if (!resizer.value) return;
      // 可绑定其他逻辑
    });

    onUnmounted(() => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    });

    return {
      resizer,
      windowSize,
      startResize,
    };
  },
});
</script>

<style scoped>
.resizer {
  position: fixed;
  z-index: 100;
  right: .2rem;
  bottom: .2rem;
  width: 1.425rem;
  height: 1.425rem;
  cursor: nwse-resize;
  opacity: 0.05;
  transition: all 0.3s;
}
.resizer:hover {
  opacity: 0.5;
  transform: scale(1.2);
  transform-origin: bottom right;
}
.resizer:active {
  opacity: 0.6;
  transform: scale(1.2);
  transform-origin: bottom right;
}
.resizer svg {
  width: 100%;
  height: 100%;
}
@media (prefers-color-scheme: dark) {
  .resizer {
    opacity: 0.1;
  }
  .resizer svg {
    filter: invert(1);
  }
}
</style>