<template>
  <div>
    <slot></slot>
    <div v-if="loading" class="loading-wrapper">
      <LoadingIcon />
      <p style="padding-bottom: 16px"> {{ msg }} </p>
    </div>
  </div>
</template>

<script lang="ts">

import LoadingIcon from "./LoadingIcon.vue";
import {watchEffect} from "vue";
export default {
  name: "LoadingWithContent",
  components: { LoadingIcon },
  props: {
    loading: Boolean,
    msg: String
  },
  setup(props) {
    watchEffect(() => {
      console.log('loading', props.loading, props.msg);
    });
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

</style>