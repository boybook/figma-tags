<template>
  <div class="tag-adding">
    <FigInput v-focus v-model:val="text" placeholder="The tag name" />
    <FigButton @click="cancel">
      <img :src="require('../../resource/close-black.svg')" alt="close">
    </FigButton>
    <FigButton type="primary" @click="submit">
      <img :src="require('../../resource/check-white.svg')" alt="check">
    </FigButton>
  </div>
</template>

<script lang="ts">

import { ref } from "vue";
import FigInput from "../FigInput.vue";
import FigButton from "../FigButton.vue";

export default {
  name: "TagTreeTypeAddTag",
  components: { FigButton, FigInput },
  emits: [ 'submit', 'cancel' ],
  setup(props, context) {
    const text = ref("");
    const submit = () => {
      context.emit('submit', text.value);
    }
    const cancel = () => {
      context.emit('cancel');
    }
    return { text, submit, cancel };
  }
}

</script>

<style scoped>

.tag-adding {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  padding: 5px 2px 5px 24px;
}

.tag-adding input {
  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0;
  height: 26px;
  font-size: 12px;
  line-height: 18px;
}

.tag-adding button {
  flex: none;
  flex-grow: 0;
  margin-left: 4px;
  padding: 6px;
  height: 26px;
}

</style>