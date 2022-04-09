<template>
  <div class="node-tag">
    <div class="node-tag-title">
      <FigTag v-bind:tag="tag" :removable="false"></FigTag>
    </div>
    <ul>
      <li class="node-tag-loading" v-if="loading">
        <LoadingIcon style="flex: none; order: 0; flex-grow: 0;" />
      </li>
      <li class="node-tag-loading" v-if="!loading && list.length === 0">
        <img :src="require('../resource/empty.svg')" alt="empty">
        <p>Empty</p>
      </li>
      <li v-for="node in list">
        <PageSelectTypeTagNode v-bind:node="node"></PageSelectTypeTagNode>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {PropType, ref} from "vue";
import DataProvider from "../provider/DataProvider";
import FigTag from "../component/FigTag.vue";
import PageSelectTypeTagNode from "./PageSelectTypeTagNode.vue";
import LoadingIcon from "../component/LoadingIcon.vue";

export default {
  name: "PageSelectTypeTag",
  components: {LoadingIcon, PageSelectTypeTagNode, FigTag},
  props: {
    provider: Object as PropType<DataProvider>,
    tagType: String,
    tag: Object as PropType<Storage.Tag>
  },
  setup(props) {
    const loading = ref(true);
    const list = ref<Storage.Node[]>([]);

    // TODO sort

    props.provider.selectNodes(props.tagType, props.tag.name).then(result => {
      list.value = result;
      loading.value = false;
    });

    return { loading, list }
  }
}
</script>

<style scoped>

.node-tag {
  animation: ease-show 0.5s ease-out;
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
  justify-content: space-between;
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

</style>