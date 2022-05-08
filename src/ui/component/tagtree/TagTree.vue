<template>
  <ul class="tag-tree-ul">
    <li v-for="tagType in tagTree">
      <TagTreeType
          :toggle-page="togglePage"
          :operable="operable"
          :tag-type="tagType"
          @add-tag="(tag) => $emit('addTag', tagType.type, tag)"
          @select-tag="(tag, check) => $emit('selectTag', tagType.type, tag, check)"
          @edit-type-name="(tagName) => $emit('editTypeName', tagType.type, tagName)"
          @delete-tag-type="(typeName) => $emit('deleteTagType', typeName)"
          @edit-tag="(nameFrom, tag) => $emit('editTag', tagType.type, nameFrom, tag)"
          @delete-tag="(tagName) => $emit('deleteTag', tagType.type, tagName)"
          @drag-tag="onDragTag"
      />
    </li>
    <li v-if="operable">
      <TagTreeAddType @submit="(tagType) => $emit('addTagType', tagType)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import {PropType} from "vue";
import TagTreeType from "./TagTreeType.vue";
import FigButton from "../FigButton.vue";
import TagTreeAddType from "./TagTreeAddType.vue";

export default {
  name: "TagTree",
  components: { TagTreeAddType, FigButton, TagTreeType },
  props: {
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
    tagTree: Object as PropType<Context.TagTree>,
    operable: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'selectTag',
    'addTagType',
    'editTypeName',
    'deleteTagType',
    'addTag',
    'editTag',
    'deleteTag',
    'dragTag'
  ],
  setup(props, context) {
    const onDragTag = (tagType: Context.TagType, childTagType: string) => {
      context.emit('dragTag', tagType, childTagType);
    }
    return { onDragTag }
  }
}
</script>

<style scoped>

.tag-tree-ul {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  user-select: none;
}

.tag-tree-ul > li {
  flex: none;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.tag-tree-ul > li > * {
  align-self: stretch;
}

</style>