<template>
  <div class="page-select-bar">
    <div class="page-select-bar-title">
      <p> {{ typeName }} </p>
      <span class="page-select-bar-cover-reloading" v-if="requestCount > 0">
        <LoadingIcon :color="isDark ? 'white' : 'black'" width="10" style="margin-right: 6px;" />
        {{ $t('lookup.refresh', [requestCount]) }}
      </span>
    </div>
    <div style="margin-right: 8px">
      <tk-select v-if="fullTypes.length > 1" :selected="sortType" v-model="sortType" :allow-clear-selection="true" :min-width="120" align="right">
        <template #selectButton>
          <div class="page-select-bar-sort" :class="{ 'page-select-bar-sort--normal': !sort, 'page-select-bar-sort--sorting': sort }">
            <img class="img-icon" :src="require('../resource/sort' + (sort ? '-blue' : '') + '.svg')" alt="sort" style="margin-right: 4px">
            {{ sort ? sort.type : $t('lookup.sort') }}
          </div>
        </template>
        <template #selectDropDown>
          <tk-select-item size="small" v-for="tagType in fullTypes" v-show="typeName !== tagType" :value="tagType"> {{ tagType }} </tk-select-item>
        </template>
      </tk-select>
    </div>
  </div>
</template>

<script lang="ts">
import { requestCount } from "../hooks/reloadCover";
import LoadingIcon from "../component/LoadingIcon.vue";
import {PropType, ref, watch} from "vue";
import DataProvider from "../provider/DataProvider";
import TkSelect from "../component/select/TkSelect.vue";
import TkSelectItem from "../component/select/TkSelectItem.vue";
import { useTheme } from "../utils/theme";

export default {
  name: "PageSelectBar",
  components: { TkSelectItem, TkSelect, LoadingIcon },
  props: {
    provider: Object as PropType<DataProvider>,
    typeName: String,
    viewSort: Object as PropType<Storage.ViewSort>,
  },
  emits: [ 'changeSort' ],
  setup(props, context) {
    const { isDark } = useTheme();
    // 获取完整列表
    const fullTypes = ref<string[]>([]);
    props.provider.getFullTags(false).then(re => fullTypes.value = [...re.values()].flatMap(g => g.name));
    // 加载排序
    const sort = ref<Storage.ViewSort>(props.viewSort);
    const sortType = ref<string>(props.viewSort?.type);
    console.log("PageSelectBar.setup.viewSort", props.viewSort, sortType.value);

    watch(sortType, (newVal) => {
      sort.value = newVal ? {
        type: newVal,
        order: "ASC"
      } : undefined;
      console.log("PageSelectBar.sortChange", sort.value);
      context.emit('changeSort', sort.value);
    });

    return { isDark, sort, sortType, fullTypes, requestCount }
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
  background: var(--color-bg-topbar);
  backdrop-filter: blur(16px);
  user-select: none;
  border-bottom: 1px var(--color-border-light) solid;
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
  padding: 5px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--color-text);
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
  color: var(--color-text-secondary);
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
  border-radius: 5px;
  transition: all 200ms ease-out;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text);
}

.page-select-bar-sort--normal {
  color: var(--color-text-secondary);
  background-color: transparent;
}

.page-select-bar-sort--normal:hover {
  color: var(--color-text);
  background-color: var(--color-bg-hover-lite);
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