<template>
  <div id="headerbox">
    <div class="sysTitle"><i class="el-icon-monitor"></i> 企业数据分析平台</div>
    <div>
      <!-- {{activeIndex}} -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="goToPage"
        menu-trigger="click"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="page1">首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title">数据分析</template>
          <el-menu-item index="page2">客户数据分析</el-menu-item>
          <el-menu-item index="page3">产品数据分析</el-menu-item>
          <el-menu-item index="page4">人事数据分析</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">数据管理</template>
          <el-menu-item index="page5">外部数据导入</el-menu-item>
          <el-menu-item index="page6">数据导入管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">用户</template>
          <el-menu-item index="page7">用户账号</el-menu-item>
          <el-menu-item index="page8">个人账号</el-menu-item>
          <el-menu-item index="exit">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- <div @click="exitToLogin()" class="exit-btn">退出登录</div> -->
  </div>
</template>

<script>
import { cookieData } from "@/util/local";
export default {
  name: "headerbox",
  data() {
    return {
      activeIndex: "page1",
    };
  },
  methods: {
    goToPage(index) {
      if (index == "page1") {
        this.$router.push({ path: "/" });
      } else if(index == "exit"){
        this.exitToLogin()
      } else {
        this.$router.push({ path: "/" + index });
      }
    },
    // goToPage(index) {
    //   // this.$message({
    //   //   showClose: true,
    //   //   message: '恭喜你，这是一条成功消息',
    //   //   type: 'success'
    //   // });
    //   this.$router.push({ path: "/page" + index });
    // },
    exitToLogin() {
      cookieData("clean", "token"); // 清除token
      this.$message({
        showClose: true,
        message: "成功退出",
        type: "success",
      });
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style>
#headerbox {
  /* text-align: start; */
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background-color: #545c64;
  /* background-image: linear-gradient(to right, #d5dee7bb, #d5dee74d); */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border-bottom:2px solid #000000 ; */
}
#headerbox .sysTitle {
  font-size: 20px;
  width: 190px;
  /* display: inline-block; */
  line-height: 60px;
  padding: 0 20px;
  font-weight: bold;
  font-family: sans-serif;
  color: #fff;
}
#headerbox .exit-btn {
  font-size: 14px;
  width: 100px;
  display: inline-block;
  line-height: 60px;
  padding: 0 20px;
  color: #8d8b8b;
  vertical-align: bottom;
  cursor: pointer;
}
#headerbox .exit-btn:hover {
  color: teal;
}
</style>