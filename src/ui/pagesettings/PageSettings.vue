<template>
  <div class="page-settings">
    <div class="page-settings-title">
      <h1> {{ $t('settings.title') }} </h1>
      <PageSettingsLanguage />
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
        <div class="node-token-access" v-if="accessModal">
          <AccessTokenModal @ignore="accessModal=false" @submit="accessModalSubmit" />
        </div>
      </div>
      <!-- Provider -->
      <div class="page-settings-content-entry">
        <h3> {{ $t('settings.provider.title') }} </h3>
        <ToggleRadio
            :fill="true"
            :entries="[$t('settings.provider.document.name'), $t('settings.provider.local.name'), $t('settings.provider.notion.name'), $t('settings.provider.cloud.name')]"
            v-model:current="providerCurrent"
        />
        <div class="provider-card" v-if="providerCurrent === 0">
          <h3> {{ $t('settings.provider.document.title') }} </h3>
          <p> {{ $t('settings.provider.document.content') }} </p>
          <div class="page-settings-buttons" style="margin-top: 8px;">
            <FigButton type="link" @click="localExport" style="padding: 4px 4px 4px 0"> {{ $t('settings.provider.local.export_json') }} </FigButton>
            <a style="display: none" target="_blank" download="tags-export.json" ref="alink"></a>
            <FigButton type="link" @click="localImport" style="padding: 4px 4px 4px 0"> {{ $t('settings.provider.local.import_json') }} </FigButton>
            <input type="file" accept="application/json" style="display: none" ref="afile" @change="onLocalImport" >
          </div>
        </div>
        <!-- Provider.Local -->
        <div class="provider-card" v-if="providerCurrent === 1">
          <h3> {{ $t('settings.provider.local.title') }} </h3>
          <p> {{ $t('settings.provider.local.content') }} </p>
          <div class="page-settings-buttons" style="margin-top: 8px;">
            <FigButton type="link" @click="localExport" style="padding: 4px 4px 4px 0"> {{ $t('settings.provider.local.export_json') }} </FigButton>
            <a style="display: none" target="_blank" download="tags-export.json" ref="alink"></a>
            <FigButton type="link" @click="localImport" style="padding: 4px 4px 4px 0"> {{ $t('settings.provider.local.import_json') }} </FigButton>
            <input type="file" accept="application/json" style="display: none" ref="afile" @change="onLocalImport" >
          </div>
        </div>
        <!-- Provider.Notion -->
        <div class="provider-card" v-if="providerCurrent === 2">
          <h3> {{ $t('settings.provider.notion.name') }} </h3>
          <p style="margin-bottom: 8px"> {{ $t('settings.provider.notion.content') }} </p>
          <p style="margin-bottom: 4px">
            {{ $t('settings.provider.notion.token') }}
            <a href="https://www.notion.so/my-integrations" target="_blank"> {{ $t('settings.provider.notion.link_token') }} </a>
          </p>
          <FigInput
              v-model:val="providerConfigs.notion.token"
              size="small"
              :placeholder="$t('settings.provider.notion.token_placeholder')"
              :status="providerNotionInputError ? 'error' : ''"
              @keydown="providerNotionInputError = false; notionDatabases.length = 0;"
              @submit="queryNotionDatabase"
          />
          <p style="margin-top: 8px; margin-bottom: 4px"> {{ $t('settings.provider.notion.database') }} </p>
