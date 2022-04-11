<template>
  <div class="access-modal">
    <h1> {{ $t('access.title') }} </h1>
    <p style="margin-bottom: 16px"> {{ $t('access.intro') }} </p>
    <img :src="require('../../resource/access-token.png')" alt="access-token" style="width: 100%">
    <FigInput size="small" v-model:val="input" :placeholder="$t('access.placeholder') " @submit="submit" />
    <div class="button-group">
      <FigButton @click="$emit('ignore', callback)"> {{ $t('button.ignore') }} </FigButton>
      <FigButton type="primary" @click="submit"> {{ $t('button.ok') }} </FigButton>
    </div>
  </div>
</template>

<script lang="ts">

import FigInput from "../../component/FigInput.vue";
import FigButton from "../../component/FigButton.vue";
import { ref } from "vue";

export default {
  name: "AccessTokenModal",
  components: { FigButton, FigInput },
  props: {
    callback: Function
  },
  emits: [ 'ignore', 'submit' ],
  setup(props, context) {
    const input = ref("");
    const submit = () => {
      if (input.value) {
        // TODO 检查有效性
        context.emit('submit', input.value, props.callback);
      }
    }
    return { input, submit }
  }
}

</script>

<style scoped>

.access-modal {
  background-color: white;
  padding: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  user-select: none;
}

.access-modal > * {
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0 8px;
}

.access-modal h1 {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.85);
}

.access-modal p {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.65);
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0;
  margin: 8px 0 0 0;
}

.button-group > * {
  margin-left: 8px;
}

</style>