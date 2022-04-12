<template>
  <a class="node" :href="Utils.figmaURL(node.file_id, node.node_id)" target="_blank">
    <div class="node-img">
      <div v-if="loading" class="node-img-loading">
        <LoadingIcon />
      </div>
      <img :src="node.cover" @load="imageLoad" @error.once="imageError" :alt="node.title">
    </div>
    <p> {{ node.title }} </p>
  </a>
</template>

<script lang="ts">
import {PropType, ref} from "vue";
import * as Utils from "../utils";
import LoadingIcon from "../component/LoadingIcon.vue";
import reloadCover from "../hooks/reloadCover";

export default {
  name: "PageSelectTypeTagNode",
  components: {LoadingIcon},
  props: {
    accessToken: String,
    node: Object as PropType<Storage.Node>
  },
  emits: [ 'refreshCover' ],
  setup(props, context) {
    const loading = ref(true);
    const imageLoad = () => {
      loading.value = false;
    }
    const imageError = (event) => {
      loading.value = true;
      reloadCover(props.node.file_id, props.node.node_id, props.node.width, props.accessToken)
          .then(entry => {
            event.target.src = entry.cover;
            context.emit('refreshCover', props.node, entry.cover);
          })
          .catch(_ => {
            loading.value = false;
          });
    }
    return { Utils, loading, imageLoad, imageError }
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
}

.node .node-img > img {
  width: 100%;
  height: auto;
  max-width: 100%;
  /*max-height: 100%;*/
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