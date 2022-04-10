<template>
  <PageNodeInitFile v-if="!fileId" @set-file-id="onSetFileId" />
  <PageNodeTopBar
      v-if="fileId"
      :current="currentSelection"
      @refresh="reloadNode"
      @page-settings="openSettings"
  />
  <PageNodeFooter
      v-if="fileId && !loading" :show-del="node?.saved"
      @save="toSave"
      @delete="toDelete"
  />
  <LoadingWithContent :loading="!!loading" :msg="loading">
    <div id="ui" v-if="fileId">
      <div class="title">
        <!--
        <a v-tooltip="{ content: node.notion_id ? 'Linked' : 'Unlinked', placement: 'bottom', offset: 4}" :href="node.notion_url" target="_blank">
          Link
        </a>
        -->
        <FigInput v-if="node" v-model:val="node.title" />
      </div>
      <div class="selected" v-show="collectTags?.length > 0">
        <FigTag
            v-for="tag in collectTags"
            :tag="tag"
            :removable="true"
            @remove="tag.check = !tag.check"
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
            :toggle-page="togglePage"
        />
      </div>
    </div>
  </LoadingWithContent>
</template>

<script lang="ts">

import DataProvider from "../provider/DataProvider";
import { exportCover } from "../provider/CoverProvider";
import {computed, onMounted, PropType, ref, watch, watchEffect} from "vue";
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
import {contextTagTree2StorageTags, newTagToTagTree} from "../utils";

