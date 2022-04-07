<template>
  <div class="page-node-init">
    <img :src="require('./resource/file-input.svg')" alt="file-input">
    <div class="page-node-init-input">
      <FigInput v-model:val="fileUrl" :status="error ? 'error' : ''" placeholder="从录入文件URL开始" />
      <p v-show="error" id="p-alert" style="margin-top: 8px"> 请确保输入的URL为该设计稿的分享链接 </p>
    </div>
    <FigButton type="primary" style="width: 80px" @click="check"> GO </FigButton>
  </div>
</template>

<script>

import { ref } from "vue";
import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
import { dispatch } from "../uiMessageHandler";

export default {
  name: "PageNodeInitFile",
  components: { FigButton, FigInput },
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
}

#p-alert {
  font-size: 12px;
  color: #f24822;
}

</style>