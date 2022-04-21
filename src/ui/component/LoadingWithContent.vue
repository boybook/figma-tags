<template>
  <div>
    <slot></slot>
    <transition name="fade">
      <div v-if="realLoading" class="loading-wrapper">
        <LoadingIcon />
        <p style="padding-bottom: 16px"> {{ msg }} </p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import LoadingIcon from "./LoadingIcon.vue";
import {ref, watchEffect} from "vue";
export default {
  name: "LoadingWithContent",
  components: { LoadingIcon },
  props: {
    loading: Boolean,
    msg: String
  },
  setup(props) {
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
    return { realLoading };
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
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  color: rgba(0, 0, 0, .65);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

</style>