<template>
  <div>
    <div class="headerline">
      <el-tabs
        style="width: 600px"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          align="center"
          :label="'导入记录管理' + num0"
          name="0"
        ></el-tab-pane>
        <el-tab-pane
          align="center"
          :label="'客户数据管理' + num1"
          name="1"
        ></el-tab-pane>
        <el-tab-pane
          align="center"
          :label="'产品数据管理' + num2"
          name="2"
        ></el-tab-pane>
        <el-tab-pane
          align="center"
          :label="'人事数据管理' + num3"
          name="3"
        ></el-tab-pane>
      </el-tabs>
      <el-input
        v-show="activeName == '0'"
        style="width: 200px"
        size="medium"
        v-model="searchText0"
        placeholder="请输入导入人"
      ></el-input>
      <el-input
        v-show="activeName == '1'"
        style="width: 200px"
        size="medium"
        v-model="searchText1"
        placeholder="请输入客户"
      ></el-input>
      <el-input
        v-show="activeName == '2'"
        style="width: 200px"
        size="medium"
        v-model="searchText2"
        placeholder="请输入产品名"
      ></el-input>
      <el-input
        v-show="activeName == '3'"
        style="width: 200px"
        size="medium"
        v-model="searchText3"
        placeholder="请输入姓名"
      ></el-input>
    </div>

    <!-- 记录管理 -->
    <el-table
      v-show="activeName == '0'"
      :data="
        recordData.filter((item) => item.user_name.indexOf(searchText0) != -1)
      "
      border=""
      style="width: 100%"
    >
      <el-table-column prop="user_name" align="center" label="导入人">
      </el-table-column>
      <el-table-column prop="type" align="center" label="数据类型">
      </el-table-column>
      <el-table-column prop="record_count" align="center" label="条数">
      </el-table-column>
      <el-table-column prop="created_date" align="center" label="导入时间">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot="header" slot-scope="scope">
          <el-button type="info" size="mini"  @click="getExportList(0)">导出Csv</el-button>
        </template>
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
      :data="
        customerData.filter((item) => item.name.indexOf(searchText1) != -1)
      "
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
      </el-table-column>
      <el-table-column prop="start_date" align="center" label="开始合作日期">
      </el-table-column>
      <el-table-column prop="over_date" align="center" label="结束合作日期">
      </el-table-column>
      <el-table-column prop="created_date" align="center" label="导入时间">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot="header" slot-scope="scope">
          <el-button type="info" size="mini"  @click="getExportList(1)">导出Csv</el-button>
        </template>
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
      :data="productData.filter((item) => item.name.indexOf(searchText2) != -1)"
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
      </el-table-column>
      <el-table-column prop="created_date" align="center" label="导入时间">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot="header" slot-scope="scope">
          <el-button type="info" size="mini"  @click="getExportList(2)">导出Csv</el-button>
        </template>
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
      :data="staffData.filter((item) => item.name.indexOf(searchText3) != -1)"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" align="center" label="姓名">
      </el-table-column>
      <el-table-column prop="sex" align="center" label="性别">
      </el-table-column>
      <el-table-column prop="birthday" align="center" label="出生日期">
      </el-table-column>
      <el-table-column prop="home" align="center" label="籍贯">
      </el-table-column>
      <el-table-column prop="department" align="center" label="部门">
      </el-table-column>
      <el-table-column prop="salary" align="center" label="工资">
      </el-table-column>
      <el-table-column prop="initday" align="center" label="入职日期">
      </el-table-column>
      <el-table-column prop="overday" align="center" label="离职日期">
      </el-table-column>
      <el-table-column prop="created_date" align="center" label="导入时间">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot="header" slot-scope="scope">
          <el-button type="info" size="mini"  @click="getExportList(3)">导出Csv</el-button>
        </template>
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
import { AllCustomer, delCustomer } from "@/api/customer";
import { AllStaff, delStaff } from "@/api/staff";
import { AllProduct, delProduct } from "@/api/product";
import { dateFormat } from "@/util/common";
export default {
  data() {
    return {
      recordData: [],
      customerData: [],
      productData: [],
      staffData: [],
      num0: 0,
      num1: 0,
      num2: 0,
      num3: 0,
      activeName: "0",
      searchText0: "",
      searchText1: "",
      searchText2: "",
      searchText3: "",
    };
  },
  mounted() {
    this.getAllRecord();
    this.getAllCustomer();
    this.getAllProduct();
    this.getAllStaff();
  },
  methods: {
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
          this.recordData = res.data.records.map((item) => {
            item.type = this.typeChange(item.type);
            item.created_date = this.timeStamp(item.created_date);
            return item;
          });
          this.num0 = this.recordData.length;
        }
      });
    },
    getAllCustomer() {
      AllCustomer().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.customerData = res.data.customers.map((item) => {
            item.register_capital = item.register_capital + "万元";
            item.start_date = this.timeStampYmd(parseInt(item.start_date));
            item.over_date = item.over_date
              ? this.timeStampYmd(parseInt(item.over_date))
              : "未结束合作关系";
            item.created_date = this.timeStamp(item.created_date);
            return item;
          });
          this.num1 = this.customerData.length;
        }
      });
    },
    getAllProduct() {
      AllProduct().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.productData = res.data.products.map((item) => {
            item.trans_date = this.timeStampYmd(parseInt(item.trans_date));
            item.created_date = this.timeStamp(item.created_date);
            return item;
          });
          this.num2 = this.productData.length;
        }
      });
    },
    getAllStaff() {
      AllStaff().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.staffData = res.data.staffs.map((item) => {
            item.sex = item.sex == 0 ? "男" : "女";
            item.birthday = this.timeStampYmd(parseInt(item.birthday));
            item.initday = this.timeStampYmd(parseInt(item.initday));
            item.overday = item.overday
              ? this.timeStampYmd(parseInt(item.overday))
              : "在职";
            item.created_date = this.timeStamp(item.created_date);
            return item;
          });
          this.num3 = this.staffData.length;
        }
      });
    },
    delRecordById(index, row) {
      let type = row.type === '客户' ? 0 : row.type === '产品' ? 1 : 2
      const param = {
        recordId: row.id,
        type: type,
      };
      DelRecord(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "记录及其相关数据删除成功",
              type: "success",
            });
            this.getAllRecord();
          }
        })
        .catch((err) => {
          this.$message({
            message: err + "，请联系管理员",
            type: "error",
          });
        });
    },
    delStaffById(index, row) {
      const param = {
        id: row.id,
      };
      delStaff(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "数据删除成功",
              type: "success",
            });
            this.getAllStaff();
          }
        })
        .catch((err) => {
          this.$message({
            message: err + "，请联系管理员",
            type: "error",
          });
        });
    },
    delCustomerById(index, row) {
      const param = {
        id: row.id,
      };
      delCustomer(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "数据删除成功",
              type: "success",
            });
            this.getAllCustomer();
          }
        })
        .catch((err) => {
          this.$message({
            message: err + "，请联系管理员",
            type: "error",
          });
        });
    },
    delProductById(index, row) {
      const param = {
        id: row.id,
      };
      delProduct(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "数据删除成功",
              type: "success",
            });
            this.getAllProduct();
          }
        })
        .catch((err) => {
          this.$message({
            message: err + "，请联系管理员",
            type: "error",
          });
        });
    },
    //导出Csv
    getExportList(type) {
      let jsonData0 = {
        title:"数据导入记录",
        trade: {
          tHeader: [
            "导入人",
            "数据类型",
            "条数",
            "导入时间"
          ],
          filterVal: [
            "user_name",
            "type",
            "record_count",
            "created_date"
          ],
          list: this.recordData
        },
      };
      let jsonData1 = {
        title:"客户数据",
        trade: {
          tHeader: [
            "客户",
            "行业",
            "注册年份",
            "注册资金",
            "开始合作日期",
            "结束合作日期",
            "导入时间"
          ],
          filterVal: [
            "name",
            "industry",
            "register_year",
            "register_capital",
            "start_date",
            "over_date",
            "created_date"
          ],
          list: this.customerData
        },
      };
      let jsonData2 = {
        title:"产品数据",
        trade: {
          tHeader: [
            "产品名",
            "类型",
            "交易金额",
            "交易数量",
            "交易日期",
            "导入时间"
          ],
          filterVal: [
            "name",
            "type",
            "amount",
            "cout",
            "trans_date",
            "created_date"
          ],
          list: this.productData
        },
      };
      let jsonData3 = {
        title:"人事数据",
        trade: {
          tHeader: [
            "姓名",
            "性别",
            "出生日期",
            "籍贯",
            "部门",
            "工资",
            "入职日期",
            "离职日期",
            "导入时间"
          ],
          filterVal: [
            "name",
            "sex",
            "birthday",
            "home",
            "department",
            "salary",
            "initday",
            "overday",
            "created_date"
          ],
          list: this.staffData
        },
      }
      if(type == 0){
        this.exportPathMethod(jsonData0); // 调用exportPathMethod对数据进行处理导出
      }
      if(type == 1){
        this.exportPathMethod(jsonData1); // 调用exportPathMethod对数据进行处理导出
      }
      if(type == 2){
        this.exportPathMethod(jsonData2); // 调用exportPathMethod对数据进行处理导出
      }
      if(type == 3){
        this.exportPathMethod(jsonData3); // 调用exportPathMethod对数据进行处理导出
      }
    },
    exportPathMethod(data) {
      /*
       *注：csv文件：","逗号换列，\n换行，\t防止excel将长数字变科学计算法等样式
       */
      //要导出的json数据
      let mainLists = data.trade; //主表
      let _self = this;
      //## 数据处理
      //一级表
      let mainTitle = mainLists.tHeader; //一级标题
      let mainTitleForKey = mainLists.filterVal; //一级过滤
      let mainList = mainLists.list; //一级数据
      let mainStr = [];
      mainStr.push(mainTitle.join("\t,") + "\n"); //标题添加上换列转成字符串并存进数组
      for (let i = 0; i < mainList.length; i++) {
        let temp = [];
        for (let j = 0; j < mainTitleForKey.length; j++) {
          temp.push(mainList[i][mainTitleForKey[j]]); //根据过滤器拿出对应的值
        }
        mainStr.push(temp.join("\t,") + "\n"); //取出来的值加上逗号换列转字符串存数组
      }
      // console.log(JSON.stringify(mainStr.join("")));//打印文本

      //两个表数组转成字符串合并
      let merged = mainStr.join("");
      //console.log(JSON.stringify(merged));//打印结果

      //## 导出操作
      // encodeURIComponent解决中文乱码
      const uri =
        "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(merged);
      // 通过创建a标签实现
      let link = document.createElement("a");
      link.href = uri;
      // 对下载的文件命名
      link.download = `${data.title}.csv`;
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>

<style>
.headerline {
  display: flex;
  justify-content: space-between;
}
</style>