<template>
  <div class="page-settings-title-language" @click="switchLanguage">
    <img width="14" :src="require('../resource/earth.svg')" alt="language">
    <span> {{ displayLocale }} </span>
    <img :src="require('../resource/swap.svg')" alt="down" style="opacity: 0.5">
  </div>
</template>

<script lang="ts">
import {dispatch} from "../uiMessageHandler";
import {useI18n} from "vue-i18n";
import {computed} from "vue";

export default {
  name: "PageSettingsLanguage",
  setup() {
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

    const switchLanguage = () => {
      locale.value = locale.value ==='en' ? 'ch' : 'en';
      dispatch('client-storage-set', {
        key: 'language',
        data: locale.value
      });
    };

    return { displayLocale, switchLanguage }
  }
}
</script>

<style scoped>

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
  user-select: none;
  cursor: pointer;
  margin: 0 !important;
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

</style>