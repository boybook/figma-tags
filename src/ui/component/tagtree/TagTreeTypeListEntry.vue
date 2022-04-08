<template>
  <div class="tag-entry" :class="{ 'selected': tag.check }" @click="onSelectTag()">
    <FigTag :tag="tag" :removable="false"></FigTag>
    <img v-if="checkable" v-show="tag.check" :src="require('../../resource/check.svg')" alt="check" >
  </div>
</template>

<script lang="ts">

import FigTag from "../FigTag.vue";
import {PropType} from "vue";

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
    const onSelectTag = () => {
      props.tag.check = !props.tag.check;
      context.emit('selectTag', props.tag, props.tag.check);
    }
    return { onSelectTag }
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
  padding: 5px 8px 5px 24px;
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

.selected {
  background-color: #FAFAFA;
  border-radius: 0;
}

</style>