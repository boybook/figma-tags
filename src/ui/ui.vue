<template>
  <LoadingWithContent
      v-if="!provider || !page"
      :loading="true"
      :msg="$t('loading.init')"
  />
  <PageNode
      v-if="provider && page==='PageNode'"
      :provider="provider"
      :init-data="initData"
      :toggle-page="togglePage"
  />
  <PageSelect
      v-if="provider && page==='PageSelect'"
      :provider="provider"
      :init-data="initData"
      :default-tag-type="defaultSelectType"
      :back-visible="selectPageBack"
      :toggle-page="togglePage"
  />
  <PageSettings
      v-if="provider && page==='PageSetting'"
      :provider="provider"
      :init-data="initData"
      :toggle-page="togglePage"
      @setProvider="setProvider"
  />
</template>

<script lang="ts">

import { dispatch, handleEvent } from "./uiMessageHandler";
import { onMounted, ref, watchEffect } from 'vue';
import DataProvider from './provider/DataProvider';
import PageNode from "./pagenode/PageNode.vue";
import PageSelect from "./pageselect/PageSelect.vue";
import { useI18n } from 'vue-i18n';
import PageSettings from "./pagesettings/PageSettings.vue";
import initProvider from "./provider/initProvider";
import LoadingWithContent from "./component/LoadingWithContent.vue";

export default {
  components: {LoadingWithContent, PageSettings, PageSelect, PageNode },
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
    const provider = ref<DataProvider>();
    const initData = ref<Transfer.InitData>();

    const setProvider = (prv: DataProvider) => {
      provider.value = prv;
      if (provider.value.type === 'document') {
        initData.value.nodeType = 'frame';
      }
    }

    onMounted(() => {
      handleEvent("init", async (data: Transfer.InitData) => {
        if (!data.language) {  // 初始化缺省language
          data.language = navigator.language?.startsWith("zh") ? "ch" : "en";
          dispatch('client-storage-set', {
            key: 'language',
            data: data.language
          });
        }
        console.log("language set to: ", data.language);
        locale.value = data.language;
        initData.value = data;
        page.value = data.page;
        if (!initData.value.provider) initData.value.provider = JSON.stringify({ type: 'local' });
        const prv: DataProvider = initProvider(JSON.parse(initData.value.provider));
        const prvError = await prv.testError();
        if (!prvError) {
          setProvider(prv);
        } else {
          console.log("Provider init failed!", prvError);
          dispatch('notify-err', t('settings.provider.init_failed'));
          initData.value.provider = JSON.stringify({ type: 'local' });
          setProvider(initProvider({ type: 'local' }));
        }
      });
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

    return { page, provider, initData, defaultSelectType, selectPageBack, togglePage, setProvider }
  }
}
</script>

<style>

body {
  background: var(--color-bg);
}

a {
  text-decoration: none;
  color: #18a0fb;
}

a:hover {
  color: #0677bd;
}

</style>