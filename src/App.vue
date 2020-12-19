<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
/* //全局修改了滚动条样式 */
::-webkit-scrollbar {
  /* //滚动条的宽度 */
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  /* //滚动条的设置 */
  background-color: #bbb;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>
