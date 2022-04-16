<template>
  <!-- 下拉框 -->
  <div class="tk-select">
    <div ref="select_button" class="tk-select-button" @click="selectOpen = !selectOpen">
      <!-- 选中内容 -->
      <slot name="selectButton">
        <div class="tk-select-button-input" :class="'tk-select-button-input--size-' + size">
          <span :class="{ 'tk-select-button-span-empty': !selectValue || selectValue.length === 0 }"> {{ valueDisplay }} </span>
          <div class="select-icon" :class="{'selectOpen':selectOpen}">
            <img :src="require('../../resource/arrow-down.svg')" class="fi fi-rr-angle-small-down" alt="arrow-down">
          </div>
        </div>
      </slot>
    </div>
    <!-- 下拉框 -->
    <teleport to="body">
      <transition name="select">
        <div ref="select_dropdown" v-show="selectOpen" :style="dropdownStyle" class="tk-select-dropdown">
          <ul>
            <slot name="selectDropDown"></slot>
          </ul>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import {tokenFun} from '../../utils/token';
import Bus from './selectBus';
import {ref, onMounted, computed, watch, onDeactivated, provide, getCurrentInstance, PropType} from 'vue';

export default {
  name: 'TkSelect',
  props: {
    selected: {},
    minWidth: Number,
    maxHeight: Number,
    align: {
      type: String as PropType<'left' | 'right'>,
      default: "left"
    },
    size: {
      type: String,
      default: 'normal'
    },
    valueDisplay: {
      type: Function
    },
    allowClearSelection: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {

    const page = getCurrentInstance();

    // 获取按钮
    const select_button = ref(null);
    const select_dropdown = ref(null);

    // 打开状态
    const selectOpen = ref(false);

    // 选中内容
    const selectValue = ref('');

    // 下拉框位置
    const dropdownPosition = ref({x: 0, y: 0, w: 0})

    // 下拉框位置
    const dropdownStyle = computed(() => {
      return {
        left: `${dropdownPosition.value.x}px`,
        top: `${dropdownPosition.value.y}px`,
        width: `${props.minWidth ? Math.max(props.minWidth, dropdownPosition.value.w) : dropdownPosition.value.w}px`,
        maxHeight: props.maxHeight ? `${props.maxHeight}px` : 'auto'
      }
    })

    watch(selectOpen, (val) => {
      if (val)
          // 计算位置
        calculateLocation();
    })

    watch(selectValue, () => {
      ctx.emit('update:modelValue', selectValue.value)
    })

    // 计算位置
    function calculateLocation() {
      if (select_button.value) {
        const select_button_dom = select_button.value.getBoundingClientRect();
        dropdownPosition.value.w = props.minWidth ? Math.max(props.minWidth, select_button_dom.width) : select_button_dom.width;
        if (props.align === "left") {
          dropdownPosition.value.x = select_button_dom.left;
        } else {
          dropdownPosition.value.x = select_button_dom.left + select_button_dom.width - dropdownPosition.value.w;
        }
        dropdownPosition.value.y = select_button_dom.top + select_button_dom.height + 2;
      }
    }

    window.addEventListener('click', (event) => {
      if (select_button.value && select_dropdown.value) {
        if (!select_button.value.contains(event.target) && !select_dropdown.value.contains(event.target)) {
          selectOpen.value = false
        }
      }
    })
    window.addEventListener('touchstart', (event) => {
      if (select_button.value && select_dropdown.value) {
        if (!select_button.value.contains(event.target) && !select_dropdown.value.contains(event.target)) {
          selectOpen.value = false
        }
      }
    })

    window.addEventListener('resize', () => {
      // 计算面板位置
      calculateLocation();
    })
    window.addEventListener('scroll', () => {
      // 计算面板位置
      calculateLocation();
    })

    onDeactivated(() => {
      //@ts-ignore
      window.removeEventListener('resize');
      //@ts-ignore
      window.removeEventListener('scroll');
      //@ts-ignore
      window.removeEventListener('click');
      //@ts-ignore
      window.removeEventListener('touchstart');
      Bus.$off('chooseSelectItem');
    })

    const token = 'select-' + tokenFun();
    // 获取生成的token
    //@ts-ignore
    page.token = token;
    // 给子元素派发token
    provide('token', token);

    onMounted(() => {
      Bus.$on('chooseSelectItem', (res) => {
        //@ts-ignore
        if (res.token === page.token) {
          if (selectValue.value === res.value && props.allowClearSelection) {
            selectValue.value = undefined;
          } else {
            selectValue.value = res.value;
          }
          selectOpen.value = false;
          Bus.$emit('chooseActive', {token: token, value: selectValue.value});
        }
      })
      console.log("TkSelect.onMounted", props.selected);
      if (props.selected) {
        selectValue.value = props.selected
        Bus.$emit('chooseActive', {token: token, value: selectValue.value})
      }/* else {
        selectValue.value = ctx.slots.selectDropDown()[0].props.value
        Bus.$emit('chooseActive', {token: token, value: selectValue.value})
      }*/
    });

    const valueDisplay = computed(() => {
      if (props.valueDisplay) {
        return props.valueDisplay(selectValue.value);
      } else {
        return selectValue.value;
      }
    })

    return {
      selectOpen,
      selectValue,
      select_dropdown,
      select_button,
      dropdownStyle,
      dropdownPosition,
      calculateLocation,
      token,
      valueDisplay
    }
  }
}
</script>

<style scoped>

.tk-select-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: none;
  align-self: stretch;
  flex-grow: 1;
}

.tk-select-button-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  cursor: pointer;
  background: #FFFFFF;
  border: none;
  box-shadow: inset 0 0 0 1px #E5E5E5;
  box-sizing: border-box;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  transition: box-shadow 100ms ease;
}

.tk-select-button-span-empty {
  color: rgba(0, 0, 0, 0.25);
}

.tk-select-button-input:hover {
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 0 2px #24A0FB;
}

.tk-select-button-input--size-small {
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 12px;
  line-height: 18px;
}

.tk-select-button-input--size-normal {
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 24px;
}

.tk-select-button-input--size-large {
  padding: 4px 10px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 28px;
}

.select-icon {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all .2s;
}

.select-icon.selectOpen {
  transform: rotate(180deg);
}

.tk-select-dropdown {
  position: fixed;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  background-color: #fff;
  border-radius: 2px;
  padding: 4px 0;
  overflow: scroll;
  z-index: 999;
}

.select-enter-from, .select-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.select-enter-active, .select-leave-active {
  transform-origin: top center;
  transition: opacity .4s cubic-bezier(0.5, 0, 0, 1.25), transform .2s cubic-bezier(0.5, 0, 0, 1.25);
}

ul,ul li{
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: none;
}

</style>