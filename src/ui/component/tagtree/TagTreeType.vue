<template>
  <TagTreeTypeTitle
      v-model:open="open"
      :lock-open="addingTag"
      :count="Object.values(tagType.tags).flat().filter(t => t.check === true).length"
      :extra-add="true"
      @extra-add="addingTag = true"
  >
    {{ tagType.type }}
  </TagTreeTypeTitle>
  <TagTreeTypeAddTag v-if="addingTag" @submit="addTag" @cancel="addingTag = false" />
  <TagTreeTypeList :tag-type="tagType" v-show="open" @select-tag="onSelectTag" />
</template>

<script lang="ts">

import {PropType, ref} from "vue";
import TagTreeTypeTitle from "./TagTreeTypeTitle.vue";
import TagTreeTypeList from "./TagTreeTypeList.vue";
import TagTreeTypeAddTag from "./TagTreeTypeAddTag.vue";

export default {
  name: "TagTreeType",
  components: {TagTreeTypeAddTag, TagTreeTypeList, TagTreeTypeTitle },
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
    const addingTag = ref(false);
    const addTag = (text) => {
      addingTag.value = false;
      console.log("add tag", text);
      //TODO
    }
    const onSelectTag = (tag, check) => {
      context.emit('selectTag', tag, check);
    }
    return { addingTag, addTag, onSelectTag }
  }
}
</script>

<style scoped>

</style>