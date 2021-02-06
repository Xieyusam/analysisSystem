<template>
  <div id="login">
    <div class="login-box">
      <div class="title">欢迎使用企业数据分析平台</div>
      <div class="child-box" v-if="!isRegister">
        <el-input placeholder="your phone" v-model="phone"> </el-input>
        <el-input placeholder="your password" show-password v-model="password">
        </el-input>

        <el-button @click="isRegister = !isRegister" type="primary"
          >注册</el-button
        >
        <el-button @click="LoginByPhone" type="primary">登录</el-button>
      </div>
      <div class="child-box" v-if="isRegister">
        <el-input placeholder="your username" v-model="Rusername"> </el-input>
        <el-input placeholder="your phone" v-model="Rphone"> </el-input>
        <el-input placeholder="your password" show-password v-model="Rpassword">
        </el-input>
        <el-button @click="isRegister = !isRegister" type="primary"
          >返回登录</el-button
        >
        <el-button type="primary" @click="Register">确认注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { cookieData,localData } from "@/util/local";
import { UserLogin,UserRegister } from "@/api/user";
export default {
  name: "login",
  data() {
    return {
      Rusername: "",
      password: "",
      phone: "",
      Rphone:"",
      Rpassword:"",
      isRegister: false,
    };
  },
  methods: {
    LoginByPhone() {
      if (!this.phone) {
        this.$message({
          showClose: true,
          message: "请填写登录手机",
          type: "warning",
        });
        return;
      }
      if (!this.password) {
        this.$message({
          showClose: true,
          message: "请填写登录密码",
          type: "warning",
        });
        return;
      }
      const parems = {
        phone: this.phone,
        password: this.password,
      };
      UserLogin(parems)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            cookieData("set", "token", res.data.token, 1); // 将token 存在cookie,  1天后过期
            localData("set", 'userinfo' , res.data.user)
            this.$router.push({path:"/"})
          }else{
            this.$message({
              message: res.data,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          this.$message({
              message: err.data,
              type: "warning",
            });
        });
    },
    Register(){
      if (!this.Rusername) {
        this.$message({
          showClose: true,
          message: "请填写登录手机",
          type: "warning",
        });
        return;
      }
      if (!this.Rphone) {
        this.$message({
          showClose: true,
          message: "请填写登录手机",
          type: "warning",
        });
        return;
      }
      if (!this.Rpassword) {
        this.$message({
          showClose: true,
          message: "请填写登录密码",
          type: "warning",
        });
        return;
      }
      const parems = {
        name: this.Rusername,
        password: this.Rpassword,
        phone:this.Rphone,
        role:0
      };
      UserRegister(parems)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "用户账号成功",
              type: "success",
            });
            this.isRegister = false
          }
        })
        .catch((err) => {});
    }
  },
};
</script>

<style>
#login {
  /* background-color: #94faf534; */
  height: 100vh;
  width: 100vw;
  text-align: center;
  background-image: url("../../assets/banner1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
#login .login-box .title {
  font-size: 24px;
  color: #070707;
  padding: 20px 0;
  font-weight: bold;
}
#login .login-box {
  height: 350px;
  width: 400px;
  background-color: #545c64a4;
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
