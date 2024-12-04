<template>
  <input
      :value="val"
      :placeholder="placeholder"
      :class="classObject"
      @input="$emit('update:val', $event.target.value)"
      @keyup.enter="$emit('submit')"
      type="text"
  />
</template>

<script lang="ts">

import {toRefs, watch, computed} from "vue";

export default {
  name: "FigInput",
  props: {
    val: {
      type: String,
      default: "",
    },
    placeholder: String,
    size: {
      type: String,
      validator(value) {
        return ['small', 'normal', 'large'].includes(value)
      },
      default: 'normal'
    },
    status: {
      type: String,
      validator(value) {
        return ['', 'error', 'warning'].includes(value)
      },
      default: ''
    }
  },
  emits: [ "update:val", "submit" ],
  setup(props, context) {
    watch(
        () => props.val,
        (newVal) => {
          context.emit("update:val", newVal);
        },
    );
    const classObject = computed(() => (
      {
        'input--size-small': props.size === 'small',
        'input--size-normal': props.size === 'normal',
        'input--size-large': props.size === 'large',
        'input--status-error': props.status === 'error',
        'input--status-warning': props.status === 'warning'
      }
    ));
    return {
      ...toRefs(props), classObject
    };
  },
}
</script>

<style scoped>

input {
  background: var(--color-bg-secondary);
  border: none;
  box-shadow: inset 0 0 0 1px var(--color-input-border);
  box-sizing: border-box;
  border-radius: 5px;
  color: var(--color-text);
  transition: box-shadow 100ms ease;
}

input:hover {
  border: none;
  border-radius: 5px;
  box-shadow: inset 0 0 0 2px #24A0FB;
}

input:focus {
  border: none;
  border-radius: 5px;
  box-shadow: inset 0 0 0 2px #24A0FB;
}

input::placeholder {
  color: var(--color-text-secondary);
}

.input--size-small {
  padding: 4px 8px;
  color: var(--color-text);
  font-size: 12px;
  line-height: 18px;
}

.input--size-normal {
  padding: 4px 8px;
  color: var(--color-text);
  font-size: 14px;
  line-height: 24px;
}

.input--size-large {
  padding: 4px 10px;
  color: var(--color-text);
  font-size: 16px;
  line-height: 28px;
}

.input--status-error {
  box-shadow: inset 0 0 0 1px #f24822 !important;
}

.input--status-warning {
  box-shadow: inset 0 0 0 1px #faad14 !important;
}

</style>