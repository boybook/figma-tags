<template>
  <div class="tag-color" :style="{ 'background-color': 'rgba(' + color.background.r + ',' + color.background.g + ',' + color.background.b + ',' + color.background.a + ')' }">
    <span :style="{ 'color': 'rgba(' + color.color.r + ',' + color.color.g + ',' + color.color.b + ',' + color.color.a + ')' }">A</span>
  </div>
</template>

<script lang="ts">
import {watch, PropType} from "vue";
import * as Utils from "../../utils";

export default {
  name: "TagColorDropdown",
  props: {
    color: Object as PropType<Transfer.TagColor>
  },
  emits: [ 'update:color' ],
  setup(props, context) {
    watch(
        () => props.color,
        (newVal) => {
          context.emit('update:color', newVal);
        }
    )
  }
}
</script>

<style scoped>

.tag-color {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 2px;
  transition: all 100ms ease-out;
}

.tag-color:hover {
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.tag-color span {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  flex: none;
  flex-grow: 0;
  margin: 0 0;
}

</style>