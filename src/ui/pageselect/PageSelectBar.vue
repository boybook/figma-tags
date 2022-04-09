<template>
  <div class="page-select-bar">
    <p> {{ typeName }} </p>
  </div>
</template>

<script>
export default {
  name: "PageSelectBar",
  props: {
    typeName: String
  },
  setup() {

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

.page-select-bar > div {
  padding: 10px;
  /* Inside auto layout */
  flex: none;
  flex-grow: 0;
  margin: 0;
  border-right: 1px solid #E0E0E0;
  transition: background-color 100ms ease;
  cursor: pointer;
}

.page-select-bar > div:hover {
  background: rgba(0, 0, 0, 0.05);
}

.page-select-bar > p {
  /* Inside auto layout */
  flex: none;
  flex-grow: 1;
  margin: 0;

  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, .85);
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 0;
}

</style>