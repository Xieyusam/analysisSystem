<template>
  <div id="login">
    <div class="login-box">
      <div class="title">欢迎使用企业数据分析平台</div>
      <div class="child-box"  v-if="!isRegister">
        <el-input placeholder="your phone" v-model="phone"> </el-input>
        <el-input placeholder="your password" show-password v-model="password"> </el-input>

        <el-button @click="isRegister = !isRegister" type="primary"
          >注册</el-button
        >
        <el-button @click="LoginByPhone" type="primary">登录</el-button>
      </div>
      <div class="child-box" v-if="isRegister">
        <el-input placeholder="your username" v-model="user"> </el-input>
        <el-input placeholder="your phone" v-model="phone"> </el-input>
        <el-input placeholder="your password" show-password v-model="password"> </el-input>
        <el-button @click="isRegister = !isRegister" type="primary"
          >返回登录</el-button
        >
        <el-button type="primary">确认注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  cookieData
} from "@/util/local";
export default {
  name: "login",
  data() {
    return {
      user: "",
      password: "",
      phone:'',
      isRegister: false,
    };
  },
  methods:{
    LoginByPhone() {
      if(!this.phone) {
        this.$message({
          showClose: true,
          message: '请填写登录手机',
          type: 'warning'
        });
        return
      }
      if(!this.password) {
        this.$message({
          showClose: true,
          message: '请填写登录密码',
          type: 'warning'
        });
        return
      }
      cookieData("set", "token", this.phone+'#'+this.password, 1); // 将token 存在cookie,  1天后过期
      this.$router.push({path:"/"})
    }
  }
};
</script>

<style>
#login {
  background-color: #94faf534;
  height: 100vh;
  width: 100vw;
  text-align: center;
}
#login .login-box .title {
  font-size: 24px;
  color: #01201f;
  padding: 20px 0;
}
#login .login-box {
  height: 350px;
  width: 400px;
  background-color: #94faf5;
  margin: auto;
  border-radius: 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 20px;
}
#login .login-box .child-box {
  width: 80%;
  margin: auto;
}
#login .login-box .child-box > .el-input {
  margin: 14px 0;
}
#login .login-box .child-box > .el-button {
  margin: 14px 0;
  width: 48%;
}
</style>
