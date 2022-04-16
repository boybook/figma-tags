<template>
  <div class="page-select">
    <div v-if="tagTree?.length === 0" class="page-select-empty">
      <img :src="require('../resource/empty.svg')" alt="empty">
      <p style="margin: 4px 0 0 0"> {{ $t('lookup.empty_title') }} </p>
      <p style="margin: 4px 0 16px 0"> {{ $t('lookup.empty_intro') }} </p>
      <FigButton type="primary" @click="togglePage('PageNode')"> {{ $t('lookup.empty_button') }} </FigButton>
    </div>
    <div class="page-select-wrapper-tree" v-if="tagTree?.length > 0">
      <div v-if="backVisible" class="back-button" @click="togglePage('PageNode')">
        <img :src="require('../resource/back.svg')" alt="back">
        <span style="margin-left: 4px"> {{ $t('lookup.back') }} </span>
      </div>
      <TagTree :operable="false" :tag-tree="tagTree" @select-tag="selectTag" />
    </div>
    <div v-if="tagTree?.length > 0" v-for="type in tagTree">
      <PageSelectBar
          v-if="currentType === type.type"
          :provider="provider"
          :type-name="currentType"
          :view-sort="type.view_sort"
          :back-visible="backVisible"
          @change-sort="(sort) => changeSort(type, sort)"
          style="left: 177px"
      />
      <PageSelectType
          v-if="currentType === type.type"
          :provider="provider"
          :tag-type="type.type"
          :view-sort="type.view_sort"
          :tags="collectTags"
          :access-token="initData.accessToken"
      />
    </div>

  </div>
</template>

<script lang="ts">

import TagTree from "../component/tagtree/TagTree.vue";
import {computed, PropType, ref} from "vue";
import * as Utils from "../utils";
import DataProvider from "../provider/DataProvider";
import PageSelectType from "./PageSelectType.vue";
import PageSelectBar from "./PageSelectBar.vue";
import FigButton from "../component/FigButton.vue";

export default {
  name: "PageSelect",
  components: {FigButton, PageSelectBar, PageSelectType, TagTree },
  props: {
    initData: Object as PropType<Transfer.InitData>,
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
    provider: Object as PropType<DataProvider>,
    defaultTagType: String,
    backVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const tagTree = ref<Context.TagTree>();
    const currentType = ref<string>(props.defaultTagType);

    props.provider.getFullTags().then(result => {
      tagTree.value = Utils.storageTags2ContextTagTree({}, result);
      if (!currentType.value) currentType.value = tagTree.value[0]?.type;
    });

    const collectTags = computed(() : Context.Tag[] => {
      return tagTree.value
          ?.filter(tagType => tagType.type === currentType.value)
          .flatMap(type => [...type.tags.values()])
          .flat();
    });

    const selectTag = (tagType: string, tag: Context.Tag, _check: boolean) => {
      currentType.value = tagType;
      setTimeout(() => {
        const el = document.getElementById('anchor-' + tag.name);
        if (el) {
          document.body.scrollTo({
            top: document.body.scrollTop + el.getBoundingClientRect().y - 40,
            behavior: 'smooth'
          });
        }
      }, 1);
    }

    const changeSort = (tagType: Context.TagType, sort: Storage.ViewSort) => {
      console.log("PageSelect.changeSort", tagType, sort);
      tagType.view_sort = sort;
      props.provider.setViewSort(tagType.type, sort);
    }

    return { tagTree, currentType, collectTags, selectTag, changeSort }
  }
}

</script>

<style scoped>

.page-select-empty {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 32px;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
}

.page-select {
  min-height: 100vh;
}

.page-select-wrapper-tree {
  width: 176px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: white;
  margin: 0;
  padding: 4px 0;
  overflow: scroll;
  border-right: 1px #E0E0E0 solid;

  display: flex;
  flex-direction: column;
  user-select: none;
}

.back-button {
  padding: 4px 8px 4px 4px;
  margin-top: 3px;
  margin-left: 4px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 12px;
  line-height: 18px;
  border-radius: 2px;
  transition: all 200ms ease-out;
  cursor: pointer;
  align-self: flex-start;
  color: rgba(0, 0, 0, 0.45);

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.back-button:active {
  background-color: rgba(0, 0, 0, 0.1);
}

</style>