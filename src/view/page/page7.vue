<template>
  <div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="name" label="名字" width="180">
      </el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column align="center" prop="role" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.role | roleChange }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_date" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_date | timeStamp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.id != userData.id && scope.row.role == 0"
            size="mini"
            type="info"
            @click="reSetPwd(scope.$index, scope.row)"
            >重置密码</el-button
          >
          <el-button
            v-if="scope.row.id != userData.id && scope.row.role == 0"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { AllUser, deleteUser, resetPassword } from "@/api/user";
import { dateFormat } from "@/util/common";
import { localData, cookieData } from "@/util/local";

export default {
  data() {
    return {
      tableData: [],
      userData: localData("get", "userinfo"),
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
    this.getAllUser();
  },
  methods: {
    getAllUser() {
      AllUser().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.users;
        }
      });
    },
    reSetPwd(index, row) {
      const params = {
        id: row.id,
      };
      resetPassword(params)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "用户" + row.name + "密码重置成功",
              type: "success",
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
    handleDelete(index, row) {
      console.log(row);
      const params = {
        id: row.id,
      };
      deleteUser(params)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "删除用户" + row.name + "成功",
              type: "success",
            });
            this.getAllUser();
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
</style>