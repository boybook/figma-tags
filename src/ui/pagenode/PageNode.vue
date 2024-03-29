<template>
  <!-- TODO 在设置、预览时，都可能需要填写文件ID的 -->
<!--  <PageNodeInitFile-->
<!--      v-if="showFileInit"-->
<!--      :toggle-page="togglePage"-->
<!--      @set-file-id="onSetFileId"-->
<!--  />-->
  <PageNodeTopBar
      :toggle-page="togglePage"
      :current="currentSelection"
      :show-refresh="!provider.autoSave"
      @refresh="reloadNode(false, true)"
      @page-settings="openSettings"
  />
  <PageNodeFooter
      v-if="!loading && !needAutoSave" :show-del="node?.saved"
      @save="toSave"
      @delete="toDelete"
  />
  <LoadingWithContent :loading="!!loading" :msg="loading">
    <div id="ui">
      <div class="title">
        <ToggleRadio
            v-if="provider.type !== 'document'"
            :key="initData.nodeType"
            :current="initData.nodeType === 'document' ? 0 : 1"
            @update:current="(val) => initData.nodeType = val === 0 ? 'document' : 'frame'"
            fill="min"
            :entries="[{icon: require('./resource/page.svg'), tooltip: $t('type.document')}, {icon: require('./resource/frame.svg'), tooltip: $t('type.frame')}]"
            style="margin-right: 8px"
        />
        <FigInput style="flex-grow: 1" v-if="node" v-model:val="node.title" @submit="toSave(false)" />
      </div>
      <div class="selected" :class="{ 'selected-empty': !collectTags || collectTags.length === 0 }">
        <FigTag
            v-for="tag in collectTags"
            :tag="tag"
            :removable="true"
            @remove="removeTag(tag)"
        >
        </FigTag>
      </div>
      <div class="tree">
        <TagTree
            :tag-tree="tagTree"
            @add-tag="addTag"
            @add-tag-type="addTagType"
            @edit-type-name="editTypeName"
            @delete-tag-type="deleteTagType"
            @edit-tag="editTag"
            @delete-tag="deleteTag"
            @select-tag="selectTag"
            :toggle-page="togglePage"
            @drag-tag="onDragTag"
        />
      </div>
    </div>
  </LoadingWithContent>
  <transition name="modal">
    <div class="node-token-access" v-if="accessModal || fileIdModal">
      <AccessFileIdModal v-if="fileIdModal" @ignore="fileIdModal=false" :button-submit="requestAccessToken ? $t('button.next') : undefined" @submit="fileIdModalSubmit" />
      <AccessTokenModal v-if="accessModal" :show-ignore="true" :callback="() => toSave(true)" @ignore="accessModalIgnore" @submit="accessModalSubmit" />
    </div>
  </transition>
</template>

<script lang="ts">

import DataProvider from "../provider/DataProvider";
import { exportCover } from "../provider/CoverProvider";
import {computed, onMounted, PropType, ref, watch, watchEffect, watchPostEffect} from "vue";
import { dispatch, handleEvent} from "../uiMessageHandler";
import * as Utils from "../utils";

import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
import FigTag from "../component/FigTag.vue";
import PageNodeTopBar from "./PageNodeTopBar.vue";
import PageNodeInitFile from "./PageNodeInitFile.vue";
import TagTree from "../component/tagtree/TagTree.vue";
import PageNodeFooter from "./PageNodeFooter.vue";
import LoadingWithContent from "../component/LoadingWithContent.vue";
import AccessTokenModal from "../access/AccessTokenModal.vue";
import {useI18n} from "vue-i18n";
import {removeCoverCache} from "../hooks/reloadCover";
import ToggleRadio from "../component/ToggleRadio.vue";
import AccessFileIdModal from "../access/AccessFileIdModal.vue";

