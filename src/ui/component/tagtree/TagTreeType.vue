<template>
  <TagTreeTypeTitle
      v-model:open="open"
      :lock-open="addingTag"
      :count="[...tagType.tags.values()].flat().filter(t => t.check === true).length"
      :operable="operable"
      :type-name="tagType.type"
      @edit-type-name="editTypeName"
      :extra-add="true"
      @extra-add="addingTag = true"
      :extra-lookup="true"
      @extra-lookup="togglePage('PageSelect', tagType.type)"
      @delete-tag-type="(typeName) => $emit('deleteTagType', typeName)"
  />
  <FigButton
      class="button-empty-add-tag"
      type="dashed"
      v-if="operable && open && !addingTag && isTagTypeEmpty"
      @click="addingTag = true">
    <img :src="require('../../resource/plus.svg')" alt="add">
    <span style="margin-left: 8px"> {{ $t('tag.add.button') }} </span>
  </FigButton>
  <TagTreeEntryEdit
      class="tag-tree-type-add-tag"
      v-if="operable && addingTag"
      :placeholder="$t('tag.add.placeholder')"
      @submit="addTag"
      @cancel="addingTag = false"
      :color="Utils.randomTagColor()"
  />
  <TagTreeTypeList
      v-show="open"
      :operable="operable"
      :tag-type="tagType"
      @select-tag="onSelectTag"
      @edit-tag="(nameFrom, tag) => $emit('editTag', nameFrom, tag)"
      @delete-tag="(tagName) => $emit('deleteTag', tagName)"
  />
</template>

<script lang="ts">

import {computed, PropType, ref} from "vue";
import * as Utils from "../../utils";
import TagTreeTypeTitle from "./TagTreeTypeTitle.vue";
import TagTreeTypeList from "./TagTreeTypeList.vue";
import TagTreeEntryEdit from "./TagTreeEntryEdit.vue";
import FigButton from "../FigButton.vue";

export default {
  name: "TagTreeType",
  components: { FigButton, TagTreeEntryEdit, TagTreeTypeList, TagTreeTypeTitle },
  props: {
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
    tagType: Object as PropType<Context.TagType>,
    checkable: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: true
    },
    operable: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'selectTag',
    'addTag',
    'editTag',
    'deleteTag',
    'editTypeName',
    'deleteTagType'
  ],
  setup(props, context) {
    const addingTag = ref(false);
    // 一层层往外传，直到PageNode
    const addTag = (text: string, color?: Transfer.TagColor) => {
      if (text && text.length > 0) {
        addingTag.value = false;
        if (!color) color = Utils.randomTagColor();
        context.emit('addTag', {
          name: text,
          color: color.color,
          background: color.background
        });
      }
    }
    const onSelectTag = (tag, check) => {
      context.emit('selectTag', tag, check);
    }
    const isTagTypeEmpty = computed(() => {
      return [...props.tagType.tags.values()].flat().length === 0;
    });
    const editTypeName = (typeName: string) => {
      context.emit('editTypeName', typeName);
    }
    return { Utils, addingTag, isTagTypeEmpty, addTag, onSelectTag, editTypeName }
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
  padding: 4px 5px 4px 4px;
}

</style>