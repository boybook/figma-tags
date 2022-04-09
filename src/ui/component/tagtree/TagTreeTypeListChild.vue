<template>
  <ul v-if="childTags.length > 0" class="sub-type">
    <li class="sub-type-title" v-if="childTagType.length > 0"> {{ childTagType }} </li>
    <draggable :list="childTags" :disabled="!operable" animation="100" item-key="name" handle=".icon-drag" class="draggable-ul">
      <template #item="{ element }">
        <li :key="element.name">
          <TagTreeTypeListEntry :tag="element" :checkable="operable" @selectTag="onSelectTag" />
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
  emits: [ 'update:childTags', 'selectTag' ],
  setup(props, context) {
    console.log("TagTreeTypeListChild.childTagType", props.childTagType);
    console.log("TagTreeTypeListChild.childTags", props.childTags);
    watch(
        () => props.childTags,
        (newVal) => {
          context.emit("update:childTags", newVal);
        }
    );
    const onSelectTag = (tag: Context.Tag, check: boolean) => {
      context.emit('selectTag', tag, check);
    }
    return { onSelectTag }
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