<template>
  <PageNode :provider="provider"></PageNode>
</template>

<script lang="ts">

import { dispatch, handleEvent } from "./uiMessageHandler";
import { onMounted, reactive, ref } from 'vue';
import { DataProviderBlobSave } from "./provider/DataProviderBlobSave";
import DataProvider from "./provider/DataProvider";
import BlobLocalProvider from "./provider/blob/BlobLocalProvider";
import PageNode from "./pagenode/PageNode.vue";

export default {
  components: { PageNode },
  setup() {
    const provider = reactive(new DataProviderBlobSave(BlobLocalProvider));
    return { provider }
  }
};
</script>

<style scoped>

</style>