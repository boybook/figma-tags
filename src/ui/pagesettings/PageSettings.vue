<template>
  <div class="page-settings">
    <div class="page-settings-title">
      <h1> {{ $t('settings.title') }} </h1>
      <div class="page-settings-title-language" @click="switchLanguage">
        <img :src="require('../resource/earth.svg')" alt="language">
        <span> {{ displayLocale }} </span>
        <img :src="require('../resource/swap.svg')" alt="down" style="opacity: 0.5">
      </div>
    </div>
    <div class="page-settings-content">
      <div class="page-settings-content-entry">
        <h3> {{ $t('settings.provider.title') }} </h3>
        <!-- <ToggleSelect> -->
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
import { computed } from "vue";

export default {
  name: "PageSettings",
  components: { FigButton },
  props: {
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
  },
  setup(props, context) {
    const { locale } = useI18n();
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
    }
    const switchLanguage = () => {
      locale.value = locale.value ==='en' ? 'ch' : 'en';
      dispatch('client-storage-set', {
        key: 'language',
        data: locale.value
      });
    }
    return { displayLocale, save, cancel, test, switchLanguage }
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
  margin: 0 0 16px 0;
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
  font-size: 14px;
  line-height: 22px;
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
  margin: 0 0 16px 0;
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
  margin: 0 0 8px;
}

.page-settings-content-entry h3 {
  margin: 0;
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

</style>