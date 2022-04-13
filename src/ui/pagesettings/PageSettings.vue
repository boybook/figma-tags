<template>
  <div class="page-settings">
    <div class="page-settings-title">
      <h1> {{ $t('settings.title') }} </h1>
      <div class="page-settings-title-language" @click="switchLanguage">
        <img width="14" :src="require('../resource/earth.svg')" alt="language">
        <span> {{ displayLocale }} </span>
        <img :src="require('../resource/swap.svg')" alt="down" style="opacity: 0.5">
      </div>
    </div>
    <div class="page-settings-content">
      <div class="page-settings-content-entry">
        <h3> {{ $t('settings.current_file.title') }} </h3>
        <p style="margin: 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); display: flex; flex-direction: row; align-items: center">
          {{ initData.fileId ? initData.fileId : $t('settings.unset') }}
          <FigButton type="link" size="small" @click="resetFileId" style="padding: 0 8px;"> {{ $t('settings.current_file.reset') }} </FigButton>
        </p>
      </div>
      <div class="page-settings-content-entry">
        <h3> {{ $t('settings.access_token.title') }} </h3>
        <p style="margin: 0; font-size: 12px; color: rgba(0, 0, 0, 0.45);">
          {{ initData.accessToken ? initData.accessToken : $t('settings.unset') }}
          <FigButton type="link" size="small" @click="setAccessToken" style="padding: 0; margin-top: 8px;"> {{ $t('settings.access_token.set') }} </FigButton>
        </p>
      </div>
      <div class="page-settings-content-entry">
        <h3> {{ $t('settings.provider.title') }} </h3>
        <ToggleRadio
            :entries="[$t('settings.provider.local'), $t('settings.provider.cloud')]"
            v-model:current="providerCurrent"
        />
        <div class="provider-card" v-if="providerCurrent === 0">
          <h3> {{ $t('settings.provider.local_title') }} </h3>
          <p> {{ $t('settings.provider.local_content') }} </p>
          <div class="page-settings-buttons" style="margin-top: 8px;">
            <FigButton type="link" @click="localExport" style="padding: 4px 4px 4px 0"> {{ $t('settings.provider.export_json') }} </FigButton>
            <a style="display: none" target="_blank" download="tags-export.json" ref="alink"></a>
            <FigButton type="link" @click="localImport" style="padding: 4px 4px 4px 0"> {{ $t('settings.provider.import_json') }} </FigButton>
            <input type="file" accept="application/json" style="display: none" ref="afile" @change="onLocalImport" >
          </div>
        </div>
        <div class="provider-card" v-if="providerCurrent === 1">
          <h3> {{ $t('settings.provider.cloud_title') }} </h3>
          <p> {{ $t('settings.provider.cloud_content') }} </p>
        </div>
      </div>
    </div>
    <div class="page-settings-buttons">
      <FigButton type="primary" @click="save"> {{ $t('button.save') }} </FigButton>
      <FigButton @click="cancel"> {{ $t('button.cancel') }} </FigButton>
      <FigButton type="link" @click="test"> CLEAR DATA </FigButton>
    </div>
  </div>
</template>

<script lang="ts">

import FigButton from "../component/FigButton.vue";
import { dispatch } from "../uiMessageHandler";
import { useI18n } from "vue-i18n";
import { computed, PropType, ref } from "vue";
import ToggleRadio from "../component/ToggleRadio.vue";
import FigInput from "../component/FigInput.vue";
import DataProvider from "../provider/DataProvider";
import { DataProviderBlobSave } from "../provider/DataProviderBlobSave";
import { downloadJson } from "../hooks/downloadJson";
import * as Utils from "../utils";

export default {
  name: "PageSettings",
  components: { FigInput, ToggleRadio, FigButton },
  props: {
    initData: Object as PropType<Transfer.InitData>,
    provider: Object as PropType<DataProvider>,
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
  },
  setup(props, context) {
    const { t, locale } = useI18n();
    const displayLocale = computed(() => {
      switch (locale.value) {
        case "en":
          return "English";
        case "ch":
          return "中文";
        default:
          return locale.value.toUpperCase();
      }
    });
    const save = () => {
      //TODO
      props.togglePage('PageNode');
    }
    const cancel = () => {
      props.togglePage('PageNode');
    }
    const test = () => {
      dispatch('client-storage-set', {
        key: 'tags',
        data: undefined
      });
      dispatch('client-storage-set', {
        key: 'nodes',
        data: undefined
      });
      dispatch('client-storage-set', {
        key: 'access-token',
        data: undefined
      });
    }
    const switchLanguage = () => {
      locale.value = locale.value ==='en' ? 'ch' : 'en';
      dispatch('client-storage-set', {
        key: 'language',
        data: locale.value
      });
    }
    // TODO 默认值
    const providerCurrent = ref(0);
    const resetFileId = () => {
      props.initData.fileId = undefined;
      props.togglePage('PageNode');
    }
    const setAccessToken = () => {

    }

    const alink = ref<HTMLLinkElement>();
    const afile = ref<HTMLInputElement>();

    const localExport = async () => {
      if (props.provider.type === 'local') {
        const blobProvider = <DataProviderBlobSave> props.provider;
        const fullTags = await blobProvider.getFullTags();
        const fullNodes = await blobProvider.getFullNodes();
        const json = {
          tags: [...fullTags],
          nodes: fullNodes
        }
        if (!downloadJson(alink.value, JSON.stringify(json, null, '\t'))) {
          //TODO
        }
      }
    }

    const localImport = () => {
      afile.value.click();
    }

    const onLocalImport = async () => {
      if (afile.value.files.length) {
        const file = afile.value.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          if (props.provider.type === 'local') {
            const blobProvider = <DataProviderBlobSave>props.provider;
            const decode = JSON.parse(<string>reader.result);
            const tags: Storage.FullTags = new Map(decode.tags);
            const nodes: Storage.FullNodes = decode.nodes;
            console.log(tags);
            console.log(nodes);
            if (Utils.checkDataFullTags(tags) && Utils.checkDataFullNodes(nodes)) {
              blobProvider.setFullTags(tags);
              blobProvider.setFullNodes(nodes);
              dispatch('notify', t('settings.provider.import_json_suc'));
            }
          }
        };
        reader.readAsText(file);
      }
    }

    return { displayLocale, providerCurrent, alink, afile, save, cancel, test, switchLanguage, resetFileId, setAccessToken, localExport, localImport, onLocalImport }
  }
}

</script>

<style scoped>

.page-settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  user-select: none;
  height: 96vh;
}

.page-settings-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0 20px 0;
}

.page-settings-title h1 {
  font-weight: 600;
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
}

.page-settings-title-language {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.85);
  background-color: white;
  border-radius: 2px;
  transition: all 200ms ease-out;
  flex-grow: 0;
}

.page-settings-title-language:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.page-settings-title-language span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  margin: 0 4px;
}

.page-settings-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
  margin: 0 0 8px 0;
}

.page-settings-content-entry {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0 20px;
}

.page-settings-content-entry input {
  align-self: stretch;
}

.page-settings-content-entry h3 {
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
}

.page-settings-buttons {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin: 0;
}

.page-settings-buttons > * {
  margin-right: 8px;
}

.provider-card {
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border-radius: 4px;
  align-self: stretch;
  flex-grow: 0;
  margin: 8px 0 0 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.65);
}

.provider-card > * {
  align-self: stretch;
}

.provider-card h3 {
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  margin: 0 0 8px;
  color: rgba(0, 0, 0, 0.85);
}

.provider-card p {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  margin: 0;
  color: rgba(0, 0, 0, 0.65);
}

</style>