<template>
  <TagTreeTypeTitle v-model:open="open" :count="Object.values(tagType.tags).flat().filter(t => t.check === true).length">
    {{ tagType.type }}
  </TagTreeTypeTitle>
  <TagTreeTypeList :tag-type="tagType" v-show="open" />
</template>

<script lang="ts">

import { PropType } from "vue";
import TagTreeTypeTitle from "./TagTreeTypeTitle.vue";
import TagTreeTypeList from "./TagTreeTypeList.vue";

export default {
  name: "TagTreeType",
  components: { TagTreeTypeList, TagTreeTypeTitle },
  props: {
    tagType: Object as PropType<Context.TagType>,
    checkable: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  emits: [
      'selectTag'
  ],
  setup(props, context) {
    const onSelectTag = () => {
      context.emit('selectTag', )
    }
  }
}
</script>

<style scoped>

</style>