<!--          <FigInput v-model:val="providerConfigs.notion.database" size="small" :status="providerNotionInputError ? 'error' : ''" @keydown="providerNotionInputError = false" />-->
          <FigButton v-if="notionDatabases.length === 0" type="dashed" :status="notionDatabasesQuerying ? 'loading' : 'normal'" @click="queryNotionDatabase">
            {{ $t('settings.provider.notion.query_database') }}
          </FigButton>
          <tk-select
              style="display: flex; align-self: stretch;"
              v-if="notionDatabases.length > 0"
              size="small"
              :selected="selectedNotionDatabase"
              v-model="selectedNotionDatabase"
              :value-display="valueDisplay"
              :max-height="100"
          >
            <template #selectDropDown>
              <tk-select-item size="small" v-for="db in notionDatabases" :value="db.databaseId"> {{ db.name }} </tk-select-item>
            </template>
          </tk-select>
        </div>
        <!-- Provider.Cloud -->
        <div class="provider-card" v-if="providerCurrent === 3">
          <h3> {{ $t('settings.provider.cloud.title') }} </h3>
          <p> {{ $t('settings.provider.cloud.content') }} </p>
        </div>
      </div>
      <div class="page-settings-about">
        <a href="https://www.buymeacoffee.com/boybook" target="_blank">
          <img class="bmc-button" width="120" :src="require('../resource/bmc-button.svg')" alt="bmc">
        </a>
        <a href="https://github.com/boybook/figma-tags/issues" target="_blank" style="margin: 8px 4px">
          <img :src="require('../resource/github.svg')" alt="github" width="20" style="opacity: 0.65; margin-right: 4px;">
          <span> {{ $t('settings.report') }} </span>
        </a>
      </div>

    </div>
    <div class="page-settings-buttons" style="padding: 0 0 12px 0;">
      <FigButton type="primary" @click="save" :status="saving ? 'loading' : 'normal'"> {{ $t('button.save') }} </FigButton>
      <FigButton @click="cancel"> {{ $t('button.cancel') }} </FigButton>
      <!-- <FigButton type="link" @click="test"> CLEAR DATA </FigButton>-->
    </div>
  </div>
</template>

<script lang="ts">

import FigButton from "../component/FigButton.vue";
import { dispatch } from "../uiMessageHandler";
import { useI18n } from "vue-i18n";
import { onMounted, PropType, ref, watch } from "vue";
import ToggleRadio from "../component/ToggleRadio.vue";
import FigInput from "../component/FigInput.vue";
import DataProvider from "../provider/DataProvider";
import { DataProviderBlobSave } from "../provider/DataProviderBlobSave";
import { downloadJson } from "../hooks/downloadJson";
import * as Utils from "../utils";
import {event, pageview} from 'vue-gtag';
import AccessTokenModal from "../access/AccessTokenModal.vue";
import initProvider from "../provider/initProvider";
import {NotionProvider} from "../provider/NotionProvider";
import TkSelect from "../component/select/TkSelect.vue";
import TkSelectItem from "../component/select/TkSelectItem.vue";
import PageSettingsLanguage from "./PageSettingsLanguage.vue";

