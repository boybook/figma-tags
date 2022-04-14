<template>
  <img class="loading-icon" :src="require('../resource/loading-' + color + '.svg')" alt="loading">
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "LoadingIcon",
  props: {
    color: {
      type: String as PropType<'white'|'black'>,
      default: 'black'
    }
  }
}
</script>

<style scoped>

.loading-icon {
  animation: always-rotating 1.4s linear infinite;
  flex: none;
  order: 0;
  flex-grow: 0;
}

@keyframes always-rotating {
  100% {
    transform: rotate(360deg)
  }
}

</style>