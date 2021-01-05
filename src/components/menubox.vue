<template>
  <div id="menubox">
    <el-menu
      default-active="1"
      background-color="transparent"
      text-color="rgb(164 162 162)"
      active-text-color="#000000"
      @select="goToPage"
    >
      <!-- <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item> -->
      <el-menu-item index="2">
        <i class="el-icon-user-solid"></i>
        <span slot="title">客户数据分析</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-shop"></i>
        <span slot="title">产品数据分析</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-check"></i>
        <span slot="title">人事数据分析</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-upload"></i>
        <span slot="title">外部数据导入</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-s-management"></i>
        <span slot="title">数据导入管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-s-management"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menubox",
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
#menubox {
  background-color: #d5dee74d;
  height: 100%;
  width: 100%;
}
.el-menu {
  height: 100%;
  border-right: solid 0px rgba(0, 0, 0, 0.1);
}
.el-menu-item {
  font-size: 14px;
  font-weight: bold;
  text-align: start;
}
</style>