<template>
  <div id="headerbox">
    <div class="sysTitle"> <i class="el-icon-monitor"></i> 企业数据分析平台</div>
    <div @click="exitToLogin()" class="exit-btn">退出登录</div>
  </div>
</template>

<script>
import {
  cookieData
} from "@/util/local";
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
    exitToLogin() {
      cookieData("clean", "token") // 清除token
        this.$message({
        showClose: true,
        message: '成功退出',
        type: 'success'
      });
      this.$router.push({ path: "/login" });
    }
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
  background-image: linear-gradient(to right, #d5dee7bb, #d5dee74d);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
#headerbox .sysTitle {
  font-size: 20px;
  width: 190px;
  /* display: inline-block; */
  line-height: 60px;
  padding: 0 20px;
  font-weight: bold;
  font-family: sans-serif;
  color: #8d8b8b;
}
#headerbox .exit-btn{
  font-size: 14px;
  width: 100px;
  display: inline-block;
  line-height: 60px;
  padding: 0 20px;
  color: #8d8b8b;
  vertical-align: bottom;
  cursor: pointer;
}
#headerbox .exit-btn:hover{
    color: teal;
}
</style>