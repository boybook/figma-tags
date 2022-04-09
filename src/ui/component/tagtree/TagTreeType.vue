<template>
  <TagTreeTypeTitle
      v-model:open="open"
      :lock-open="addingTag"
      :count="[...tagType.tags.values()].flat().filter(t => t.check === true).length"
      :extra-add="true"
      @extra-add="addingTag = true"
  >
    {{ tagType.type }}
  </TagTreeTypeTitle>
  <FigButton class="button-empty-add-tag" type="dashed" v-if="open && !addingTag && isTagTypeEmpty" @click="addingTag = true">
    <img :src="require('../../resource/plus.svg')" alt="add">
    <span style="margin-left: 8px">New Tag</span>
  </FigButton>
  <TagTreeTypeAddTag class="tag-tree-type-add-tag" v-if="addingTag" placeholder="The tag name" @submit="addTag" @cancel="addingTag = false" style="padding: 4px 5px 4px 24px" />
  <TagTreeTypeList :tag-type="tagType" v-show="open" @select-tag="onSelectTag" />
</template>

<script lang="ts">

import {computed, PropType, ref} from "vue";
import * as Utils from "../../utils";
import TagTreeTypeTitle from "./TagTreeTypeTitle.vue";
import TagTreeTypeList from "./TagTreeTypeList.vue";
import TagTreeTypeAddTag from "./TagTreeTypeAddTag.vue";
import FigButton from "../FigButton.vue";

export default {
  name: "TagTreeType",
  components: {FigButton, TagTreeTypeAddTag, TagTreeTypeList, TagTreeTypeTitle },
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
    const isTagTypeEmpty = computed(() => {
      return [...props.tagType.tags.values()].flat().length === 0;
    })
    return { addingTag, isTagTypeEmpty, addTag, onSelectTag }
  }
}
</script>

<style scoped>

.button-empty-add-tag {
  margin-left: 24px;
  margin-bottom: 8px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
}

.tag-tree-type-add-tag {
  flex: none;
  align-self: stretch;
  margin-bottom: 6px;
}

</style>