<template>
  <div class="page-node-init">
    <PageSettingsLanguage class="language" />
    <img :src="require('./resource/file-input.svg')" alt="file-input">
    <div class="page-node-init-input">
      <FigInput v-model:val="fileUrl" :status="error ? 'error' : ''" :placeholder="$t('file_id.placeholder')" @submit="check" />
      <p style="color: rgba(0, 0, 0, 0.25)"> {{ $t('file_id.help') }} </p>
      <p v-show="error" style="color: #f24822"> {{ $t('file_id.error') }} </p>
    </div>
    <FigButton type="primary" style="width: 80px" @click="check"> GO </FigButton>
    <p class="page-node-init-intro"> {{ $t('file_id.intro') }} </p>
  </div>
</template>

<script lang="ts">

import { ref } from "vue";
import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
import { dispatch } from "../uiMessageHandler";
import PageSettingsLanguage from "../pagesettings/PageSettingsLanguage.vue";

export default {
  name: "PageNodeInitFile",
  components: {PageSettingsLanguage, FigButton, FigInput },
  emits: [ 'set-file-id' ],
  setup(_, context) {
    const fileUrl = ref('');
    const error = ref(false);

    function check() {
      const result = fileUrl.value.split('?')[0].replace("https://", '').replace(/([#\/])/g, '&').split('&');
      if (result.length >= 3) {
        if (result[0] === 'www.figma.com' && result[1] === 'file') {
          const fileId = result[2];
          dispatch('document-plugin-data-set', {
            key: 'file-id',
            value: fileId
          });
          context.emit('set-file-id', fileId);
          error.value = false;
          return;
        }
      }
      error.value = true;
    }

    return { fileUrl, error, check }
  }
}
</script>

<style scoped>

.language {
  position: absolute;
  top: 8px;
  left: 8px;
}

p {
  user-select: none;
}

.page-node-init {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 32px 32px;
  height: calc(100vh - 41px);
}

.page-node-init > * {
  flex: none;
  flex-grow: 0;
  margin: 16px 0;
}

.page-node-init-input {
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin: 8px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.page-node-init-input > input {
  align-self: stretch;
  text-align: center;
}

.page-node-init-input p {
  margin: 8px 0 0;
  font-size: 12px;
}

.page-node-init-intro {
  position: absolute;
  margin: 16px 12px;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: left;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.25);
}

</style>