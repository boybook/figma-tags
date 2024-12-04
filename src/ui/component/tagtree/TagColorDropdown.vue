<template>
  <tk-select class="tag-color-dropdown" :selected="colorName" v-model="colorName" :min-width="64">
    <template #selectButton>
      <div class="tag-color" :style="{ 'background-color': 'rgba(' + color.background.r + ',' + color.background.g + ',' + color.background.b + ',' + color.background.a + ')' }">
        <span :style="{ 'color': 'rgba(' + color.color.r + ',' + color.color.g + ',' + color.color.b + ',' + color.color.a + ')' }">A</span>
      </div>
    </template>
    <template #selectDropDown>
      <tk-select-item v-for="c in Utils.tagColors" :value="c.name">
        <FigTag :tag="{ name: 'Tag', color: c.color, background: c.background}"/>
      </tk-select-item>
    </template>
  </tk-select>

</template>

<script lang="ts">
import {watch, PropType, ref} from "vue";
import * as Utils from "../../utils";
import FigTag from "../FigTag.vue";
import TkSelect from "../select/TkSelect.vue";
import TkSelectItem from "../select/TkSelectItem.vue";

export default {
  name: "TagColorDropdown",
  components: { TkSelectItem, TkSelect, FigTag },
  props: {
    color: Object as PropType<Transfer.TagColor>
  },
  emits: [ 'update:color' ],
  setup(props, context) {
    const colorName = ref<string>();
    const color = ref<Transfer.TagColor>(props.color);
    // 根据color，选择一个colorName
    colorName.value = Utils.findColorName(color.value);

    watch(
        colorName,
        (newVal) => {
          color.value = Utils.tagColors[newVal];
          console.log("TagColorDropdown.switchColorName", newVal);
        }
    );
    watch(
        color,
        (newVal) => {
          context.emit('update:color', newVal);
        }
    );
    return { colorName, color, Utils }
  }
}
</script>

<style scoped>

.tag-color-dropdown {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: none;
  align-self: stretch;
  flex-grow: 1;
}

.tag-color {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  flex: none;
  align-self: stretch;
  flex-grow: 1;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  border-radius: 5px;
  transition: all 100ms ease-out;
  cursor: pointer;
}

.tag-color:hover {
  border: 1px solid rgba(0, 0, 0, 0.3);
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