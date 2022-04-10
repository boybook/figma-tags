<template>
  <div class="add-tag-type">
    <div class="add-tag-type-button" @click="popup = !popup" :class="{ 'add-tag-type-button--focus': popup }">
      <img :src="require('../../resource/plus.svg')" alt="add">
      <span style="margin-left: 4px">Add a type</span>
    </div>
    <div v-if="popup" class="add-tag-type-popup">
      <div class="arrow-top" style="margin-left: 42px"></div>
      <div class="add-tag-type-popup-content">
        <p>Add a new type: </p>
        <TagTreeEntryEdit placeholder="Type name" @submit="submit" @cancel="popup = false" />
      </div>
    </div>

  </div>
</template>

<script lang="ts">

import FigInput from "../FigInput.vue";
import FigButton from "../FigButton.vue";
import TagTreeEntryEdit from "./TagTreeEntryEdit.vue";
import { ref } from "vue";

export default {
  name: "TagTreeAddType",
  components: { TagTreeEntryEdit, FigInput, FigButton },
  emits: ['submit'],
  setup(props, context) {
    const popup = ref(false);
    const submit = (text) => {
      popup.value = false;
      context.emit('submit', text);
    };
    return { popup, submit }
  }
}

</script>

<style scoped>

.add-tag-type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0 0 0;
  margin: 0;
}

.add-tag-type-button > * {
  color: rgba(0, 0, 0, 0.85);
  opacity: 0.5;
}

.add-tag-type-button {
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 12px;
  line-height: 18px;
  border-radius: 2px;
  transition: all 200ms ease-out;
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.add-tag-type-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.add-tag-type-button:active {
  background-color: rgba(0, 0, 0, 0.1);
}

.add-tag-type-button--focus {
  background-color: rgba(0, 0, 0, 0.1);
}

.add-tag-type-popup {
  flex: none;
  align-self: stretch;
  flex-grow: 0;

  filter: drop-shadow(0px 0px 1px rgba(120, 130, 140, 0.25)) drop-shadow(0px 8px 32px rgba(0, 0, 0, 0.05));
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}

.add-tag-type-popup-content {
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
}

.add-tag-type-popup-content > * {
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0 4px 0;
}

.arrow-top {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;  /* 左边框的宽 */
  border-right: 5px solid transparent; /* 右边框的宽 */
  border-bottom: 5px solid #fff; /* 下边框的长度|高,以及背景色 */
  font-size: 0;
  line-height: 0;
}

</style>