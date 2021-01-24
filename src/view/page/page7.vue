<template>
  <div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="name" label="名字" width="180"> </el-table-column>
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
import { AllUser } from "@/api/user";
import { dateFormat } from "@/util/common";
export default {
  data() {
    return {
      tableData: [],
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
  },
};
</script>

<style>
</style>