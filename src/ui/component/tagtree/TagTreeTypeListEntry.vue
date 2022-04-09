<template>
  <div class="tag-entry" :class="{ 'selected': tag.check }" @click="onSelectTag" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="tag-entry-left">
      <img class="icon-drag" :class="{ 'icon-drag-show': hover }" :src="require('../../resource/drag.svg')" alt="drag" >
      <FigTag :tag="tag" :removable="false"></FigTag>
      <img class="icon-edit" v-show="hover" :src="require('../../resource/edit.svg')" alt="edit" @click="">
    </div>
    <img v-if="checkable" v-show="tag.check" :src="require('../../resource/check.svg')" alt="check" >
  </div>
</template>

<script lang="ts">

import FigTag from "../FigTag.vue";
import {PropType, ref} from "vue";

export default {
  name: "TagTreeTypeListEntry",
  components: { FigTag },
  props: {
    tag: Object as PropType<Context.Tag>,
    checkable: {
      type: Boolean,
      default: true
    }
  },
  emits: [
      'selectTag'
  ],
  setup(props, context) {
    const hover = ref(false);
    const onSelectTag = () => {
      if (props.checkable) {
        props.tag.check = !props.tag.check;
      }
      context.emit('selectTag', props.tag, props.tag.check);
    }
    return { hover, onSelectTag }
  }
}

</script>

<style scoped>

.tag-entry {
  /* Auto layout */
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px 5px 4px;
  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0;

  transition: background-color 100ms ease;
  border-radius: 3px;
}

.tag-entry:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.tag-entry-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tag-entry-left > * {
  margin-right: 4px;
}

.selected {
  background-color: #FAFAFA;
  border-radius: 0;
}

.icon-drag {
  opacity: 0;
  padding: 0;
  transition: opacity 50ms ease-out;
  cursor: move;
}

.icon-drag:hover {
  opacity: 0.3 !important;
}

.icon-drag-show {
  opacity: 0.2;
}

.icon-edit {
  cursor: pointer;
  opacity: 0.4;
  transition: opacity 50ms ease-out;
}

.icon-edit:hover {
  opacity: 1;
}

</style>