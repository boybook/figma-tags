<template>
  <button :class="'button--' + type" :disabled="disable">
    <LoadingIcon v-if="loadingShow" :color="loadingColor" width="12" class="button-loading" />
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {computed, PropType} from "vue";
import LoadingIcon from "./LoadingIcon.vue";

export default {
  name: "FigButton",
  components: {LoadingIcon},
  props: {
    type: {
      type: String as PropType<'primary' | 'secondary' | 'link' | 'dashed'>,
      validator(value) {
        return ['primary', 'secondary', 'link', 'dashed'].includes(value)
      },
      default: 'secondary'
    },
    status: {
      type: String as PropType< 'normal' | 'loading' | 'disable' >,
      validator(value) {
        return ['normal', 'loading', 'disable'].includes(value)
      },
      default: 'normal'
    }
  },
  setup(props) {
    const disable = computed(() => {
      return ['loading', 'disable'].includes(props.status)
    });
    const loadingShow = computed(() => {
      return props.status === 'loading';
    });
    const loadingColor = computed(() => {
      if (props.type === 'primary') {
        return 'white';
      } else {
        return 'black';
      }
    });
    return { disable, loadingShow, loadingColor }
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
  font-family: inherit;
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
  background: transparent;
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

.button-loading {
  margin-right: 8px;
}

</style>