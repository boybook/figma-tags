<template>
  <PageNode v-if="page==='PageNode'" :provider="provider" :init-data="initData"></PageNode>
</template>

<script lang="ts">

import { dispatch, handleEvent } from "./uiMessageHandler";
import { onMounted, reactive, ref } from 'vue';
import { DataProviderBlobSave } from "./provider/DataProviderBlobSave";
import BlobLocalProvider from "./provider/blob/BlobLocalProvider";
import PageNode from "./pagenode/PageNode.vue";

export default {
  components: { PageNode },
  setup() {
    const page = ref<'PageNode' | 'PageSetting' | 'PageSelect'>(undefined);
    const provider = reactive(new DataProviderBlobSave(BlobLocalProvider));
    const initData = ref<TransferDeclare.InitData>(undefined);

    onMounted(() => {
      handleEvent("init", (data: TransferDeclare.InitData) => {
        initData.value = data;
        page.value = 'PageNode';
      })
    });

    return { page, provider, initData }
  }
};
</script>

<style scoped>

</style>