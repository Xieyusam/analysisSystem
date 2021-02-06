<template>
  <div>
    <div class="headerline">
    <el-tabs style="width: 500px;" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane align="center" label="导入记录管理" name="0"></el-tab-pane>
      <el-tab-pane align="center" label="客户数据管理" name="1"></el-tab-pane>
      <el-tab-pane align="center" label="产品数据管理" name="2"></el-tab-pane>
      <el-tab-pane align="center" label="人事数据管理" name="3"></el-tab-pane>
    </el-tabs>
    <el-input v-show="activeName == '0'" style="width: 200px;" size="medium" v-model="searchText0"
    placeholder="请输入导入人"></el-input>
    <el-input v-show="activeName == '1'" style="width: 200px;" size="medium" v-model="searchText1"
    placeholder="请输入客户"></el-input>
    <el-input v-show="activeName == '2'" style="width: 200px;" size="medium" v-model="searchText2"
    placeholder="请输入产品名"></el-input>
    <el-input v-show="activeName == '3'" style="width: 200px;" size="medium" v-model="searchText3"
    placeholder="请输入姓名"></el-input>
    </div>
    
    <!-- 记录管理 -->
    <el-table
      v-show="activeName == '0'"
      :data="recordData.filter(item => item.user_name.indexOf(searchText0)!= -1)"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="user_name" align="center" label="导入人">
      </el-table-column>
      <el-table-column prop="type" align="center" label="数据类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeChange }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="record_count" align="center" label="条数">
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
            @click="delRecordById(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 客户数据 -->
    <el-table
      v-show="activeName == '1'"
      :data="customerData.filter(item => item.name.indexOf(searchText1)!= -1)"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" align="center" label="客户">
      </el-table-column>
      <el-table-column prop="industry" align="center" label="行业">
      </el-table-column>
      <el-table-column prop="register_year" align="center" label="注册年份">
      </el-table-column>
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
      <el-table-column prop="over_date" align="center" label="结束合作日期">
        <template slot-scope="scope">
          <span v-if="scope.row.over_date">{{
            parseInt(scope.row.over_date) | timeStampYmd
          }}</span>
          <span v-if="!scope.row.over_date">未结束合作关系</span>
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
            @click="delCustomerById(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 产品数据 -->
    <el-table
      v-show="activeName == '2'"
      :data="productData.filter(item => item.name.indexOf(searchText2)!= -1)"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" align="center" label="产品名">
      </el-table-column>
      <el-table-column prop="type" align="center" label="类型">
      </el-table-column>
      <el-table-column prop="amount" align="center" label="交易金额">
      </el-table-column>
      <el-table-column prop="cout" align="center" label="交易数量">
      </el-table-column>
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
            @click="delProductById(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 人事管理 -->
    <el-table
      v-show="activeName == '3'"
      :data="staffData.filter(item => item.name.indexOf(searchText3)!= -1)"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" align="center" label="姓名">
      </el-table-column>
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
      <el-table-column prop="home" align="center" label="籍贯">
      </el-table-column>
      <el-table-column prop="department" align="center" label="部门">
      </el-table-column>
      <el-table-column prop="salary" align="center" label="工资">
      </el-table-column>
      <el-table-column prop="initday" align="center" label="入职日期">
        <template slot-scope="scope">
          <span>{{ parseInt(scope.row.initday) | timeStampYmd }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="overday" align="center" label="离职日期">
        <template slot-scope="scope">
          <span v-show="scope.row.overday">{{
            parseInt(scope.row.overday) | timeStampYmd
          }}</span>
          <span v-show="!scope.row.overday">在职</span>
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
            @click="delStaffById(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { AllRecord, DelRecord } from "@/api/record";
import { AllCustomer,delCustomer } from "@/api/customer";
import { AllStaff,delStaff } from "@/api/staff";
import { AllProduct,delProduct } from "@/api/product";
import { dateFormat } from "@/util/common";
export default {
  data() {
    return {
      recordData: [],
      customerData: [],
      productData: [],
      staffData: [],
      activeName: "0",
      searchText0:"",
      searchText1:"",
      searchText2:"",
      searchText3:"",
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
    delRecordById(index, row) {
      const param = {
        recordId: row.id,
        type: row.type,
      };
      DelRecord(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "记录及其相关数据删除成功",
              type: "success",
            });
            this.getAllRecord()
          }
        })
        .catch((err) => {
          this.$message({
            message: err+"，请联系管理员",
            type: "error",
          });
        });
    },
    delStaffById(index, row){
      const param = {
        id: row.id
      };
      delStaff(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "数据删除成功",
              type: "success",
            });
            this.getAllStaff()
          }
        })
        .catch((err) => {
          this.$message({
            message: err+"，请联系管理员",
            type: "error",
          });
        });

    },
    delCustomerById(index, row){
      const param = {
        id: row.id
      };
      delCustomer(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "数据删除成功",
              type: "success",
            });
            this.getAllCustomer()
          }
        })
        .catch((err) => {
          this.$message({
            message: err+"，请联系管理员",
            type: "error",
          });
        });
    },
    delProductById(index, row){
      const param = {
        id: row.id
      };
      delProduct(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "数据删除成功",
              type: "success",
            });
            this.getAllProduct()
          }
        })
        .catch((err) => {
          this.$message({
            message: err+"，请联系管理员",
            type: "error",
          });
        });

    }
  },
};
</script>

<style>
.headerline{
  display: flex;
  justify-content: space-between;
}
</style>