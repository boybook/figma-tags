<template>
  <ul class="page-select-wrapper-blocks">
    <li :id="'anchor-' + tag.name" v-for="tag in tags">
      <PageSelectTypeTag
          :key="tagType + '#' + tag.name + '#' + viewSort?.type + '#' + viewSort?.order"
          :provider="provider"
          :access-token="accessToken"
          :tag-type="tagType"
          :view-sort="viewSort"
          :tag="tag"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import {PropType} from "vue";
import PageSelectTypeTag from "./PageSelectTypeTag.vue";
import DataProvider from "../provider/DataProvider";

export default {
  name: "PageSelectType",
  components: { PageSelectTypeTag },
  props: {
    provider: Object as PropType<DataProvider>,
    accessToken: String,
    tagType: String,
    viewSort: Object as PropType<Storage.ViewSort>,
    tags: Array as PropType<Storage.Tag[]>
  }
}
</script>

<style scoped>

.page-select-wrapper-blocks {
  flex: none;
  order: 1;
  flex-grow: 1;
  margin: 0 0 0 176px;
  padding: 42px 0 16px 0;
  background-color: #EDEDED;
  min-height: 100vh;
}

</style>