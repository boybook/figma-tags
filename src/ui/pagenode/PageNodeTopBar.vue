<template>
  <div class="current-select">
    <Tabs
        :current="0"
        :contents="[$t('page.tags'), $t('page.preview')]"
        @toggle="tabToggle"
    />
    <button @click="$emit('refresh')" class="current-select-icon">
      <img :src="require('./resource/refresh.svg')" alt="refresh">
    </button>
    <button @click="$emit('page-settings')" class="current-select-icon" style="border-left: 1px #E0E0E0 solid">
      <img :src="require('./resource/setting.svg')" alt="setting">
    </button>
  </div>
</template>

<script lang="ts">

import { PropType } from "vue";
import Tabs from "../component/Tabs.vue";

export default {
  name: "PageNodeTopBar",
  components: { Tabs },
  props: {
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
    current: Object as PropType<Transfer.CurrentSelection>,
  },
  emits: [ 'refresh', 'page-settings'],
  setup(props) {
    const tabToggle = (index: number, name: string) => {
      console.log("PageNodeTopBar.tabToggle", index, name);
      if (index === 1) {
        props.togglePage('PageSelect');
      }
    }
    return { tabToggle }
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

  background: #f8f8f8e0;
  backdrop-filter: blur(16px);

  box-shadow: inset 0 -1px 0 #eee;
}

.current-select div {
  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0 0;
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