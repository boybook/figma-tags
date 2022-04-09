<template>
  <button :class="'button--' + type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "FigButton",
  props: {
    type: {
      type: String,
      validator(value) {
        return ['primary', 'secondary', 'link', 'dashed'].includes(value)
      },
      default: 'secondary'
    },
  },
  setup() {

  }
}
</script>

<style scoped>

button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  border-radius: 2px;
  font-size: 12px;
  line-height: 18px;
  border: none;
  transition: all 100ms ease;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
}

.button--primary {
  background: #18a0fb;
  color: #fff;
}

.button--primary:hover {
  background: #0677bd;
}

.button--primary:active {
  background: #0468a4;
}

.button--secondary {
  background: #fff;
  color: rgba(0, 0, 0, .85);
  box-shadow: inset 0 0 0 1px #e5e5e5;
}

.button--secondary:hover {
  background: #fff;
  color: #18a0fb;
  box-shadow: inset 0 0 0 1px #18a0fb;
}

.button--secondary:active {
  color: #0468a4;
  box-shadow: inset 0 0 0 1px #0468a4;
}

.button--link {
  padding: 6px 8px;
  background: #fff;
  color: #18A0FB;
}

.button--link:hover {
  color: #0677bd;
}

.button--link:active {
  color: #0468a4;
}

.button--dashed {
  background: #fff;
  color: rgba(0, 0, 0, .85);
  border: dashed 1px rgba(0, 0, 0, 0.1);
}

.button--dashed:hover {
  color: #18a0fb;
  border: dashed 1px rgba(24, 160, 251, 0.8);
}

.button--dashed:active {
  color: #0468a4;
  border: dashed 1px rgba(4, 104, 164, 0.8);
}

</style>