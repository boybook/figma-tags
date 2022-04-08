<template>
  <span class="tag" :style="{ padding: removable ? '0 0 0 8px' : '0 8px', color: 'rgba(' + tag.color.r + ',' + tag.color.g + ',' + tag.color.b + ',' + tag.color.a + ')', background: 'rgba(' + tag.background.r + ',' + tag.background.g + ',' + tag.background.b + ',' + tag.background.a + ')' }">
    {{ tag.name }}
    <svg v-if="removable" @click="clickRemove" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.57795 6.99949L10.5076 3.5073C10.5567 3.44927 10.5155 3.3611 10.4396 3.3611H9.54894C9.49648 3.3611 9.44626 3.38454 9.41166 3.42472L6.99536 6.3053L4.57907 3.42472C4.54559 3.38454 4.49536 3.3611 4.44179 3.3611H3.55117C3.47527 3.3611 3.43398 3.44927 3.48309 3.5073L6.41277 6.99949L3.48309 10.4917C3.47209 10.5046 3.46503 10.5204 3.46275 10.5373C3.46048 10.5541 3.46308 10.5712 3.47024 10.5866C3.47741 10.602 3.48885 10.615 3.50319 10.6241C3.51754 10.6332 3.53419 10.638 3.55117 10.6379H4.44179C4.49425 10.6379 4.54447 10.6144 4.57907 10.5743L6.99536 7.69369L9.41166 10.5743C9.44514 10.6144 9.49536 10.6379 9.54894 10.6379H10.4396C10.5155 10.6379 10.5567 10.5497 10.5076 10.4917L7.57795 6.99949Z" fill="black" fill-opacity="0.65"/>
    </svg>
  </span>
</template>

<script lang="ts">

import {PropType} from "vue";
import * as Utils from "../utils";

export default {
  name: "FigTag",
  props: {
    tag: {
      type: Object as PropType<Storage.Tag>,
      default: Utils.defaultTag('Tag')
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const clickRemove = () => {
      emit('remove');
    }
    return { clickRemove }
  }
}
</script>

<style scoped>

.tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;

  border-radius: 3px;
  background-color: #E3E2E0;

  color: rgba(0, 0, 0, .85);
  font-size: 12px;
  line-height: 18px;

  user-select: none;
}

.tag svg {
  padding: 0 4px 0 2px;
  cursor: pointer;
}

</style>