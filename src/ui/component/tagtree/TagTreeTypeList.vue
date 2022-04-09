<template>
  <ul>
    <li v-for="child in childList">
      <TagTreeTypeListChild
          :operable="operable"
          :child-tag-type="child[0]"
          v-model:child-tags="child[1]"
      />
    </li>
  </ul>
</template>

<script lang="ts">

import { PropType } from "vue/dist/vue";
import TagTreeTypeListChild from "./TagTreeTypeListChild.vue";
import {computed, ref} from "vue";

export default {
  name: "TagTreeTypeList",
  components: { TagTreeTypeListChild },
  props: {
    tagType: Object as PropType<Context.TagType>,
    operable: {
      type: Boolean,
      default: true
    }
  },
  emits: [ "selectTag" ],
  setup(props, context) {
    const childList = computed(() => [...props.tagType.tags.entries()]);
    const onSelectTag = (tag, check) => {
      context.emit('selectTag', tag, check)
    }
    return { childList, onSelectTag }
  }
}

</script>

<style scoped>

ul {
  list-style-type:none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  align-self: stretch;
}

li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  align-self: stretch;
}

</style>