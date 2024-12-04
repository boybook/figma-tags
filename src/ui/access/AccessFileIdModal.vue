<template>
  <div class="access-modal">
    <h1> {{ $t('access.file_id.title') }} </h1>
    <p style="margin-bottom: 16px"> {{ $t('access.file_id.intro') }} </p>
    <p style="margin: 0 0 8px"> {{ $t('access.file_id.step1') }} </p>
    <p style="margin-top: 8px"> {{ $t('access.file_id.step2') }} </p>
    <FigInput
        size="small"
        v-model:val="input"
        :placeholder="$t('access.file_id.placeholder') "
        @submit="submit"
        :status="error ? 'error' : undefined"
        @keydown="error = false"
    />
    <p v-if="error" style="color: #f24822">
      {{ $t('access.file_id.error') }}
    </p>
    <div class="button-group">
      <FigButton @click="$emit('ignore')"> {{ $t('button.cancel') }} </FigButton>
      <FigButton type="primary" @click="submit"> {{ buttonSubmit ? buttonSubmit : $t('button.ok') }} </FigButton>
    </div>
  </div>
</template>

<script lang="ts">

import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
import { ref } from "vue";

export default {
  name: "AccessFileIdModal",
  components: { FigButton, FigInput },
  props: {
    buttonSubmit: {
      type: String,
      default: undefined
    }
  },
  emits: [ 'ignore', 'submit' ],
  setup(props, context) {
    const input = ref("");
    const error = ref(false);
    const submit = async () => {
      // 检查有效性
      if (!input.value) {
        error.value = true;
      } else {
        const result = input.value.split('?')[0].replace("https://", '').replace(/([#\/])/g, '&').split('&');
        if (result.length >= 3) {
          if (result[0] === 'www.figma.com' && result[1] === 'file') {
            const fileId = result[2];
            context.emit('submit', fileId);
          } else {
            error.value = true;
          }
        } else {
          error.value = true;
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