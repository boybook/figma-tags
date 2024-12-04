<template>
  <div class="tag-adding">
    <div class="tag-adding-color" v-if="color">
      <TagColorDropdown v-model:color="color" />
    </div>
    <FigInput
        v-focus
        v-model:val="text"
        :status="error ? 'error' : ''"
        :placeholder="placeholder"
        @submit="submit"
        @keydown.esc="cancel"
    />
    <FigButton v-if="showDelete" @click="toDelete" @click.stop>
      <img :src="require('../../resource/delete.svg')" alt="delete">
    </FigButton>
    <FigButton @click="cancel" @click.stop>
      <img :src="require('../../resource/close-black.svg')" alt="close">
    </FigButton>
    <FigButton type="primary" @click="submit" @click.stop>
      <img :src="require('../../resource/check-white.svg')" alt="check">
    </FigButton>
  </div>
</template>

<script lang="ts">

import {PropType, ref, watch} from "vue";
import FigInput from "../FigInput.vue";
import FigButton from "../FigButton.vue";
import TagColorDropdown from "./TagColorDropdown.vue";

export default {
  name: "TagTreeEntryEdit",
  components: {TagColorDropdown, FigButton, FigInput },
  props: {
    placeholder: String,
    defaultText: {
      type: String,
      default: ""
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    color: {
      type: Object as PropType<Transfer.TagColor>
    }
  },
  emits: [ 'update:color', 'submit', 'cancel', 'toDelete' ],
  setup(props, context) {
    const color = ref(props.color);
    watch(
      color,
      (newVal) => {
        context.emit('update:color', newVal);
      }
    )
    const text = ref<string>(props.defaultText);
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
      context.emit('submit', text.value, props.color);
    }
    const cancel = () => {
      context.emit('cancel');
    }
    const toDelete = () => {
      context.emit('toDelete');
    }
    return { color, text, error, submit, cancel, toDelete };
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

.tag-adding-color {
  width: 16px;
  max-width: 16px;
  margin-right: 4px;
  display: flex;
  align-self: stretch;
  flex-grow: 0;
}

</style>