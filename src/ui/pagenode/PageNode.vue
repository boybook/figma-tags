<template>
  <PageNodeInitFile v-if="!fileId" @set-file-id="onSetFileId" />
  <PageNodeTopBar v-if="fileId" :current="currentSelection" @page-settings="fileId = undefined" />
  <PageNodeFooter @save="toSave" @delete="toDelete" />
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
      <TagTree :tag-tree="tagTree" @add-tag="addTag" />
    </div>
  </div>
</template>

<script lang="ts">

import DataProvider from "../provider/DataProvider";
import { exportCover } from "../provider/CoverProvider";
import { computed, onMounted, PropType, ref, watchEffect} from "vue";
import { handleEvent } from "../uiMessageHandler";
import * as Utils from "../utils";

import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
import FigTag from "../component/FigTag.vue";
import PageNodeTopBar from "./PageNodeTopBar.vue";
import PageNodeInitFile from "./PageNodeInitFile.vue";
import TagTree from "../component/tagtree/TagTree.vue";
import PageNodeFooter from "./PageNodeFooter.vue";

export default {
  name: "PageNode",
  components: {PageNodeFooter, TagTree, PageNodeInitFile, FigButton, FigInput, FigTag, PageNodeTopBar },
  props: {
    provider: Object as PropType<DataProvider>,
    initData: Object as PropType<Transfer.InitData>
  },

  setup(props) {
    const provider = <DataProvider> props.provider;

    const fileId = ref(props.initData.file_id);
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

    const reloadNode = async () => {
      if (!currentSelection.value) return;
      console.log("currentSelection update", currentSelection.value);
      fullTags.value = JSON.parse(JSON.stringify(await provider.getFullTags()));
      const nodeData = await provider.getNode(fileId.value, currentSelection.value.id);

      console.log("fullTags", fullTags.value);
      console.log("nodeData", nodeData);

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
    }

    // selection改变时，自动刷新当前已选中的frame
    watchEffect(reloadNode);

    // flat出所有已选Tag
    const collectTags = computed(() => {
      return tagTree.value
          ?.flatMap(type => Object.values(type.tags))
          .flat()
          .filter(t => t.check)
    });

    // 成功设置fileId的监听
    const onSetFileId = (file: string) => {
      fileId.value = file;
    }

    // 如果在本次新增了tag，需要添加到里面，用于最终发给服务端（包含颜色等信息）
    const newTags = ref<Storage.FullTags>({});

    // 用户手动添加Tag
    const addTag = (tagType: string, tag: Storage.Tag) => {
      if (fullTags.value) {
        if (!fullTags.value[tagType]) {
          fullTags.value[tagType] = {
            name: tagType,
            tags: []
          }
        }
        fullTags.value[tagType].tags.push(tag);
        if (!node.value.tags[tagType]) node.value.tags[tagType] = [];
        node.value.tags[tagType].push(tag.name);

        // 添加到newTags中
        if (!newTags.value[tagType]) {
          newTags.value[tagType] = {
            name: tagType,
            tags: []
          }
        }
        newTags.value[tagType].tags.push(tag);

        tagTree.value = Utils.storageTags2ContextTagTree(node.value.tags, fullTags.value);
      } else {
        throw "FullTags is undefined";
      }
    }

    // 保存Node
    const toSave = async () => {
      const nodeTags: Storage.NodeTags = {};
      for (let tagType of tagTree.value) {
        if (Object.values(tagType.tags).length > 0) {
          nodeTags[tagType.type] = Object.values(tagType.tags).flat().filter(tag => tag.check).flatMap(tag => tag.name);
        }
      }
      node.value.tags = nodeTags;
      node.value.saved = true;
      node.value.cover = await exportCover(node.value.node_id);
      await provider.saveNode(fileId.value, node.value.node_id, node.value, newTags.value);
    }

    // 删除Node
    const toDelete = async () => {
      await provider.deleteNode(fileId.value, currentSelection.value.id);
      await reloadNode();
    }

    return {
      provider, fileId, currentSelection, fullTags, node, tagTree, collectTags, onSetFileId, addTag, toSave, toDelete
    };

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