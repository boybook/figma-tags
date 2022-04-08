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

import { PropType, ref } from "vue";
import * as Utils from "../../utils";
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
      'selectTag',
      'addTag'
  ],
  setup(props, context) {
    const addingTag = ref(false);
    // 一层层往外传，直到PageNode
    const addTag = (text) => {
      if (text && text.length > 0) {
        addingTag.value = false;
        context.emit('addTag', props.tagType.type, Utils.defaultTag(text));
      }
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