<template>
  <div>
        <div class="export-form">
      <el-form ref="form" label-width="200px" >
        <el-form-item label="账号名">
          <span>{{userData.name}}</span>
        </el-form-item>
        <el-form-item label="账号(手机号码)">
          <span>{{userData.phone}}</span>
        </el-form-item>
        <el-form-item label="角色">
          <span>{{userData.role | roleChange}}</span>
        </el-form-item>
        <el-form-item label="注册日期">
          <span>{{userData.created_date |timeStamp }}</span>
        </el-form-item>
        <el-form-item v-if="isReset" label="重置的密码">
          <el-input size="small" ></el-input>
        </el-form-item>
        <el-form-item v-if="isReset" label="确认密码">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!isReset" type="danger" size="small" @click="isReset = true">修改密码</el-button>
          <el-button v-if="isReset" size="small" @click="reset">确认修改</el-button>
          <el-button v-if="isReset" type="danger" size="small" @click="isReset = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/util/common";
import { localData } from "@/util/local";
export default {
  data() {
    return {
      userData: {},
      isReset:false
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
    this.userData = localData("get", 'userinfo')
  },
  methods: {
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