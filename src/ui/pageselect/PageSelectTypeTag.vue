<template>
  <div class="node-tag" ref="target">
    <div class="node-tag-title">
      <FigTag :tag="tag" :removable="false"></FigTag>
      <span class="counter" v-if="!loading" v-bind:class="{ 'counter-zero': count === 0 }"> {{ count }} </span>
    </div>
    <ul>
      <li class="node-tag-loading" v-if="loading">
        <LoadingIcon style="flex: none; order: 0; flex-grow: 0;" />
      </li>
      <li class="node-tag-loading" v-if="!loading && (!result || result.length === 0)">
        <img :src="require('../resource/empty.svg')" alt="empty">
        <p>Empty</p>
      </li>
      <li v-for="node in result">
        <PageSelectTypeTagNode
            :provider="provider"
            :document-file-id="documentFileId"
            :access-token="accessToken"
            :node="node"
            @refresh-cover="refreshCover"
            @refresh-cover-without-token="$emit('refreshCoverWithoutToken')"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {computed, PropType, ref, watch, watchEffect} from "vue";
import DataProvider from "../provider/DataProvider";
import {useLazyData} from "../hooks/useLazyData";
import FigTag from "../component/FigTag.vue";
import PageSelectTypeTagNode from "./PageSelectTypeTagNode.vue";
import LoadingIcon from "../component/LoadingIcon.vue";

export default {
  name: "PageSelectTypeTag",
  components: {LoadingIcon, PageSelectTypeTagNode, FigTag},
  props: {
    provider: Object as PropType<DataProvider>,
    documentFileId: String,
    accessToken: String,
    tagType: String,
    viewSort: Object as PropType<Storage.ViewSort>,
    tag: Object as PropType<Storage.Tag>
  },
  emits: [ 'refreshCoverWithoutToken' ],
  setup(props) {
    const loading = ref(true);

    const { target, result } = useLazyData(
        () => {
          return props.provider.selectNodes(props.tagType, props.tag.name, props.viewSort);
        },
        () => loading.value = false
    );

    const count = computed(() => {
      return result.value?.length;
    });

    const refreshCover = (node: Storage.Node, cover: string) => {
      console.log("refreshCover", cover);
      node.cover = cover;
      props.provider.saveNode(node.file_id, node.node_id, node);
    }

    return { loading, target, result, count, refreshCover }
  }
}
</script>

<style scoped>

.node-tag {
  animation: ease-show 0.1s ease-out;
}

@keyframes ease-show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.node-tag-loading {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  height: 178px;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  user-select: none;
}

.node-tag-loading p {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.25);
  padding: 0;
  margin: 0 0 8px 0;
}

.node-tag-title {
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.node-tag ul {
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 0 0 8px 16px;
  width: calc(100% - 16px);
  overflow-y: hidden;
}

.node-tag li {
  /*width: calc(100vw - 32px);*/
  width: 256px;
  padding: 0;
  margin-right: 8px;
  /* Inside auto layout */
  flex: none;
  flex-grow: 0;
  display: flex;
  align-items: stretch;
}

.counter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.85);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  min-width: 8px;
  font-family: Avenir, -apple-system, serif;
  margin-left: 8px;
  user-select: none;
}

.counter-zero {
  font-weight: 400 !important;
  color: rgba(0, 0, 0, 0.25) !important;
  background: rgba(255, 255, 255, 0.25) !important;
}

</style>