export default {
  name: "PageNode",
  components: {
    LoadingWithContent,
    PageNodeFooter, TagTree, PageNodeInitFile, FigButton, FigInput, FigTag, PageNodeTopBar },
  props: {
    togglePage: Function as (p: Transfer.Page, extra?: any) => void,
    provider: Object as PropType<DataProvider>,
    initData: Object as PropType<Transfer.InitData>
  },

  setup(props) {
    const provider = <DataProvider> props.provider;
    const loading = ref<string|undefined>(undefined);

    const fileId = ref(props.initData.fileId);
    const currentSelection = ref<Transfer.CurrentSelection>(props.initData.selection);

    const fullTags = ref<Storage.FullTags>();
    const node = ref<Context.Node>();
    const tagTree = ref<Context.TagTree>();

    // 监听从插件传来的 selectionchange
    onMounted(() => {
      handleEvent("selectionchange", async (data: Transfer.CurrentSelection) => {
        currentSelection.value = data;
      });
    });

    const reloadNode = async (keepCheck: boolean) => {
      if (!currentSelection.value) return;
      console.log("PageNode.reloadNode", currentSelection.value);
      loading.value = 'Loading Node...';
      fullTags.value = new Map(JSON.parse(JSON.stringify([...await provider.getFullTags()])));
      const originNodeData = await provider.getNode(fileId.value, currentSelection.value.id);
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
    }

    // selection改变时，自动刷新当前已选中的frame
    watchEffect(() => reloadNode(false));

    // flat出所有已选Tag
    const collectTags = computed(() => {
      return tagTree.value
          ?.flatMap(type => [...type.tags.values()])
          .flat()
          .filter(t => t.check)
    });

    // 成功设置fileId的监听
    const onSetFileId = (file: string) => {
      fileId.value = file;
    }

    // 手动添加Tag（伪保存）
    const addTag = (tagType: string, tag: Storage.Tag) => {
      if (tagTree.value) {
        Utils.newTagToTagTree(tagTree.value, tagType, tag);
      } else {
        throw "tagTree is undefined";
      }
    }

    // 手动修改Tag（直接生效）
    const editTag = async (tagType: string, nameFrom: string, tag: Storage.Tag) => {
      console.log("editTag", tagType, nameFrom, tag);
      if (tagTree.value && fullTags.value) {
        loading.value = 'Saving Tag...';
        fullTags.value = Utils.contextTagTree2StorageTags(tagTree.value);
        const target = fullTags.value.get(tagType)?.tags.find(t => t.name === nameFrom);
        target.name = tag.name;
        target.color = tag.color;
        target.background = tag.background;
        const tagRenames: Transfer.TagRenameGroup = {
          [tagType]: {
            [nameFrom]: tag.name
          }
        };
        await provider.updateFullTags(fullTags.value, tagRenames);
        await reloadNode(true);
        loading.value = undefined;
      } else {
        throw "Missing tagTree & fullTags";
      }
    }

    // 手动删除Tag（直接生效）
    const deleteTag = async (tagType: string, tagName: string) => {
      console.log("deleteTag", tagType, tagName);
      if (tagTree.value && fullTags.value) {
        loading.value = 'Saving Tag...';
        fullTags.value = Utils.contextTagTree2StorageTags(tagTree.value);
        const tags = fullTags.value.get(tagType)?.tags;
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].name === tagName) {
            tags.splice(i, 1);
          }
        }
        await provider.updateFullTags(fullTags.value, {});
        await reloadNode(true);
        loading.value = undefined;
      } else {
        throw "Missing tagTree & fullTags";
      }
    }

    // 手动添加 Tag Type（Tag大分类）（直接生效）
    const addTagType = async (tagType: string) => {
      console.log("addTagType", tagType);
      if (fullTags.value && !fullTags.value.has(tagType)) {
        loading.value = 'Saving Tag type...';
        fullTags.value.set(tagType, {
          name: tagType,
          tags: []
        });
        await provider.updateFullTags(fullTags.value, {});
        await reloadNode(true);
        //tagTree.value = Utils.storageTags2ContextTagTree(node.value.tags, fullTags.value);
      } else {
        throw "FullTags is undefined";
      }
    }

    // 删除某一TagType大分类（危险，直接生效）
    const deleteTagType = async (tagType: string) => {
      console.log("deleteTagType", tagType);
      if (fullTags.value && fullTags.value.has(tagType)) {
        fullTags.value.delete(tagType);
        await provider.updateFullTags(fullTags.value, {});
        await reloadNode(true);
      } else {
        throw "FullTags is undefined";
      }
    }

    // 手动修改TagType的名称（直接生效）
    const editTypeName = async (oldName: string, newName: string) => {
      console.log("editTypeName", oldName, newName);
      if (oldName === newName) return;
      if (fullTags.value.has(newName)) {
        alert("Name already exists");
        return;
      }
      loading.value = "Saving the Type name";
      await provider.renameTagType(oldName, newName);
      await reloadNode(false);
    }

    // 保存Node
    const toSave = async () => {
      console.log("toSave", tagTree.value);
      loading.value = 'Saving Node... (collect)';
      node.value.tags = Utils.contextTagTree2ContextNode(tagTree.value);
      node.value.saved = true;
      loading.value = 'Saving Node... (cover)';
      node.value.cover = await exportCover(node.value.node_id);
      loading.value = 'Saving Node... (tags)';
      fullTags.value = Utils.contextTagTree2StorageTags(tagTree.value);
      await provider.updateFullTags(fullTags.value, {});
      loading.value = 'Saving Node... (storage)';
      await provider.saveNode(fileId.value, node.value.node_id, node.value);
      loading.value = undefined;
      dispatch('canvas-mark-node', <Transfer.CanvasSignNode> {
        fullTags: JSON.stringify([...fullTags.value]),
        node: JSON.stringify(node.value)
      })
    }

    // 删除Node
    const toDelete = async () => {
      const nodeId = currentSelection.value.id;
      loading.value = 'Deleting Node...';
      await provider.deleteNode(fileId.value, nodeId);
      dispatch('canvas-unmark-node', nodeId);
      loading.value = 'Reloading Node...';
      await reloadNode(false);
      loading.value = undefined;
    }

    const openSettings = () => {
      // TODO
      dispatch('client-storage-set', {
        key: 'tags',
        data: undefined
      });
      dispatch('client-storage-set', {
        key: 'nodes',
        data: undefined
      });
    }

    return {
      provider, loading, fileId, currentSelection, fullTags, node, tagTree, collectTags,
      reloadNode, onSetFileId, addTag, editTag, deleteTag, addTagType, deleteTagType, editTypeName, toSave, toDelete, openSettings
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
  margin: 0 0 12px;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
}

.title > * {
  flex: none;
  flex-grow: 1;
}

.tree {
  padding-top: 12px;
  border-top: solid #e0e0e0 1px;
}

.selected {
  padding: 0 0 8px;
  margin-bottom: 4px !important;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-flow: wrap;
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

</style>