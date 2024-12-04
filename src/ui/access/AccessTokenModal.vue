<template>
  <div class="access-modal">
    <h1> {{ $t('access.token.title') }} </h1>
    <p style="margin-bottom: 16px"> {{ $t('access.token.intro') }} </p>
    <p style="margin: 0 0 8px"> {{ $t('access.token.step1') }} </p>
    <a class="access-modal-url" href="https://www.figma.com/developers/api?fuid=907796581785540291#access-tokens" target="_blank">
      <img :src="require('../resource/link.svg')" alt="link" style="margin-right: 8px;">
      <span> Figma REST API </span>
    </a>
    <p style="margin-top: 8px"> {{ $t('access.token.step2') }} </p>
    <div class="access-modal-sample-img">
      <img :src="require('../resource/access-token.png')" alt="access-token" style="width: 100%">
      <span> {{ $t('access.token.demo') }} </span>
    </div>
    <FigInput
        size="small"
        v-model:val="input"
        :placeholder="$t('access.token.placeholder') "
        @submit="submit"
        :status="error ? 'error' : undefined"
        @keydown="error = false"
    />
    <p v-if="error" style="color: #f24822">
      {{ $t('access.token.error') }}
    </p>
    <div class="button-group">
      <FigButton @click="$emit('ignore', callback)"> {{ showIgnore ? $t('button.ignore') : $t('button.cancel') }} </FigButton>
      <FigButton type="primary" :status="loading ? 'loading' : 'normal'" @click="submit"> {{ buttonSubmit ? buttonSubmit : $t('button.ok') }} </FigButton>
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
    showIgnore: {
      type: Boolean,
      default: false
    },
    buttonSubmit: {
      type: String,
      default: undefined
    },
    callback: Function
  },
  emits: [ 'ignore', 'submit' ],
  setup(props, context) {
    const input = ref("");
    const loading = ref(false);
    const error = ref(false);
    const submit = async () => {
      // 检查有效性
      if (input.value?.startsWith("figd_") || input.value?.length === 43) {
        loading.value = true;
        try {
          const re = await fetch('https://api.figma.com/v1/me', {
            headers: {
              'X-FIGMA-TOKEN': input.value
            }
          })
          if (re.ok) {
            re.json().then(r => console.log(r));
            error.value = false;
            context.emit('submit', input.value, props.callback);
          } else {
            error.value = true;
          }
        } catch (e) {
          console.error(e);
          error.value = true;
        } finally {
          loading.value = false;
        }
      } else {
        error.value = true;
      }
    }
    return { input, loading, error, submit }
  }
}

</script>

<style scoped>

.access-modal {
  background-color: var(--color-bg);
  padding: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  user-select: none;
  animation: modal-show 300ms cubic-bezier(0, 0, 0, 1);
}

@keyframes modal-show
{
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
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
  color: var(--color-text);
}

.access-modal p {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-secondary);
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
  background-color: var(--color-bg-hover-lite);
  padding: 6px 12px;
  color: #18a0fb;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-decoration: none;
  transition: all 200ms ease-out;
}

.access-modal-url:hover {
  background-color: var(--color-bg-pressed-lite);
  color: #0083d5;
}

.access-modal-sample-img {
  position: relative;
  align-self: stretch;
}

.access-modal-sample-img span {
  position: absolute;
  right: 4px;
  top: 8px;
  font-size: 12px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.5);
  transform: rotate(30deg);
}

</style>