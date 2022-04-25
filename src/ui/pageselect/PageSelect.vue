<template>
  <div class="page-select">
    <div v-if="tagTree?.length === 0" class="page-select-empty">
      <img :src="require('../resource/empty.svg')" alt="empty">
      <p style="margin: 4px 0 0 0"> {{ $t('lookup.empty_title') }} </p>
      <p style="margin: 4px 0 16px 0"> {{ $t('lookup.empty_intro') }} </p>
      <FigButton type="primary" @click="togglePage('PageNode')"> {{ $t('lookup.empty_button') }} </FigButton>
    </div>
    <div class="page-select-wrapper-tree" v-if="tagTree?.length > 0">
      <div class="back-button" @click="togglePage('PageNode')">
        <img :src="require('../resource/back.svg')" alt="back">
        <span style="margin-left: 4px"> {{ backVisible ? $t('lookup.back') : $t('lookup.to_tags') }} </span>
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
          :document-file-id="initData.fileId"
          :access-token="initData.accessToken"
          :key="initData.accessToken + initData.fileId"
          @refresh-cover-without-token="alertAccess = true"
      />
    </div>
    <transition name="fade">
      <div class="alert-access" v-if="alertAccess">
        <div>
          <img :src="require('../resource/notice.svg')" alt="notice">
          <span style="margin-left: 8px;"> {{ needAccessBoth ? $t('lookup.alert.token_file') : $t('lookup.alert.token') }} </span>
        </div>
        <FigButton type="link" size="small" @click="accessModal = true">
          {{ $t('lookup.alert.button') }}
        </FigButton>
      </div>
    </transition>

    <transition name="modal">
      <div class="node-token-access" v-if="accessModal || fileIdModal">
        <AccessTokenModal v-if="accessModal" :show-ignore="false" :button-submit="needAccessBoth ? $t('button.next') : undefined" @ignore="accessModalIgnore" @submit="accessModalSubmit" />
        <AccessFileIdModal v-if="fileIdModal" @ignore="fileIdModal=false" @submit="fileIdModalSubmit" />
      </div>
    </transition>
    <!--  TODO 为了生成预览图，则必须获取本文件的URL  -->
  </div>
</template>

<script lang="ts">

import TagTree from "../component/tagtree/TagTree.vue";
import {computed, onMounted, PropType, ref, watchEffect} from "vue";
import * as Utils from "../utils";
import DataProvider from "../provider/DataProvider";
import PageSelectType from "./PageSelectType.vue";
import PageSelectBar from "./PageSelectBar.vue";
import FigButton from "../component/FigButton.vue";
import AccessTokenModal from "../access/AccessTokenModal.vue";
import AccessFileIdModal from "../access/AccessFileIdModal.vue";
import {dispatch} from "../uiMessageHandler";

export default {
  name: "PageSelect",
  components: { FigButton, PageSelectBar, PageSelectType, TagTree, AccessTokenModal, AccessFileIdModal },
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
    const alertAccess = ref(false);
    const accessModal = ref(false);
    const fileIdModal = ref(false);

    const needAccessBoth = computed(() => {
      return props.provider.type === 'document' && !props.initData.fileId;
    });

    const tagTree = ref<Context.TagTree>();
    const currentType = ref<string>(props.defaultTagType);

    watchEffect(() => {
      document.body.style.overflow = (accessModal.value) ? 'hidden' : 'auto';
    })

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

    const accessModalIgnore = (callback: Function) => {
      accessModal.value = false;
      callback?.();
    }

    const accessModalSubmit = (token: string, callback: Function) => {
      props.initData.accessToken = token;
      accessModal.value = false;
      dispatch('client-storage-set', {
        key: 'access-token',
        data: token
      });
      callback?.();
      alertAccess.value = false;
      // 文档数据源模式，还需要填写文件ID
      if (needAccessBoth.value) {
        fileIdModal.value = true;
      }
    }

    const fileIdModalSubmit = (fileId: string) => {
      props.initData.fileId = fileId;
      dispatch('document-plugin-data-set', {
        key: 'file-id',
        value: fileId
      });
      fileIdModal.value = false;
      alertAccess.value = false;
    }

    return { tagTree, currentType, collectTags, alertAccess, accessModal, fileIdModal, needAccessBoth, selectTag, changeSort, accessModalIgnore, accessModalSubmit, fileIdModalSubmit }
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
  overflow: auto;
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

.node-token-access {
  position: fixed;
  z-index: 9999;
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
  width: 264px;
}

.alert-access {
  background: rgba(218, 238, 252, 0.95);
  border: 1px solid rgba(24, 160, 251, 0.25);
  box-sizing: border-box;
  backdrop-filter: blur(32px);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px 12px;
  position: fixed;
  left: 192px;
  right: 16px;
  bottom: 16px;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.85);
}

.alert-access > * {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .2s cubic-bezier(0.5, 0, 0, 1.25);
}

</style>