export default {
  name: "PageNode",
  components: {
    AccessFileIdModal,
    ToggleRadio,
    AccessTokenModal,
    LoadingWithContent,
    PageNodeFooter,
    TagTree,
    PageNodeInitFile,
    FigButton,
    FigInput,
    FigTag,
    PageNodeTopBar
  },
  props: {
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
    provider: Object as PropType<DataProvider>,
    initData: Object as PropType<Transfer.InitData>
  },

  setup(props) {
    const { t } = useI18n();
    const loading = ref<string|undefined>(undefined);

    const fileId = ref(props.initData.fileId);
    const currentSelection = ref<Transfer.CurrentSelection>(props.initData.selection);

    const showFileInit = computed(() => {
      return props.provider.type !== 'document' && !fileId.value;
    });

    const needAutoSave = computed(() => {
      return props.provider.autoSave;
    });

    const fullTags = ref<Storage.FullTags>();
    const node = ref<Context.Node>();
    const tagTree = ref<Context.TagTree>();

    const accessModal = ref(false);
    const fileIdModal = ref(false);

    // 监听从插件传来的 selectionchange
    onMounted(() => {
      handleEvent("selectionchange", (data: Transfer.CurrentSelection) => {
        if (!loading.value) {
          if (data.id != currentSelection.value.id) {  // 只有选中不同时才刷新
            currentSelection.value = data;
          }
        } else {
          console.log("PageNode.selectionchange", "拦截")
        }
      });
      reloadNode(false, true);
    });

    watch(loading, (newVal) => {
      if (newVal === undefined) { // 加载完毕后，重新请求加载
        dispatch('request-selection');
      }
    });

    watch(() => node.value?.title, (newVal) => {
      if (newVal) {
        dispatch('node-rename', {
          nodeId: node.value.node_id,
          name: newVal
        });
      }
    });

    watch(() => props.initData.nodeType, (newVal, oldVal) => {
      if (newVal != oldVal) {
        dispatch('toggle-node-type', newVal);
        dispatch('notify', t("type." + newVal + "_notify"));
        //reloadNode(true, true);
      }
    });

    handleEvent('force-change-node-type', (type) => {
      props.initData.nodeType = type;
    });

    /*const tryLazySave = (title: string) => {
      return setTimeout(() => toSave(false), 1000);
    };

    watchPostEffect(onInvalidate => {
      const timer = tryLazySave(node.value?.title);
      onInvalidate(() => {
        if (timer) {
          clearTimeout(timer)
        }
      })
    });*/

    const reloadNode = async (keepCheck: boolean, reloadTags: boolean) => {
      if (!currentSelection.value) return;
      try {
        console.log("PageNode.reloadNode", currentSelection.value);
        accessModal.value = false;
        loading.value = t('loading.node');
        fullTags.value = new Map(JSON.parse(JSON.stringify([...await props.provider.getFullTags(reloadTags)])));
        console.log("PageNode.reloadNode.fullTags", fullTags.value);
        // 如果没有取到，那么会返回默认的tags
        if (fullTags.value.size === 0) {
          const defaultName = t('default_tag.type');
          fullTags.value.set(defaultName,
              {
                name: defaultName,
                tags: [
                  Utils.genTag(t('default_tag.draft'), Utils.tagColors.default),
                  Utils.genTag(t('default_tag.approved'), Utils.tagColors.brown),
                  Utils.genTag(t('default_tag.work_in_progress'), Utils.tagColors.blue),
                  Utils.genTag(t('default_tag.revised'), Utils.tagColors.yellow),
                  Utils.genTag(t('default_tag.complete'), Utils.tagColors.green),
                  Utils.genTag(t('default_tag.on_hold'), Utils.tagColors.gray),
                  Utils.genTag(t('default_tag.ready_for_review'), Utils.tagColors.purple),
                  Utils.genTag(t('default_tag.ready_for_dev'), Utils.tagColors.pink),
                ]
              }
          )
        }
        const originNodeData = await props.provider.getNode(fileId.value, currentSelection.value.id);
        const nodeData = <Storage.Node> originNodeData ? JSON.parse(JSON.stringify(originNodeData)) : undefined;
        if (keepCheck && nodeData) {
          nodeData.tags = Utils.contextTagTree2ContextNode(tagTree.value);
        }

        node.value = Utils.storageNode2ContextNode(nodeData);
        // Node为空时，初始化一个缺省的Node
        if (!node.value) {
          node.value = {
            saved: false,
            title: currentSelection.value.name,
            file_id: fileId.value,
            node_id: currentSelection.value.id,
            tags: {}
          }
        }
        tagTree.value = Utils.storageTags2ContextTagTree(node.value.tags, fullTags.value);
        loading.value = undefined;
      } catch (e) {
        loading.value = t('loading.error');
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    watch(currentSelection, () => {
      // selection改变时，自动刷新当前已选中的frame
      reloadNode(false, false);
    });

    // watch(fileId, () => {
    //   if (fileId.value) {
    //     reloadNode(false, true);
    //   }
    // });

    watchEffect(() => {
      document.body.style.overflow = (accessModal.value || fileIdModal.value || loading.value) ? 'hidden' : 'auto';
    });

    // flat出所有已选Tag
    const collectTags = computed(() => {
      return tagTree.value
          ?.flatMap(type => [...type.tags.values()])
          .flat()
          .filter(t => t.check)
    });

    // 成功设置fileId的监听
    const onSetFileId = (file: string) => {
      props.initData.fileId = file;
      fileId.value = file;
      reloadNode(false, false);
    }

    // 手动添加Tag（伪保存）
    const addTag = (tagType: string, tag: Storage.Tag) => {
      if (tagTree.value) {
        if (tagTree.value.filter(type => type.type === tagType).flatMap(type => [...type.tags.values()]).flat().find(t => t.name === tag.name)) {
          return; // 重复了
        }
        Utils.newTagToTagTree(tagTree.value, tagType, tag);
        if (needAutoSave.value) {
          toSave();
        }
      } else {
        throw "tagTree is undefined";
      }
    }

    // 手动修改Tag（直接生效）
    const editTag = async (tagType: string, tagId: string, tag: Storage.Tag) => {
      console.log("editTag", tagType, tagId, tag);
      try {
        loading.value = t('saving.tag');
        fullTags.value = Utils.contextTagTree2StorageTags(tagTree.value);
        const oldFullTags = await props.provider.getFullTags(false);
        for (let type of oldFullTags.keys()) {
          if (fullTags.value.has(type)) {
            fullTags.value.get(type).view_sort = oldFullTags.get(type).view_sort;
          }
        }
        const target = fullTags.value.get(tagType)?.tags.find(t => t.id === tagId);
        target.name = tag.name;
        target.color = tag.color;
        target.background = tag.background;
        const tagRenames: Transfer.TagRenameGroup = {
          [tagType]: {
            [tagId]: tag.name
          }
        };
        await props.provider.updateFullTags(fullTags.value, tagRenames);
        await reloadNode(true, true);
        dispatch("canvas-refresh-all-marks", JSON.stringify([...fullTags.value.entries()]));
        loading.value = undefined;
        if (needAutoSave.value) {
          await toSave();
        }
      } catch (e) {
        loading.value = t('loading.error');
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    // 手动删除Tag（直接生效）
    const deleteTag = async (tagType: string, tagId: string) => {
      console.log("deleteTag", tagType, tagId);
      try {
        loading.value = t('saving.tag');
        fullTags.value = Utils.contextTagTree2StorageTags(tagTree.value);
        const tags = fullTags.value.get(tagType)?.tags;
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].id === tagId) {
            tags.splice(i, 1);
          }
        }
        await props.provider.updateFullTags(fullTags.value, {});
        await reloadNode(true, true);
        dispatch("canvas-refresh-all-marks", JSON.stringify([...fullTags.value.entries()]));
        loading.value = undefined;
        if (needAutoSave.value) {
          await toSave();
        }
      } catch (e) {
        loading.value = t('loading.error');
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    // 手动添加 Tag Type（Tag大分类）（直接生效）
    const addTagType = async (tagType: string) => {
      console.log("addTagType", tagType);
      try {
        loading.value = t('saving.tag');
        fullTags.value.set(tagType, {
          name: tagType,
          tags: []
        });
        await props.provider.updateFullTags(fullTags.value, {});
        await reloadNode(true, true);
        //tagTree.value = Utils.storageTags2ContextTagTree(node.value.tags, fullTags.value);
      } catch (e) {
        loading.value = t('loading.error') + e;
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    // 删除某一TagType大分类（危险，直接生效）
    const deleteTagType = async (tagType: string) => {
      console.log("deleteTagType", tagType);
      try {
        fullTags.value.delete(tagType);
        await props.provider.updateFullTags(fullTags.value, {});
        await reloadNode(true, true);
        dispatch("canvas-refresh-all-marks", JSON.stringify([...fullTags.value.entries()]));
        if (needAutoSave.value) {
          await toSave();
        }
      } catch (e) {
        loading.value = t('loading.error');
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    // 手动修改TagType的名称（直接生效）
    const editTypeName = async (oldName: string, newName: string) => {
      console.log("editTypeName", oldName, newName);
      try {
        if (oldName === newName) return;
        if (fullTags.value.has(newName)) {
          alert("Name already exists");
          return;
        }
        loading.value = t("saving.tag");
        await props.provider.renameTagType(oldName, newName);
        await reloadNode(false, true);
      } catch (e) {
        loading.value = t('loading.error');
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    const removeTag = (tag: Context.Tag) => {
      tag.check = false;
      selectTag('', tag, false);
    }

    const selectTag = (type: string, tag: Context.Tag, check: boolean) => {
      if (needAutoSave.value) {
        if (collectTags.value.length == 0) {
          toDelete();
        } else {
          toSave();
        }
      }
    }

    const requestAccessToken = computed(() => {
      if (props.provider.type === 'notion') {
        return props.initData.accessToken === undefined;
      } else {
        return false;
      }
    });

    const onDragTag = (tagType: Context.TagType, childTagType: string) => {
      console.log("PageNode.onDragTag", tagType, childTagType);
      if (props.provider.autoSave) {
        toSave(false);
      }
    }

    // 保存Node
    const toSave = async (force: boolean = false) => {
      console.log("toSave.tree", tagTree.value);
      console.log("toSave.node", node.value);
      if (props.provider.type !== 'document') {
        if (!fileId.value) {
          fileIdModal.value = true;
          loading.value = undefined;
          return;
        }
      }
      try {
        accessModal.value = false;
        const nodeWidth = currentSelection.value.width;
        loading.value = t('saving.node', [' (collect)']);
        node.value.width = nodeWidth;
        node.value.tags = Utils.contextTagTree2ContextNode(tagTree.value);
        node.value.file_id = fileId.value;
        console.log("toSave.node.after", node.value);
        if (props.provider.type === 'notion') {  // Notion模式，需要现场获取封面
          // 还没获取过accessKey
          if (!force && !props.initData.accessToken) {
            accessModal.value = true;
            loading.value = undefined;
            return;
          }
          loading.value = t('saving.node', [' (cover)']);
          node.value.cover = await exportCover(node.value.file_id, node.value.node_id, nodeWidth, props.initData.accessToken);
        } else {
          node.value.cover = "";  // 设置为空，在Search页面查看时进行封面刷新
        }
        loading.value = t('saving.node', [' (tags)']);
        fullTags.value = Utils.contextTagTree2StorageTags(tagTree.value);
        if (!Utils.equalsFullTags(await props.provider.getFullTags(), fullTags.value)) {
          await props.provider.updateFullTags(fullTags.value, {});
          dispatch("canvas-refresh-all-marks", JSON.stringify([...fullTags.value.entries()]));
        }
        loading.value = t('saving.node', [' (storage)']);
        if (Object.keys(node.value.tags).length > 0) {
          await props.provider.saveNode(fileId.value, node.value.node_id, node.value);
          node.value.saved = true;
        } else if (node.value.saved) {
          await props.provider.deleteNode(fileId.value, node.value.node_id);
          node.value.saved = false;
        }
        if (node.value.cover === "") {
          removeCoverCache(fileId.value, node.value.node_id);
        }
        loading.value = undefined;
        dispatch('canvas-mark-node', <Transfer.CanvasSignNode> {
          fullTags: JSON.stringify([...fullTags.value]),
          node: JSON.stringify(node.value)
        });
        if (!needAutoSave.value) {
          dispatch('notify', t('saving.notify', [node.value.title]));
        }
      } catch (e) {
        loading.value = t('loading.error');
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    // 删除Node
    const toDelete = async () => {
      try {
        const nodeId = currentSelection.value.id;
        loading.value = t('delete.node');
        await props.provider.deleteNode(fileId.value, nodeId);
        dispatch('canvas-unmark-node', nodeId);
        loading.value = t('loading.node');
        await reloadNode(false, false);
        loading.value = undefined;
        dispatch('notify', t('delete.notify', [node.value.title]));
      } catch (e) {
        loading.value = t('loading.error') + e;
        console.error(e);
        dispatch('notify-err', e);
      }
    }

    const openSettings = () => {
      props.togglePage('PageSetting');
    }

    const accessModalIgnore = (callback: Function) => {
      accessModal.value = false;
      callback();
    }

    const accessModalSubmit = (token: string, callback: Function) => {
      props.initData.accessToken = token;
      dispatch('client-storage-set', {
        key: 'access-token',
        data: token
      });
      callback();
    }

    const fileIdModalSubmit = (file: string) => {
      props.initData.fileId = file;
      fileId.value = file;
      fileIdModal.value = false;
      dispatch('document-plugin-data-set', {
        key: 'file-id',
        value: fileId.value
      });
      if (requestAccessToken.value) {
        accessModal.value = true;
      } else {
        toSave(false);
      }
    }

    return {
      loading, fileId, currentSelection, showFileInit, needAutoSave, fullTags, node, tagTree, collectTags, accessModal, fileIdModal, requestAccessToken,
      reloadNode, onSetFileId, addTag, editTag, deleteTag, addTagType, deleteTagType, editTypeName, removeTag, selectTag, onDragTag, toSave, toDelete, openSettings, accessModalIgnore, accessModalSubmit, fileIdModalSubmit
    }

  }
}
</script>

<style scoped>

#ui{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 46px 12px 64px;
}

#ui > * {
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin-bottom: 12px;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
}

.tree {
  padding-top: 12px;
  border-top: solid #eee 1px;
}

.selected {
  padding: 0 0 8px;
  margin-bottom: 4px !important;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-flow: wrap;
  transition: all 500ms ease;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 110px;
}

.selected-empty {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  max-height: 0 !important;
}

.selected .tag {
  margin: 0 4px 4px 0;
  flex: none;
  flex-grow: 0;
}

.selected .tag svg {
  padding: 0 4px 0 2px;
  cursor: pointer;
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

.current-select-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  font-size: 12px;
  line-height: 17px;
  flex-grow: 0;
  margin-right: 4px;
  background-color: #fafafa;
  border-radius: 2px;
}

.current-select-name img {
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .2s cubic-bezier(0.5, 0, 0, 1.25);
}

</style>