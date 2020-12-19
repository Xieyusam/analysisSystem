<template>
  <div id="headerbox">
    <div class="sysTitle"> <i class="el-icon-s-platform"></i> 企业数据分析平台</div>
  </div>
</template>

<script>
export default {
  name: "headerbox",
  data() {
    return {};
  },
  methods: {
    goToPage(index) {
      // this.$message({
      //   showClose: true,
      //   message: '恭喜你，这是一条成功消息',
      //   type: 'success'
      // });
      this.$router.push({ path: "/page" + index });
    },
  },
};
</script>

<style>
#headerbox {
  text-align: start;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #d5dee7bb, #d5dee74d, #d5dee74d, #d5dee74d, #d5dee74d, #d5dee74d);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
#headerbox .sysTitle {
  font-size: 20px;
  display: inline-block;
  line-height: 60px;
  padding: 0 20px;
  font-weight: bold;
  font-family: sans-serif;
  color: #8d8b8b;
}
</style>