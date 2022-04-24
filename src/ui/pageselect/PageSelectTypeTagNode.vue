<template>
  <a class="node" :href="node.file_id ? Utils.figmaURL(node.file_id, node.node_id) : ''" target="_blank" @click="clickLink">
    <div class="node-img">
      <div v-if="loading" class="node-img-loading">
        <LoadingIcon />
      </div>
      <img v-show="!loading" :src="imageSrc" @load="imageLoad" @error.once="imageError" :alt="node.title">
    </div>
    <p> {{ node.title }} </p>
  </a>
</template>

<script lang="ts">
import {computed, onMounted, PropType, ref} from "vue";
import * as Utils from "../utils";
import LoadingIcon from "../component/LoadingIcon.vue";
import { reloadCover } from "../hooks/reloadCover";
import DataProvider from "../provider/DataProvider";
import {dispatch} from "../uiMessageHandler";

export default {
  name: "PageSelectTypeTagNode",
  components: {LoadingIcon},
  props: {
    provider: Object as PropType<DataProvider>,
    documentFileId: String,
    accessToken: String,
    node: Object as PropType<Storage.Node>
  },
  emits: [ 'refreshCover', 'refreshCoverWithoutToken' ],
  setup(props, context) {
    const loading = ref(true);
    const reloading = ref(false);
    const imageSrc = computed(() => {
      if (props.node.cover?.startsWith("http")) {  // 封面是有效的URL（至于是否过期，会在下方imageError处理）
        return props.node.cover;
      } else {
        return require('../resource/img-deafult.svg');
      }
    })
    // 加载时，如果发现cover不是有效url
    onMounted(() => {
      if (!props.node.cover?.startsWith("http")) { // 图片不是有效URL
        if ((props.provider.type === 'document' && props.documentFileId || (props.provider.type !== 'document' && props.node.file_id))) {
          // 具备重新生成的条件
          tryReloadCover();
        } else {
          context.emit('refreshCoverWithoutToken'); // 没授权figmaToken或fileId，向前传，弹出提示请求授权
          console.log("PageSelectTypeTagNode", "refreshCoverWithoutToken", props.node);
        }
      }
    });
    const imageLoad = () => {
      if (!reloading.value) {
        loading.value = false;
      }
    }
    const imageError = (event) => {
      if (props.accessToken) {  // 只有有accessToken的时候，才会刷新
        tryReloadCover();
      } else {
        event.target.src = require('../resource/img-deafult.svg');
        console.log("PageSelectTypeTagNode", "refreshCoverWithoutToken");
        context.emit('refreshCoverWithoutToken');
      }
    }
    const tryReloadCover = () => {
      loading.value = true;
      reloading.value = true;
      reloadCover(props.provider.type === 'document' ? props.documentFileId : props.node.file_id, props.node.node_id, props.node.width, props.accessToken)
          .then(entry => {
            reloading.value = false;
            loading.value = false;
            console.log("PageSelectTypeTagNode.refreshCover", entry);
            //event.target.src = entry.cover;
            context.emit('refreshCover', props.node, entry.cover);
          })
          .catch(_ => {
            reloading.value = false;
            loading.value = false;
          });
    }
    const clickLink = () => {
      if (props.provider.type === 'document') {
        dispatch('select-node', props.node.node_id);
      }
    }
    return { Utils, loading, imageSrc, imageLoad, imageError, clickLink }
  }
}
</script>

<style scoped>

.node {
  background: white;
  border-radius: 4px;
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  overflow: hidden;
  text-decoration: none;
  transition: box-shadow 300ms ease;
  flex: 1;
  user-select: none;
}

.node:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.node:hover .node-img {
  transform: scale(1.03);
}

.node .node-img {
  position: relative;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0;
  height: 144px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: #fafafa;
  transition: all 300ms ease-out;
}

.node .node-img > img {
  width: 100%;
  height: auto;
  max-width: 100%;
  /*max-height: 100%;*/
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

.node > p {
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-img-loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.node p {
  padding: 8px;
  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, .85);
}

</style>