<template>
  <ul class="tag-tree-ul">
    <li v-for="tagType in tagTree">
      <TagTreeType
          :toggle-page="togglePage"
          :operable="operable"
          :tag-type="tagType"
          @add-tag="addTag"
          @select-tag="(tag, check) => selectTag(tagType.type, tag, check)"
          @edit-type-name="(tagName) => editTypeName(tagType.type, tagName)"
      />
    </li>
    <li v-if="operable">
      <TagTreeAddType @submit="addTagType" />
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
  emits: [ 'selectTag', 'addTag', 'addTagType', 'editTypeName' ],
  setup(props, context) {
    console.log("rendering TagTree", props.tagTree);
    const addTag = (tagType: string, tag: Storage.Tag) => {
      context.emit('addTag', tagType, tag);
    };
    const addTagType = (tagType: string) => {
      context.emit('addTagType', tagType);
    }
    const selectTag = (tagType: string, tag: Context.Tag, check: boolean) => {
      context.emit('selectTag', tagType, tag, check);
    }
    const editTypeName = (type: string, typeName: string) => {
      context.emit('editTypeName', type, typeName);
    }
    return { addTag, addTagType, selectTag, editTypeName }
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