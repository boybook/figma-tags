<template>
  <ul v-if="childTags.length > 0" class="sub-type">
    <li class="sub-type-title" v-if="childTagType.length > 0"> {{ childTagType }} </li>
    <draggable :list="childTags" :disabled="!operable" @change="onDrag" animation="100" item-key="name" handle=".icon-drag" class="draggable-ul">
      <template #item="{ element }">
        <li :key="element.name">
          <TagTreeTypeListEntry
              :tag="element"
              :checkable="operable"
              @selectTag="onSelectTag"
              @editTag="(tagId, nameFrom, tag) => $emit('editTag', tagId, nameFrom, tag)"
              @deleteTag="(tagId) => $emit('deleteTag', tagId)"
          />
        </li>
      </template>
    </draggable>
  </ul>
</template>

<script lang="ts">

import { PropType, watch } from "vue";
import TagTreeTypeListEntry from "./TagTreeTypeListEntry.vue";
import draggable from "vuedraggable";

export default {
  name: "TagTreeTypeListChild",
  components: { TagTreeTypeListEntry, draggable },
  props: {
    operable: {
      type: Boolean,
      default: true
    },
    childTagType: String,
    childTags: Object as PropType<Context.Tag[]>
  },
  emits: [ 'update:childTags', 'selectTag', 'editTag', 'deleteTag', 'dragTag' ],
  setup(props, context) {
    watch(
        () => props.childTags,
        (newVal) => {
          context.emit("update:childTags", newVal);
        }
    );
    const onSelectTag = (tag: Context.Tag, check: boolean) => {
      context.emit('selectTag', tag, check);
    }
    const onDrag = () => {
      context.emit('dragTag', props.childTagType, props.childTags);
    }
    return { onSelectTag, onDrag }
  }
}
</script>

<style scoped>

.sub-type {
  padding-bottom: 8px;
  padding-left: 0;
}

.sub-type-title {
  color: rgba(0, 0, 0, .45);
  padding: 0 0 4px 24px;
  font-size: 12px;
}

ul .draggable-ul {
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