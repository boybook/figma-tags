<template>
  <PageNode v-if="page==='PageNode'" :provider="provider" :init-data="initData" :toggle-page="togglePage"></PageNode>
  <PageSelect v-if="page==='PageSelect'" :provider="provider" :default-tag-type="defaultSelectType" :back-visible="selectPageBack" :toggle-page="togglePage"></PageSelect>
  <PageSettings v-if="page==='PageSetting'" :provider="provider" :init-data="initData" :toggle-page="togglePage"></PageSettings>
</template>

<script lang="ts">

import { dispatch, handleEvent } from "./uiMessageHandler";
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { DataProviderBlobSave } from "./provider/DataProviderBlobSave";
import DataProvider from './provider/DataProvider';
import BlobLocalProvider from "./provider/blob/BlobLocalProvider";
import PageNode from "./pagenode/PageNode.vue";
import PageSelect from "./pageselect/PageSelect.vue";
import { useI18n } from 'vue-i18n';
import PageSettings from "./pagesettings/PageSettings.vue";

export default {
  components: {PageSettings, PageSelect, PageNode },
  setup() {
    const { locale, t } = useI18n();
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
        console.log("language set to: ", data.language);
        locale.value = data.language;
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