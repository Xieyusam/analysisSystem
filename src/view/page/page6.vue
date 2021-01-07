<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane align="center" label="导入记录管理" name="0"></el-tab-pane>
      <el-tab-pane align="center" label="客户数据管理" name="1"></el-tab-pane>
      <el-tab-pane align="center" label="产品数据管理" name="2"></el-tab-pane>
      <el-tab-pane align="center" label="人事数据管理" name="3"></el-tab-pane>
    </el-tabs>
    <!-- 记录管理 -->
    <el-table
      v-show="activeName == '0'"
      :data="recordData"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="user_name" align="center" label="导入人"> </el-table-column>
      <el-table-column prop="type" align="center" label="数据类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeChange }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="record_count" align="center" label="条数"> </el-table-column>
      <el-table-column prop="created_date" align="center" label="导入时间">
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
    <!-- 客户数据 -->
    <el-table
      v-show="activeName == '1'"
      :data="customerData"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" align="center" label="客户"> </el-table-column>
      <el-table-column prop="industry" align="center" label="行业"> </el-table-column>
      <el-table-column prop="register_year" align="center" label="注册年份"> </el-table-column>
      <el-table-column prop="register_capital" align="center" label="注册资金">
        <template slot-scope="scope">
          <span>{{ scope.row.register_capital }}万元</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_date" align="center" label="开始合作日期">
        <template slot-scope="scope">
          <span>{{ parseInt(scope.row.start_date) | timeStampYmd }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_date" align="center" label="导入时间">
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
    <!-- 产品数据 -->
    <el-table
      v-show="activeName == '2'"
      :data="productData"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" align="center" label="产品名"> </el-table-column>
      <el-table-column prop="type" align="center" label="类型"> </el-table-column>
      <el-table-column prop="amount" align="center" label="交易金额"> </el-table-column>
      <el-table-column prop="cout" align="center" label="交易数量"> </el-table-column>
      <el-table-column prop="trans_date" align="center" label="交易日期">
        <template slot-scope="scope">
          <span>{{ parseInt(scope.row.trans_date) | timeStampYmd }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="created_date" align="center" label="导入时间">
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
    <!-- 人事管理 -->
    <el-table
      v-show="activeName == '3'"
      :data="staffData"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" align="center" label="姓名"> </el-table-column>
      <el-table-column prop="sex" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == 0 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="birthday" align="center" label="出生日期">
        <template slot-scope="scope">
          <span>{{ parseInt(scope.row.birthday) | timeStampYmd }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="home" align="center" label="籍贯"> </el-table-column>
      <el-table-column prop="department" align="center" label="部门"> </el-table-column>
      <el-table-column prop="salary" align="center" label="工资"> </el-table-column>
      <el-table-column prop="initday" align="center" label="交易日期">
        <template slot-scope="scope">
          <span>{{ parseInt(scope.row.initday) | timeStampYmd }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_date" align="center" label="导入时间">
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
import { AllRecord } from "@/api/record";
import { AllCustomer } from "@/api/customer";
import { AllStaff } from "@/api/staff";
import { AllProduct } from "@/api/product";
import { dateFormat } from "@/util/common";
export default {
  data() {
    return {
      recordData: [],
      customerData: [],
      productData: [],
      staffData: [],
      activeName: "0",
    };
  },
  filters: {
    typeChange(value) {
      return value == 0 ? "客户" : value == 1 ? "产品" : "人事";
    },
    timeStamp(value) {
      const time = new Date(value);
      return dateFormat("YYYY-mm-dd HH:MM", time);
    },
    timeStampYmd(value) {
      const time = new Date(value);
      return dateFormat("YYYY-mm-dd", time);
    },
  },
  mounted() {
    this.getAllRecord();
  },
  methods: {
    handleClick() {
      if (this.activeName == "0") {
        this.getAllRecord();
      }
      if (this.activeName == "1") {
        this.getAllCustomer();
      }
      if (this.activeName == "2") {
        this.getAllProduct();
      }
      if (this.activeName == "3") {
        this.getAllStaff();
      }
    },
    getAllRecord() {
      AllRecord().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.recordData = res.data.records;
        }
      });
    },
    getAllCustomer() {
      AllCustomer().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.customerData = res.data.customers;
        }
      });
    },
    getAllProduct() {
      AllProduct().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.productData = res.data.products;
        }
      });
    },
    getAllStaff() {
      AllStaff().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.staffData = res.data.staffs;
        }
      });
    },
  },
};
</script>

<style>
</style>