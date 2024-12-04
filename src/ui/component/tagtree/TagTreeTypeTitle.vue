<template>
  <div class="tree-title" @click="toggle" @mouseover="hover = true" @mouseleave="hover = false">
    <img :src="require('../../resource/fold.svg')" alt="fold" class="icon-fold" :class="{ 'rotate-0': !open, 'rotate-90': open }">
    <div class="title-area">
      <span class="title-name" v-if="!editing">
        {{ typeName }}
      </span>
      <div class="title-name-edit" v-if="editing">
        <TagTreeEntryEdit
            :default-text="typeName"
            placeholder="Tag type name"
            :show-delete="true"
            @submit="editTypeName"
            @cancel="editing = false"
            @to-delete="deleteTagType"
        />
      </div>
      <span class="counter" v-if="operable && !editing" v-bind:class="{ 'counter-zero': count === 0 }"> {{ count }} </span>
      <img v-if="operable && !editing" v-show="hover" class="icon-edit" @click="editing = true" @click.stop :src="require('../../resource/edit.svg')" alt="edit" style="margin-left: 4px;">
    </div>
    <div class="tree-extra-area" v-if="operable && !editing">
<!--      <popper :hover="true" :arrow="true" offsetDistance="0" :disableClickAway="true" :content="$t('tag_type.select.button')">
        <div v-if="extraLookup" class="tree-extra-operation" @click="$emit('extraLookup')" @click.stop style="margin: 0">
          <img :src="require('../../resource/lookup.svg')" alt="lookup">
        </div>
      </popper>-->
      <popper :hover="true" :arrow="true" offsetDistance="0" :disableClickAway="true" :content="$t('tag.add.button')">
        <div v-if="extraAdd" class="tree-extra-operation" @click="$emit('extraAdd')" @click.stop>
          <img :src="require('../../resource/add.svg')" alt="add">
        </div>
      </popper>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import TagTreeEntryEdit from "./TagTreeEntryEdit.vue";
import {useI18n} from "vue-i18n";

export default {

  name: "TagTreeTypeTitle",
  components: { TagTreeEntryEdit },
  props: {
    open: {
      type: Boolean,
      default: true
    },
    lockOpen: {
      type: Boolean,
      default: false
    },
    typeName: String,
    count: Number,
    extraLookup: Boolean,
    extraAdd: Boolean,
    operable: {
      type: Boolean,
      default: true
    }
  },
  emits: [ 'update:open', 'editTypeName', 'extraAdd', 'extraLookup', 'deleteTagType' ],

  setup(props, context) {
    const { t } = useI18n();
    const open = ref(props.open);
    const hover = ref(false);
    const editing = ref(false);

    const toggle = () => {
      open.value = props.lockOpen || editing.value || !open.value;
      context.emit("update:open", open.value);
    }

    const editTypeName = (name: string) => {
      // if (confirm(t('tag_type.edit.confirm', [name]))) {
        context.emit('editTypeName', name);
        editing.value = false;
      // }
    }

    const deleteTagType = () => {
      if (confirm(t('tag_type.delete.confirm', [props.typeName]))) {
        context.emit('deleteTagType', props.typeName);
        editing.value = false;
      }
    }

    return { open, hover, editing, toggle, editTypeName, deleteTagType }
  }
}

</script>

<style scoped>

.tree-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 4px 6px 8px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0;

  transition: background-color 100ms ease;
}

.tree-title:hover {
  background-color: var(--color-bg-hover-lite);
  border-radius: 3px;
}

.tree-title:active {
  background-color: var(--color-bg-pressed-lite);
}

.title-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;

  flex: none;
  order: 1;
  flex-grow: 1;
  margin: 0 4px 0 0;

  color: var(--color-text);
}

.icon-fold {
  transition: transform 100ms ease;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 4px;
}

.title-name {
  margin-right: 4px;
}

.rotate-0 {
  transform: rotate(0deg);
}

.rotate-90 {
  transform: rotate(90deg);
}

.counter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text);
  background: var(--color-bg-pressed-lite);
  border-radius: 16px;
  min-width: 8px;
  font-family: Avenir, -apple-system, serif;
}

.counter-zero {
  font-weight: 400 !important;
  color: var(--color-text-less) !important;
  background: var(--color-bg-hover-lite) !important;
}

.tree-extra-area {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.tree-extra-operation {
  margin-left: 2px;
  flex: none;
  flex-grow: 0;
  border-radius: 2px;
  padding: 4px;
  transition: background-color 100ms ease;
  cursor: pointer;
  animation-name: easein;
  animation-duration: 100ms;
}

.tree-extra-operation:hover {
  background-color: var(--color-bg-hover-lite);
}

.title-name-edit {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: none;
  align-self: stretch;
  flex-grow: 1;
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
  .icon-fold {
    filter: invert(100%);
  }
  .tree-extra-operation img {
    filter: invert(100%);
  }
}

</style>