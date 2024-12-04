<template>
  <div>
    <slot></slot>
    <transition name="fade">
      <div v-if="realLoading" class="loading-wrapper">
        <LoadingIcon :color="isDark ? 'white' : 'black'" />
        <p style="padding: 0 16px 16px"> {{ msg }} </p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import LoadingIcon from "./LoadingIcon.vue";
import { useTheme } from '../utils/theme';

import {ref, watchEffect} from "vue";
export default {
  name: "LoadingWithContent",
  components: { LoadingIcon },
  props: {
    loading: Boolean,
    msg: String
  },
  setup(props) {
    const { isDark } = useTheme();
    const realLoading = ref(false);
    watchEffect(() => {
      console.log('loading', props.loading, props.msg);
      if (realLoading.value) {
        realLoading.value = props.loading;
      } else {
        setTimeout(() => {
          if (props.loading && !realLoading.value) {
            realLoading.value = props.loading;
          }
        }, 50);
      }
    });
    return { isDark, realLoading };
  }
}

</script>

<style scoped>

.loading-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: var(--color-bg-overlay-blur-lite);
  backdrop-filter: blur(8px);
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  color: var(--color-text-secondary);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

</style>