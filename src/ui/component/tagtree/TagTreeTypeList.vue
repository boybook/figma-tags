<template>
  <ul>
    <li v-for="(childTags, childTagType) in tagType.tags">
      <ul v-if="childTags.length > 0" class="sub-type">
        <li class="sub-type-title" v-if="childTagType.length > 0"> {{ childTagType }} </li>
        <li v-for="tag in childTags">
          <TagTreeTypeListEntry :tag="tag" @selectTag="onSelectTag" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">

import { PropType } from "vue/dist/vue";
import TagTreeTypeListEntry from "./TagTreeTypeListEntry.vue";

export default {
  name: "TagTreeTypeList",
  components: { TagTreeTypeListEntry },
  props: {
    tagType: Object as PropType<Context.TagType>,
  },
  emits: ["selectTag"],
  setup(props, context) {
    const onSelectTag = (tag, check) => {
      context.emit('selectTag', tag, check)
    }
    return { onSelectTag }
  }
}

</script>

<style scoped>

ul {
  list-style-type:none;
  padding: 0;
}

.sub-type {
  padding-bottom: 8px;
  padding-left: 0;
}

.sub-type-title {
  color: rgba(0, 0, 0, .45);
  padding: 0 0 4px 24px;
  font-size: 12px;
}

</style>