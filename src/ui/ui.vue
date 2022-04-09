<template>
  <PageNode v-if="page==='PageNode'" :provider="provider" :init-data="initData" :toggle-page="togglePage"></PageNode>
  <PageSelect v-if="page==='PageSelect'" :provider="provider" :default-tag-type="defaultSelectType" :back-visible="selectPageBack" :toggle-page="togglePage"></PageSelect>
</template>

<script lang="ts">

import { dispatch, handleEvent } from "./uiMessageHandler";
import {onMounted, reactive, ref, watchEffect} from 'vue';
import { DataProviderBlobSave } from "./provider/DataProviderBlobSave";
import BlobLocalProvider from "./provider/blob/BlobLocalProvider";
import PageNode from "./pagenode/PageNode.vue";
import DataProvider from './provider/DataProvider';
import PageSelect from "./pageselect/PageSelect.vue";

export default {
  components: { PageSelect, PageNode },
  setup() {
    const page = ref<Transfer.Page>();
    const pageWindowSize = {
      PageNode: {
        width: 288,
        height: 600
      },
      PageSetting: {
        width: 288,
        height: 600
      },
      PageSelect: {
        width: 728,
        height: 600
      }
    };
    const provider = reactive<DataProvider>(new DataProviderBlobSave(BlobLocalProvider));
    const initData = ref<Transfer.InitData>();

    onMounted(() => {
      handleEvent("init", (data: Transfer.InitData) => {
        initData.value = data;
        page.value = data.page;
      })
    });

    watchEffect(() => {
      if (pageWindowSize[page.value]) {
        dispatch('resize', pageWindowSize[page.value]);
      }
    })

    const defaultSelectType = ref<string>(undefined);
    const selectPageBack = ref(false);

    const togglePage = (p: Transfer.Page, extra?: any) => {
      page.value = p;
      if (p === 'PageSelect') {
        selectPageBack.value = true;
        if (extra) {
          defaultSelectType.value = extra;
        }
      }
    }

    return { page, provider, initData, defaultSelectType, selectPageBack, togglePage }
  }
}
</script>

<style scoped>

</style>