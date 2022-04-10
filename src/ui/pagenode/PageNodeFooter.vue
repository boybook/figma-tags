<template>
  <div class="footer">
    <FigButton type="primary" @click="$emit('save')"> {{ $t('button.save') }} </FigButton>
    <FigButton v-if="showDel" @click="$emit('delete')" style="padding: 8px">
      <img :src="require('./resource/delete.svg')" alt="delete">
    </FigButton>
  </div>
</template>

<script lang="ts">

import FigButton from "../component/FigButton.vue";

export default {
  name: "PageNodeFooter",
  components: { FigButton },
  props: {
    showDel: Boolean
  },
  emits: [
      'save',
      'delete'
  ]
}

</script>

<style scoped>

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px 9px; /* 不知为何，下方少了1个像素 */

  background: rgba(255, 255, 255, .8);
  backdrop-filter: blur(16px);

  border-top: 1px #E0E0E0 solid;
}

</style>