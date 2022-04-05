<template>
  <input
      :value="val"
      :placeholder="placeholder"
      :class="'input--size-' + size"
      @input="$emit('update:val', $event.target.value)"
      type="text"
  />
</template>

<script>
import { toRefs, defineComponent, watch } from "vue";

export default {
  name: "FigInput",
  props: {
    val: {
      type: String,
      default: "",
    },
    placeholder: String,
    size: {
      validator(value) {
        return ['small', 'normal', 'large'].includes(value)
      },
      default: 'normal'
    }
  },
  emits: ["update:val"],
  setup(props, { emit }) {
    watch(
        () => props.val,
        (newVal) => {
          emit("update:val", newVal);
        },
    );
    return {
      ...toRefs(props),
    };
  },
}
</script>

<style scoped>

input {
  background: #FFFFFF;
  border: none;
  box-shadow: inset 0 0 0 1px #E5E5E5;
  box-sizing: border-box;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  transition: box-shadow 100ms ease;
}

input:hover {
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 0 2px #24A0FB;
}

input:focus {
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 0 2px #24A0FB;
}

input::placeholder {
  color: rgba(0, 0, 0, .25);
}

.input--size-small {
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 12px;
  line-height: 18px;
}

.input--size-normal {
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 24px;
}

.input--size-large {
  padding: 4px 10px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 28px;
}

</style>