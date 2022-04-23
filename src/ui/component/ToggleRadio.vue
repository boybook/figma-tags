<template>
  <div class="toggle-radio" :class="{ 'toggle-radio--hug': !fill, 'toggle-radio--fill': fill }">
    <div
        v-for="(entry, index) in entries"
        class="toggle-radio-entry"
        :class="{ 'toggle-radio-entry--current': index === current, 'toggle-radio-entry--normal': index !== current, 'toggle-radio-entry--hug': !fill, 'toggle-radio-entry--fill': fill }"
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
    fill: {
      type: Boolean,
      default: false
    },
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
  border-radius: 2px;
  transition: all 200ms ease-out;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
}

.toggle-radio--hug {
  align-self: auto;
  flex-grow: 0;
}

.toggle-radio--fill {
  align-self: stretch;
  flex-grow: 1;
}

.toggle-radio-entry--hug {
  align-self: auto;
  flex-grow: 0;
  padding: 0 16px;
}

.toggle-radio-entry--fill {
  padding: 0;
  align-self: stretch;
  flex-grow: 1;
  text-align: center;
  justify-content: center;
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