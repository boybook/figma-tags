<template>
  <div class="toggle-radio" :class="{ 'toggle-radio--hug': fill === 'hug', 'toggle-radio--fill': fill === 'fill' }">
    <popper :hover="true" :arrow="true" offsetDistance="0" v-for="(entry, index) in entries" :content="typeof entry === 'object' ? entry['tooltip'] : null">
      <div
          class="toggle-radio-entry"
          :class="{ 'toggle-radio-entry--current': index === current, 'toggle-radio-entry--normal': index !== current, 'toggle-radio-entry--hug': fill === 'hug', 'toggle-radio-entry--fill': fill === 'fill', 'toggle-radio-entry--min': fill === 'min' }"
          @click="onSwitch(index, entry)"
      >
        <img v-if="entry['icon']" :src="entry['icon']" alt="entry">
        <span v-if="typeof entry === 'object' ? entry.text : entry" :style="{ marginLeft: (typeof entry === 'object' && entry.icon) ? '4px' : 0 }">
          {{ typeof entry === 'object' ? entry.text : entry }}
        </span>
      </div>
    </popper>
  </div>
</template>

<script lang="ts">
import {PropType, ref, watch} from "vue";

export default {
  name: "ToggleRadio",
  props: {
    fill: {
      type: String as PropType<'hug'|'min'|'fill'>,
      default: 'hug'
    },
    entries: {
      type: Array,
      default: []
    },
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
      if (index !== current.value) {
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
  align-items: center;
  border-radius: 2px;
  transition: all 200ms ease-out;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
  user-select: none;
}

.toggle-radio-entry img {
  width: 14px;
}

.toggle-radio--hug {
  align-self: auto;
  flex-grow: 0;
}

.toggle-radio--fill {
  align-self: stretch;
  flex-grow: 1;
}

.toggle-radio--fill>* {
  display: flex;
  align-self: stretch;
  flex-grow: 1;
}

.toggle-radio-entry--hug {
  align-self: auto;
  flex-grow: 0;
  padding: 0 16px;
  min-height: 22px;
}

.toggle-radio-entry--fill {
  padding: 0;
  align-self: stretch;
  flex-grow: 1;
  text-align: center;
  justify-content: center;
  min-height: 22px;
}

.toggle-radio-entry--min {
  align-self: auto;
  flex-grow: 0;
  padding: 7px;
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