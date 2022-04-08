<template>
  <!-- 一个Tag都没有的时候，怎么办 -->
  <ul class="tag-tree-ul">
    <li v-for="tagType in tagTree">
      <TagTreeType :tag-type="tagType" />
    </li>
  </ul>
</template>

<script lang="ts">
import {PropType} from "vue";
import TagTreeType from "./TagTreeType.vue";

export default {
  name: "TagTree",
  components: { TagTreeType },
  props: {
    tagTree: Object as PropType<Context.TagTree>
  },
  setup(props) {
  }
}
</script>

<style scoped>

.tag-tree-ul {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  user-select: none;
}

.tag-tree-ul > li {
  flex: none;
  align-self: stretch;
}

</style>