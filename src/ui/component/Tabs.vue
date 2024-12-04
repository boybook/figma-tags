<template>
  <div class="tabs">
    <div
        class="tab-entry"
        v-for="(tab, index) in contents"
        :class="{ 'tab-entry--current': current === index }"
        @click="$emit('toggle', index, tab)"
    >
      <span class="tab-entry-span">
        {{ tab }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  name: "Tabs",
  props: {
    current: {
      type: Number,
      default: 0,
    },
    contents: {
      type: Array as PropType<string[]>,
      default: []
    }
  },
  emits: [ 'toggle' ],
  setup(props, context) {

  }
}
</script>

<style scoped>

.tabs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 6px;
}

.tab-entry {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 6px;
  flex: none;
  flex-grow: 0;
  /*margin: 0 2px 0 0;*/
  margin: 0;
  font-size: 12px;
  line-height: 32px;
  font-weight: 400;
  color: var(--color-text-secondary);
  transition: all 200ms ease-out;
  user-select: none;
  cursor: pointer;
}

.tab-entry:hover {
  color: var(--color-text-hover);
}

.tab-entry--current {
  font-weight: 600 !important;
  color: var(--color-text) !important;
}

.tab-entry--current .tab-entry-span {
  border-bottom: var(--color-text) solid 2px;
}

.tab-entry-span {
  padding: 0;
}

</style>