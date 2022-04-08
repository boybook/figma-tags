<template>
  <PageNodeInitFile v-if="!fileId" @set-file-id="onSetFileId" />
  <PageNodeTopBar v-if="fileId" :current="currentSelection" @page-settings="fileId = undefined" />
  <div id="ui" v-if="fileId">
    <div class="title" v-if="!loading">
      <!--
      <a v-tooltip="{ content: node.notion_id ? 'Linked' : 'Unlinked', placement: 'bottom', offset: 4}" :href="node.notion_url" target="_blank">
        Link
      </a>
      -->
      <FigInput v-model:val="node.title" />
    </div>
    <div></div>
    <FigTag :removable="true" />
  </div>
</template>

<script lang="ts">

import DataProvider from "../provider/DataProvider";
import {onMounted, PropType, ref} from "vue";
import { handleEvent } from "../uiMessageHandler";

import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
import FigTag from "../component/FigTag.vue";
import PageNodeTopBar from "./PageNodeTopBar.vue";
import PageNodeInitFile from "./PageNodeInitFile.vue";
import * as Utils from "../utils";

export default {
  name: "PageNode",
  components: { PageNodeInitFile, FigButton, FigInput, FigTag, PageNodeTopBar },
  props: {
    provider: Object as PropType<DataProvider>,
    initData: Object as PropType<Transfer.InitData>
  },

  setup(props) {
    const provider = <DataProvider> props.provider;

    const fileId = ref(props.initData.file_id);
    const currentSelection = ref<Transfer.CurrentSelection>(props.initData.selection);

    const node = ref<Storage.Node>();
    const tagTree = ref<Context.TagTree>();

    onMounted(() => {
      handleEvent("selectionchange", async (data: Transfer.CurrentSelection) => {
        currentSelection.value = data;
        node.value = await provider.getNode(fileId.value, currentSelection.value.id);
        if (!node.value) {  // 为空值时，初始化一个空的Node
          node.value = {
            title: currentSelection.value.name,
            file_id: fileId.value,
            node_id: currentSelection.value.id,
            tags: {}
          }
        }
        tagTree.value = Utils.storageTags2ContextTagTree(node.value.tags, await provider.getFullTags());
      });
    });

    const onSetFileId = (file: string) => {
      fileId.value = file;
    }

    return {
      provider, fileId, currentSelection, node, tagTree, onSetFileId
    };
  }
}
</script>

<style scoped>

#ui{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--size-medium);
  padding-top: 34px;
}

</style>