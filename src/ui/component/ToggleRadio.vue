<template>
  <div class="toggle-radio">
    <div
        v-for="(entry, index) in entries"
        class="toggle-radio-entry"
        :class="{ 'toggle-radio-entry--current': index === current, 'toggle-radio-entry--normal': index !== current }"
        @click="onSwitch(index, entry)"
    >
      {{ entry }}
    </div>
  </div>
</template>

<script lang="ts">
import {ref, watch} from "vue";

export default {
  name: "ToggleRadio",
  props: {
    entries: Array,
    current: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:current'],
  setup(props, context) {
    const current = ref(props.current);
    watch(
        current,
        (newVal) => {
          console.log("onSwitch", newVal);
          context.emit('update:current', newVal);
        }
    );
    const onSwitch = (index: number, entry: string) => {
      if (index !== props.current) {
        current.value = index;
      }
    }
    return { current, onSwitch }
  }
}
</script>

<style scoped>

.toggle-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  background: #F0F0F0;
  border-radius: 4px;
}

.toggle-radio-entry {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 16px;
  border-radius: 2px;
  transition: all 200ms ease-out;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
}

.toggle-radio-entry--current {
  background-color: #fff;
}

.toggle-radio-entry--normal {
  background-color: transparent;
}

.toggle-radio-entry--normal:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.toggle-radio-entry--normal:active {
  background-color: rgba(0, 0, 0, 0.1);
}

</style>