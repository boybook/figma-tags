<template>
  <div class="page-select-bar">
    <div class="page-select-bar-title">
      <p> {{ typeName }} </p>
      <span class="page-select-bar-cover-reloading" v-if="requestCount > 0">
        <LoadingIcon width="10" style="margin-right: 6px;" />
        {{ $t('lookup.refresh', [requestCount]) }}
      </span>
    </div>
    <div class="page-select-bar-sort" @click="changeSort" :class="{ 'page-select-bar-sort--normal': !sort, 'page-select-bar-sort--sorting': sort }">
      <img :src="require('../resource/sort' + (sort ? '-blue' : '') + '.svg')" alt="sort" style="margin-right: 4px">
      {{ sort ? sort.type : $t('lookup.sort') }}
    </div>
  </div>
</template>

<script lang="ts">
import { requestCount } from "../hooks/reloadCover";
import LoadingIcon from "../component/LoadingIcon.vue";
import {PropType, ref, watch} from "vue";
import DataProvider from "../provider/DataProvider";

export default {
  name: "PageSelectBar",
  components: { LoadingIcon },
  props: {
    provider: Object as PropType<DataProvider>,
    typeName: String,
    viewSort: Object as PropType<Storage.ViewSort>,
  },
  emits: [ 'changeSort' ],
  setup(props, context) {
    // 获取完整列表
    const fullTypes = ref<string[]>();
    props.provider.getFullTags().then(re => fullTypes.value = [...re.values()].flatMap(g => g.name));

    // 加载排序
    const sort = ref<Storage.ViewSort>(props.viewSort);

    const changeSort = () => {
      console.log("PageSelectBar.changeSort");
      if (sort.value) {
        sort.value = undefined;
      } else {
        sort.value = {
          type: props.typeName,
          order: 'ASC'
        };
      }
    }
    watch(
        sort,
        (newVal) => {
          context.emit('changeSort', newVal);
        }
    )

    return { sort, requestCount, changeSort }
  }
}
</script>

<style scoped>

.page-select-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  background: rgba(255, 255, 255, .9);
  backdrop-filter: blur(16px);
  user-select: none;
  border-bottom: 1px #E0E0E0 solid;
  z-index: 999;
}

.page-select-bar-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  flex: none;
  flex-grow: 1;
  align-self: stretch;
}

.page-select-bar-title > p {
  /* Inside auto layout */
  margin: 0;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, .85);
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.page-select-bar-cover-reloading {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0 8px 0 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 18px;
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

.page-select-bar-sort {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 2px;
  transition: all 200ms ease-out;
  font-size: 12px;
  line-height: 18px;
}

.page-select-bar-sort--normal {
  color: rgba(0, 0, 0, 0.45);
  background-color: transparent;
}

.page-select-bar-sort--normal:hover {
  color: rgba(0, 0, 0, 0.65);
  background-color: rgba(0, 0, 0, 0.05);
}

.page-select-bar-sort--sorting {
  color: #18A0FB;
  font-weight: bold;
  background-color: #18A0FB1A;
}

.page-select-bar-sort--sorting:hover {
  background-color: #18A0FB28;
}

</style>