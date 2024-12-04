<template>
  <div class="tag-entry" :class="{ 'selected': tag.check }" @click="onSelectTag" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="tag-entry-left" v-if="!editing">
      <img class="icon-drag" :class="{ 'icon-drag-show': checkable && hover }" :src="require('../../resource/drag.svg')" alt="drag" @click.stop >
      <FigTag :tag="tag" :removable="false" />
      <img class="icon-edit" v-if="checkable" v-show="hover" :src="require('../../resource/edit.svg')" alt="edit" @click="editing = true" @click.stop>
    </div>
    <TagTreeEntryEdit
        class="tag-entry-left"
        v-if="editing"
        :default-text="tag.name"
        :show-delete="true"
        placeholder="Tag"
        @submit="tryEdit"
        @cancel="editing = false"
        @to-delete="tryDelete"
        :color="{ color: tag.color, background: tag.background }"
    />
    <img class="tree-entry-icon-check" v-if="checkable && !editing" v-show="tag.check" :src="require('../../resource/check.svg')" alt="check" >
  </div>
</template>

<script lang="ts">

import FigTag from "../FigTag.vue";
import {PropType, ref} from "vue";
import TagTreeEntryEdit from "./TagTreeEntryEdit.vue";
import {useI18n} from "vue-i18n";

export default {
  name: "TagTreeTypeListEntry",
  components: { TagTreeEntryEdit, FigTag },
  props: {
    tag: Object as PropType<Context.Tag>,
    checkable: {
      type: Boolean,
      default: true
    }
  },
  emits: [
      'selectTag', 'editTag', 'deleteTag',
  ],
  setup(props, context) {
    const { t } = useI18n();
    const hover = ref(false);
    const editing = ref(false);
    const onSelectTag = () => {
      if (props.checkable && !editing.value) {
        props.tag.check = !props.tag.check;
      }
      context.emit('selectTag', props.tag, props.tag.check);
    }
    const tryEdit = (newTagName: string, color?: Transfer.TagColor) => {
      if (newTagName === props.tag.name && color?.color === props.tag.color && color?.background === props.tag.background) {
        editing.value = false;
        return;  // Nothing changed!
      }
      //if (props.tag.isNew || confirm(t('tag.edit.confirm', [newTagName]))) {
        const newTag : Storage.Tag = {
          id: props.tag.id,
          name: newTagName,
          color: color ? color.color : props.tag.color,
          background: color ? color.background : props.tag.background,
        };
        const nameFrom = props.tag.name;
        context.emit('editTag', props.tag.id, nameFrom, newTag);
      //}
      editing.value = false;
    }
    const tryDelete = () => {
      if (props.tag.isNew || confirm(t('tag.delete.confirm', [props.tag.name]))) {
        context.emit('deleteTag', props.tag.id);
      }
      editing.value = false;
    }
    return { hover, editing, onSelectTag, tryEdit, tryDelete }
  }
}

</script>

<style scoped>

.tag-entry {
  /* Auto layout */
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px 5px 4px;
  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0;

  transition: background-color 100ms ease;
  border-radius: 3px;
}

.tag-entry:hover {
  background-color: var(--color-bg-topbar-current-hover);
}

.tag-entry-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tag-entry-left > * {
  margin-right: 4px;
}

.selected {
  background-color: var(--color-bg-tree-selected);
  border-radius: 0;
}

.icon-drag {
  opacity: 0;
  padding: 0;
  transition: opacity 50ms ease-out;
}

.icon-drag:hover {
  opacity: 0.3 !important;
}

.icon-drag-show {
  opacity: 0.2;
  cursor: move;
}

.icon-edit {
  cursor: pointer;
  opacity: 0.4;
  transition: opacity 50ms ease-out;
}

.icon-edit:hover {
  opacity: 1;
}

@media (prefers-color-scheme: dark) {
  .icon-drag {
    filter: invert(100%);
  }
  .icon-edit {
    filter: invert(100%);
  }
  .tree-entry-icon-check {
    filter: invert(100%);
  }
}

</style>