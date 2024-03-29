<template>
  <ul>
    <li v-for="child in childList">
      <TagTreeTypeListChild
          :operable="operable"
          :child-tag-type="child[0]"
          v-model:child-tags="child[1]"
          @edit-tag="editTag"
          @delete-tag="deleteTag"
          @select-tag="onSelectTag"
          @drag-tag="onDragTag"
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
  emits: [ "selectTag", "editTag", "dragTag" ],
  setup(props, context) {
    const childList = computed(() => [...props.tagType.tags.entries()]);
    const onSelectTag = (tag, check) => {
      context.emit('selectTag', tag, check);
    }
    const editTag = (tagId: string, nameFrom: string, tag: Storage.Tag) => {
      if (nameFrom !== tag.name && childList.value.map(([_, v]) => v).flat().find(t => t.name === tag.name)) {
        alert("Name already exists");
      } else {
        context.emit('editTag', tagId, tag);
      }
    }
    const deleteTag = (tagId: string) => {
      context.emit('deleteTag', tagId);
    }
    const onDragTag = (childTagType: string, _) => {
      context.emit('dragTag', props.tagType, childTagType);
    }
    return { childList, onSelectTag, editTag, deleteTag, onDragTag }
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