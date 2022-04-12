<template>
  <div class="access-modal">
    <h1> {{ $t('access.title') }} </h1>
    <p style="margin-bottom: 16px"> {{ $t('access.intro') }} </p>
    <p style="margin: 0 0 8px"> {{ $t('access.step1') }} </p>
    <a class="access-modal-url" href="https://www.figma.com/developers/api?fuid=907796581785540291#access-tokens" target="_blank">
      <img :src="require('../resource/link.svg')" alt="link" style="margin-right: 8px;">
      <span> Figma REST API </span>
    </a>
    <p style="margin-top: 8px"> {{ $t('access.step2') }} </p>
    <img :src="require('../resource/access-token.png')" alt="access-token" style="width: 100%">
    <FigInput
        size="small"
        v-model:val="input"
        :placeholder="$t('access.placeholder') "
        @submit="submit"
        :status="error ? 'error' : undefined"
        @keydown="error = false"
    />
    <p v-if="error" style="color: #f24822">
      {{ $t('access.error') }}
    </p>
    <div class="button-group">
      <FigButton @click="$emit('ignore', callback)"> {{ $t('button.ignore') }} </FigButton>
      <FigButton type="primary" @click="submit"> {{ $t('button.ok') }} </FigButton>
    </div>
  </div>
</template>

<script lang="ts">

import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
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
    const error = ref(false);
    const submit = () => {
      if (input.value) {
        // 检查有效性
        if (input.value.length !== 43) {
          error.value = true;
        } else {
          fetch('https://api.figma.com/v1/me', {
            headers: {
              'X-FIGMA-TOKEN': input.value
            }
          })
          .then(re => {
            if (re.ok) {
              re.json().then(r => console.log(r));
              error.value = false;
              context.emit('submit', input.value, props.callback);
            } else {
              error.value = true;
            }
          })
          .catch(() => {
            error.value = true;
          });
        }
      }
    }
    return { input, error, submit }
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

.access-modal-url {
  background-color: #f8f8f8;
  padding: 6px 12px;
  color: #18a0fb;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-decoration: none;
  transition: all 200ms ease-out;
}

.access-modal-url:hover {
  background-color: #f0f0f0;
  color: #0083d5;
}

</style>