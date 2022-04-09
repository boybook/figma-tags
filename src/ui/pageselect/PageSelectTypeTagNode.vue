<template>
  <a class="node" :href="Utils.figmaURL(node.file_id, node.node_id)" target="_blank">
    <div class="node-img" v-bind:style="{ background: 'url(' + node.cover + ')'}"></div>
    <p> {{ node.title }} </p>
  </a>
</template>

<script lang="ts">
import {PropType} from "vue";
import * as Utils from "../utils";

export default {
  name: "PageSelectTypeTagNode",
  props: {
    node: Object as PropType<Storage.Node>
  },
  setup() {
    return { Utils }
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
}

.node:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.node .node-img {
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0 0;
  height: 144px;

  overflow: hidden;

  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
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