export default {
  name: "PageSettings",
  components: {PageSettingsLanguage, FigInput, ToggleRadio, FigButton, AccessTokenModal, TkSelect, TkSelectItem },
  props: {
    initData: Object as PropType<Transfer.InitData>,
    provider: Object as PropType<DataProvider>,
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
  },
  emits: [ 'setProvider' ],
  setup(props, context) {
    const { t, locale } = useI18n();

    onMounted(() => {
      pageview({
        page_title: "PageSettings",
        page_path: "/pageselect"
      });
    });

    const saving = ref(false);
    const accessModal = ref(false);
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

    const resetFileId = () => {
      props.initData.fileId = undefined;
      props.togglePage('PageNode');
    }
    const setAccessToken = () => {
      accessModal.value = true;
    }
    const accessModalSubmit = (token: string, callback: Function) => {
      props.initData.accessToken = token;
      dispatch('client-storage-set', {
        key: 'access-token',
        data: token
      });
      dispatch('notify', t('access.suc'));
      accessModal.value = false;
    }

    const alink = ref<HTMLLinkElement>();
    const afile = ref<HTMLInputElement>();

    const localExport = async () => {
      if (props.provider.type === 'document' || props.provider.type === 'local') {
        const blobProvider = <DataProviderBlobSave> props.provider;
        const fullTags = await blobProvider.getFullTags(true);
        const fullNodes = await blobProvider.getFullNodes();
        const json = {
          version: "1",
          tags: [...fullTags],
          nodes: fullNodes
        }
        if (!downloadJson(alink.value, JSON.stringify(json, null, '\t'))) {
          dispatch('notify', t('settings.provider.local.export_json_fail'));
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
          if (props.provider.type === 'document' || props.provider.type === 'local') {
            const blobProvider = <DataProviderBlobSave>props.provider;
            const decode = JSON.parse(<string>reader.result);
            const tags: Storage.FullTags = new Map(decode.tags);
            const nodes: Storage.FullNodes = decode.nodes;
            if (Utils.checkDataFullTags(tags) && Utils.checkDataFullNodes(nodes)) {
              blobProvider.setFullTags(tags);
              blobProvider.setFullNodes(nodes);
              dispatch('notify', t('settings.provider.local.import_json_suc'));
            } else {
              dispatch('notify-err', t('settings.provider.local.import_json_error'));
            }
          }
        };
        reader.readAsText(file);
      }
    }

    let providerIndex : number;
    console.log("PageSettings", props.provider)
    switch (props.provider?.type) {
      default:
      case 'document':
        providerIndex = 0;
        break;
      case 'local':
        providerIndex = 1;
        break;
      case 'notion':
        providerIndex = 2;
        break;
    }
    // 默认值
    const providerCurrent = ref(providerIndex);
    const providerConfig : Transfer.ProviderConfig = JSON.parse(props.initData.provider);
    const providerConfigs = ref({
      document: {
        type: 'document'
      },
      local: {
        type: 'local'
      },
      notion: {
        type: 'notion',
        token: providerConfig.type === 'notion' ? providerConfig.token : '',
        database: providerConfig.type === 'notion' ? providerConfig.database : '',
      },
    });
    const providerNotionInputError = ref(false);

    const notionDatabases = ref<{name: any, databaseId: string}[]>([]);
    const notionDatabasesQuerying = ref(false);

    const queryNotionDatabase = async () => {
      const token = providerConfigs.value.notion.token;
      if (token.startsWith("secret_") && token.length === 50) {
        notionDatabasesQuerying.value = true;
        try {
          const notion = new NotionProvider(token, "");
          const databases = await notion.listAllDatabase();
          if (databases.length > 0) {
            notionDatabases.value = databases;
          } else {
            dispatch('notify-err', t('settings.provider.notion.query_empty'));
          }
        } finally {
          notionDatabasesQuerying.value = false;
        }
      } else {
        dispatch('notify-err', t('settings.provider.notion.query_error'));
      }
    }

    const selectedNotionDatabase = ref<string>('');

    if (providerConfig.type === 'notion') {
      selectedNotionDatabase.value = providerConfig.database;
      queryNotionDatabase().then();
    }

    watch(
        selectedNotionDatabase,
        (newVal) => {
          providerConfigs.value.notion.database = newVal;
        }
    );

    const valueDisplay = (value) => {
      if (!value) return t('settings.provider.notion.query_select');
      return notionDatabases.value.find(db => db.databaseId === value)?.name;
    }

    const save = async () => {
      saving.value = true;
      console.log("PageSettings.save", providerCurrent.value, providerConfigs.value);
      try {
        let config;
        switch (providerCurrent.value) {
          default:
          case 0:
            config = providerConfigs.value.document;
            break;
          case 1:
            config = providerConfigs.value.local;
            break;
          case 2:
            config = providerConfigs.value.notion;
        }
        if (config.type === 'notion' && (!config.database || config.database.length === 0)) {
          dispatch('notify-err', t('settings.provider.notion.database_empty'));
          return;
        }
        const prv : DataProvider = initProvider(config);
        console.log(prv);
        const prvError = await prv.testError();
        if (!prvError) {
          providerNotionInputError.value = false;
          dispatch('client-storage-set', {
            key: 'provider',
            data: JSON.stringify(config)
          });
          props.initData.provider = JSON.stringify(config);
          context.emit('setProvider', prv);
          props.togglePage('PageNode');
        } else {
          providerNotionInputError.value = true;
          console.log("[PageSettings] Provider init failed!", prvError);
          dispatch('notify-err', t('settings.provider.init_failed'));
        }
      } catch (e) {
        console.error(e);
      } finally {
        saving.value = false;
      }
    }

    return {
      saving, providerCurrent, providerConfigs, providerNotionInputError, alink, afile, accessModal, selectedNotionDatabase, notionDatabases, notionDatabasesQuerying,
      save, cancel, test, resetFileId, setAccessToken, accessModalSubmit, localExport, localImport, onLocalImport, queryNotionDatabase, valueDisplay
    }
  }
}

</script>

<style scoped>

.page-settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 12px 0;
  user-select: none;
  height: 98vh;
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

.node-token-access {
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
}

.node-token-access > * {
  flex: none;
  align-self: stretch;
}

.page-settings-about {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  align-self: stretch;
}

.page-settings-about > * {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  margin-right: 16px;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.65);
  filter: brightness(100%);
  transition: all 200ms ease-out;
}

.page-settings-about > *:hover {
  filter: brightness(95%);
}

</style>