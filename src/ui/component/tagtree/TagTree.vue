<template>
  <ul class="tag-tree-ul">
    <li v-for="tagType in tagTree">
      <TagTreeType :tag-type="tagType" @add-tag="addTag" />
    </li>
    <li>
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
  components: {TagTreeAddType, FigButton, TagTreeType },
  props: {
    tagTree: Object as PropType<Context.TagTree>
  },
  emits: [ 'addTag', 'addTagType' ],
  setup(props, context) {
    console.log("rendering TagTree", props.tagTree);
    const addTag = (tagType: string, tag: Storage.Tag) => {
      context.emit('addTag', tagType, tag);
    };
    const addTagType = (tagType: string) => {
      context.emit('addTagType', tagType);
    }
    return { addTag, addTagType }
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