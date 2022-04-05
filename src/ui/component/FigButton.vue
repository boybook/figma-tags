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
      validator(value) {
        return ['primary', 'secondary', 'link'].includes(value)
      },
      default: 'secondary'
    }
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
  background: #18A0FB;
  color: #FFF;
}

.button--primary:hover {
  background: #0677bd;
}

.button--secondary {
  background: #FFF;
  color: rgba(0, 0, 0, .85);
  box-shadow: inset 0 0 0 1px #E5E5E5;
}

.button--secondary:hover {
  background: #FFF;
  color: #18A0FB;
  box-shadow: inset 0 0 0 1px #18A0FB;
}

.button--link {
  padding: 6px 8px;
  background: #FFF;
  color: #18A0FB;
}

.button--link:hover {
  background: #FFF;
  color: #0677bd;
}

</style>