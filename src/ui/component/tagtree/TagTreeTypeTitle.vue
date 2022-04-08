<template>
  <div class="tree-title" @click="open = !open" @mouseover="hover = true" @mouseleave="hover = false">
    <img :src="require('../../resource/fold.svg')" alt="fold" class="icon-fold" :class="{ 'rotate-0': !open, 'rotate-90': open }">
    <span class="title-area">
      <span class="title-name">
        <slot></slot>
      </span>
      <span class="counter" v-bind:class="{ 'counter-zero': count === 0 }"> {{ count }} </span>
    </span>
    <div class="tree-extra-area" v-if="hover">

    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";

export default {

  name: "TagTreeTypeTitle",
  props: {
    open: Boolean,
    count: Number
  },
  emits: [ 'update:open' ],

  setup(props, context) {
    watch(
        () => props.open,
        (newVal) => {
          context.emit("update:open", newVal)
        }
    );
    const hover = ref(false);

    return { hover }
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
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.tree-title:active {
  background-color: rgba(0, 0, 0, 0.08);
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
  color: rgba(0, 0, 0, 0.85);
  background: rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  min-width: 8px;
  font-family: Avenir, -apple-system, serif;
}

.counter-zero {
  font-weight: 400 !important;
  color: rgba(0, 0, 0, 0.25) !important;
  background: rgba(0, 0, 0, 0.03) !important;
}

</style>