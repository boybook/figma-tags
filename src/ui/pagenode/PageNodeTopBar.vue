<template>
  <div class="current-select">
    <div class="current-select-name">
      <img v-show="current && current.type === 'PAGE'" :src="require('./resource/page.svg')" alt="page">
      <img v-show="current && current.type === 'FRAME'" :src="require('./resource/frame.svg')" alt="frame">
      <p> {{ current ? current.name : '...' }} </p>
    </div>
    <button v-on:click="$emit('refresh')" class="current-select-icon">
      <img :src="require('./resource/refresh.svg')" alt="refresh">
    </button>
    <button v-on:click="$emit('page-settings')" class="current-select-icon" style="border-left: 1px #E0E0E0 solid">
      <img :src="require('./resource/setting.svg')" alt="setting">
    </button>
  </div>
</template>

<script lang="ts">

import { PropType } from "vue";

export default {
  name: "PageNodeTopBar",
  props: {
    current: Object as PropType<Transfer.CurrentSelection>,
  },
  emits: [ 'refresh', 'page-settings'],
  setup() {

  }
}

</script>

<style scoped>

.current-select {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;

  background: rgba(235, 235, 235, 0.9);
  backdrop-filter: blur(16px);

  border-bottom: 1px #E0E0E0 solid;
}

.current-select div {
  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0 0;
}

.current-select .current-select-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 4px 8px 12px;
  width: 0;

  flex-grow: 1;

  font-size: 12px;
  line-height: 17px;
}

.current-select .current-select-name img {
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0 4px 0 0;
}

.current-select .current-select-name p {
  flex: none;
  order: 1;
  flex-grow: 1;
  margin: 0;
  user-select: none;
  width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
}

.current-select button {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  flex-grow: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 100ms ease;
}

.current-select button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.current-select button:active {
  background: rgba(0, 0, 0, 0.08);
}

</style>