<template>
  <div class="tag-adding">
    <FigInput v-focus v-model:val="text" :status="error ? 'error' : ''" :placeholder="placeholder" @submit="submit" />
    <FigButton @click="cancel">
      <img :src="require('../../resource/close-black.svg')" alt="close">
    </FigButton>
    <FigButton type="primary" @click="submit">
      <img :src="require('../../resource/check-white.svg')" alt="check">
    </FigButton>
  </div>
</template>

<script lang="ts">

import { ref, watch } from "vue";
import FigInput from "../FigInput.vue";
import FigButton from "../FigButton.vue";

export default {
  name: "TagTreeTypeAddTag",
  components: { FigButton, FigInput },
  props: {
    placeholder: String,
    defaultText: {
      type: String,
      default: ""
    }
  },
  emits: [ 'submit', 'cancel' ],
  setup(props, context) {
    const text = ref(props.defaultText);
    const error = ref(false);
    watch(
        text,
        (newVal) => {
          if (newVal.length > 0) {
            error.value = false;
          }
        }
    );
    const submit = () => {
      if (!text.value || text.value.length === 0) {
        error.value = true;
        return;
      }
      context.emit('submit', text.value);
    }
    const cancel = () => {
      context.emit('cancel');
    }
    return { text, error, submit, cancel };
  }
}

</script>

<style scoped>

.tag-adding {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  padding: 0;
  flex-grow: 1;
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