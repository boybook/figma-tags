<template>
  <li class="tk-select-item"
      :class="{ 'active': active, 'tk-select-item--size-small': size==='small', 'tk-select-item--size-normal': size==='normal', 'tk-select-item--size-large': size==='large' }"
      @click="chooseSelectItem"
  >
    <slot></slot>
  </li>
</template>

<script>
import Bus from './selectBus';
import {ref, getCurrentInstance, inject, onDeactivated} from 'vue';

export default {
  name: "TkSelectItem",
  props: {
    value: {},
    size: {
      type: String,
      default: "normal"
    }
  },
  setup(props) {

    const page = getCurrentInstance();

    const active = ref(false);

    // 接收token
    const token = inject('token');
    page.token = token;

    Bus.$on('chooseActive', (res) => {
      if (res.token !== page.token) {
        return;
      }
      active.value = res.value === props.value;
    });

    // 选择下拉
    function chooseSelectItem() {
      Bus.$emit('chooseSelectItem', {token: token, value: props.value});
    }

    onDeactivated(() => {
      Bus.$off('chooseActive')
    })

    return {
      chooseSelectItem,
      active,
      token
    }
  }
}
</script>

<style scoped>

.tk-select-item {
  font-weight: 400;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  transition: background .3s ease;
}

.tk-select-item--size-small {
  font-size: 12px;
  line-height: 18px;
  padding: 4px 8px;
}

.tk-select-item--size-normal {
  font-size: 14px;
  line-height: 22px;
  padding: 5px 12px;
}

.tk-select-item--size-large {
  font-size: 14px;
  line-height: 24px;
  padding: 6px 12px;
}

.tk-select-item:hover {
  background-color: #FAFAFA;
}

.tk-select-item.active {
  background-color: #18A0FB1A !important;
}

</style>