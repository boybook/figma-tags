<template>
  <img class="loading-icon" :src="require('../resource/loading.svg')" alt="loading">
</template>

<script lang="ts">
export default {
  name: "LoadingIcon"
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