<template>
  <div>
    <div class="export-form">
      <el-form ref="form" label-width="200px">
        <el-form-item label="账号名">
          <span>{{ userData.name }}</span>
        </el-form-item>
        <el-form-item label="账号(手机号码)">
          <span>{{ userData.phone }}</span>
        </el-form-item>
        <el-form-item label="角色">
          <span>{{ userData.role | roleChange }}</span>
        </el-form-item>
        <el-form-item label="注册日期">
          <span>{{ userData.created_date | timeStamp }}</span>
        </el-form-item>
        <el-form-item v-if="isReset" label="重置的密码">
          <el-input size="small" show-password v-model="pwd1"></el-input>
        </el-form-item>
        <el-form-item v-if="isReset" label="确认密码">
          <el-input size="small" show-password v-model="pwd2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="!isReset"
            type="danger"
            size="small"
            @click="isReset = true"
            >修改密码</el-button
          >
          <el-button v-if="isReset" size="small" @click="setNewPassword"
            >确认修改</el-button
          >
          <el-button
            v-if="isReset"
            type="danger"
            size="small"
            @click="isReset = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/util/common";
import { localData, cookieData } from "@/util/local";
import { newPassword } from "@/api/user";
export default {
  data() {
    return {
      userData: {},
      isReset: false,
      pwd1: "",
      pwd2: "",
    };
  },
  filters: {
    roleChange(value) {
      return value == 0 ? "用户" : value == 1 ? "管理员" : "超级管理员";
    },
    timeStamp(value) {
      const time = new Date(value);
      return dateFormat("YYYY-mm-dd HH:MM", time);
    },
  },
  mounted() {
    this.userData = localData("get", "userinfo");
  },
  methods: {
    setNewPassword() {
      if (!this.pwd1) {
        this.$message({
          showClose: true,
          message: "请填写要修改的密码",
          type: "warning",
        });
        return;
      }
      if (!this.pwd2) {
        this.$message({
          showClose: true,
          message: "请确认要修改的密码",
          type: "warning",
        });
        return;
      }
      if (this.pwd2 !== this.pwd1) {
        this.$message({
          showClose: true,
          message: "两次密码输入不一致",
          type: "warning",
        });
        return;
      }
      const params = {
        id: this.userData.id,
        password: this.pwd2,
      };
      newPassword(params)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "修改密码成功，请重新登录",
              type: "success",
            });
            cookieData("clean", "token"); // 清除token

            this.$router.push({ path: "/login" });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.data,
            type: "warning",
          });
        });
    },
  },
};
</script>

<style>
.export-form {
  height: 300px;
  width: 600px;
  margin-left: 20px;
}
</style>