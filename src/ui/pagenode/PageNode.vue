<template>
  <PageNodeTopBar :current="currentSelection" />
  <div id="ui">
    <FigTag :removable="true" />
  </div>
</template>

<script lang="ts">
import DataProvider from "../provider/DataProvider";
import {onMounted, PropType, ref} from "vue";
import FigInput from "../component/FigInput.vue";
import FigButton from "../component/FigButton.vue";
import FigTag from "../component/FigTag.vue";
import PageNodeTopBar from "./PageNodeTopBar.vue";
import { handleEvent } from "../uiMessageHandler";

export default {
  name: "PageNode",
  components: { FigButton, FigInput, FigTag, PageNodeTopBar },
  props: {
    provider: Object as PropType<DataProvider>
  },

  setup(props) {
    const provider = <DataProvider> props.provider;

    const currentSelection = ref<TransferDeclare.CurrentSelection>();

    onMounted(() => {
      // The following shows how messages from the main code can be handled in the UI code.
      handleEvent("selectionchange", (data: TransferDeclare.CurrentSelection) => {
        currentSelection.value = data;
      });
    })

    return {
      provider, currentSelection
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
}

</style>