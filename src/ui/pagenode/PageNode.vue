<template>
  <PageNodeInitFile v-if="!fileId" @set-file-id="onSetFileId" />
  <PageNodeTopBar v-if="fileId" :current="currentSelection" @page-settings="fileId = undefined" />
  <div id="ui" v-if="fileId">
    <p> {{ fileId }} </p>
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

export default {
  name: "PageNode",
  components: {PageNodeInitFile, FigButton, FigInput, FigTag, PageNodeTopBar },
  props: {
    provider: Object as PropType<DataProvider>,
    initData: Object as PropType<TransferDeclare.InitData>
  },

  setup(props) {
    const provider = <DataProvider> props.provider;

    const fileId = ref(props.initData.file_id);
    const currentSelection = ref<TransferDeclare.CurrentSelection>(props.initData.selection);

    onMounted(() => {
      handleEvent("selectionchange", (data: TransferDeclare.CurrentSelection) => {
        currentSelection.value = data;
      });
    });

    const onSetFileId = (file: string) => {
      fileId.value = file;
    }

    return {
      provider, fileId, currentSelection, onSetFileId
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