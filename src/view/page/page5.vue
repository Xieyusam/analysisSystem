<template>
  <div id="data-export">
    <el-radio-group v-model="tabPosition" style="margin-left: 20px">
      <el-radio-button label="0">客户数据导入</el-radio-button>
      <el-radio-button label="1">产品数据导入</el-radio-button>
      <el-radio-button label="2">人事数据导入</el-radio-button>
    </el-radio-group>
    <el-divider></el-divider>
    <div class="export-form">
      <el-form ref="form" label-width="100px">
        <el-form-item label="导入模板下载">
          <!-- <el-input v-model="form.name"></el-input> -->
          <a v-show="tabPosition == '0'" href="../../../static/客户模板.xlsx"
            >客户数据导入模板.xlsx</a
          >
          <a v-show="tabPosition == '1'" href="../../../static/产品模板.xlsx"
            >产品数据导入模板.xlsx</a
          >
          <a v-show="tabPosition == '2'" href="../../../static/人事模板.xlsx"
            >人事数据导入模板.xlsx</a
          >
          <!-- <span @click="downTemXlsx">客户数据导入模板.xlsx</span> -->
        </el-form-item>
        <el-form-item label="导入人">
          <span>{{ username }}</span>
        </el-form-item>
        <!-- <el-form-item label="导入时间">
          <span>2020.12.19 21:58</span>
        </el-form-item> -->
        <el-form-item label="选择文件">
          <!-- <span>文件</span> -->
          <vue-xlsx-table
            @on-select-file="handleSelectedFile"
            class="xlsx-table"
            >选择文件</vue-xlsx-table
          >
        </el-form-item>
        <el-form-item label="导入数量">
          <span>{{ dataCount }}</span>
        </el-form-item>
        <el-form-item label="解析结果">
          <span>{{ result }}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">导入到系统</el-button>
          <el-button type="danger" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { localData } from "@/util/local";
import { newMoreStaff, newMoreProduct, newMoreCustomer } from "@/api/export";
export default {
  data() {
    return {
      tabPosition: "0",
      username: "",
      dataCount: 0,
      result: "请上传文件",
      initData: [],
      newData: [],
    };
  },
  mounted() {
    this.username = localData("get", "userinfo").name;
  },
  methods: {
    handleSelectedFile(data) {
      console.log(data);
      if (this.tabPosition == "0") {
        console.log("处理客户数据");
        this.dueToCumData(data.body);
      } else if (this.tabPosition == "1") {
        console.log("处理产品数据");
        this.dueToProData(data.body);
      } else if (this.tabPosition == "2") {
        console.log("处理人事数据");
        this.dueToStaData(data.body);
      }
    },
    downTemXlsx() {
      Window.loaction.href = "../../static/test.xlsx";
    },
    timeStamp(time) {
      // 转换为时间戳
      const timeVal = new Date(time).getTime();
      return timeVal;
    },
    //excel数据处理（客户）
    dueToCumData(data) {
      this.newdata = data.map((item) => {
        const newValue = {
          name: item.客户名称,
          industry: item.行业,
          registerYear: parseInt(item.公司注册年份),
          registerCapital: parseInt(item.公司注册资金),
          startDate: this.timeStamp(item.开始合作时间).toString(),
          overDate: item.停止合作时间
            ? this.timeStamp(item.停止合作时间).toString()
            : null,
        };
        return newValue;
      });
      this.dataCount = this.newdata.length;
      this.result = "解析成功";
      console.log(this.newdata);
    },
    //excel数据处理（产品）
    dueToProData(data) {
      this.newdata = data.map((item) => {
        const newValue = {
          name: item.产品名称,
          transDate: this.timeStamp(item.产品交易日期).toString(),
          type: item.产品类型,
          amount: item.产品交易金额,
          cout: item.产品交易数量,
        };
        return newValue;
      });
      this.dataCount = this.newdata.length;
      this.result = "解析成功";
      console.log(this.newdata);
    },
    //excel数据处理（人事）
    dueToStaData(data) {
      // console.log(data,'')
      this.newdata = data.map((item) => {
        const newValue = {
          name: item.员工姓名,
          sex: item.性别 == "男" ? 0 : 1,
          birthday: this.timeStamp(item.出生日期).toString(),
          home: item.户籍,
          department: item.部门,
          salary: item.工资,
          initday: this.timeStamp(item.入职日期).toString(),
          overday: item.离职日期
            ? this.timeStamp(item.离职日期).toString()
            : null,
        };
        return newValue;
      });
      this.dataCount = this.newdata.length;
      this.result = "解析成功";
      console.log(this.newdata);
    },
    // 确认添加
    onSubmit() {
      if (this.dataCount == 0) {
        this.$message({
          message: "请上传带有数据的excel文件",
          type: "error",
        });
        return;
      }

      if (this.tabPosition == "0") {
        if (this.newdata[0].industry == undefined) {
          this.$message({
            message: "请上传客户类型的的excel文件",
            type: "error",
          });
          return;
        }
        const data = {
          userId: localData("get", "userinfo").id,
          userName: localData("get", "userinfo").name,
          type: 0,
          recordCount: this.dataCount,
          customers: this.newdata,
        };
        newMoreCustomer(data)
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "添加失败，请联系管理员",
                type: "error",
              });
            }
            this.reset();
          })
          .catch(() => {
            this.$message({
              message: "添加失败，请联系管理员",
              type: "error",
            });
          });
      }
      if (this.tabPosition == "1") {
        if (this.newdata[0].transDate == undefined) {
          this.$message({
            message: "请上传产品类型的的excel文件",
            type: "error",
          });
          return;
        }
        const data = {
          userId: localData("get", "userinfo").id,
          userName: localData("get", "userinfo").name,
          type: 1,
          recordCount: this.dataCount,
          products: this.newdata,
        };
        newMoreProduct(data)
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "添加失败，请联系管理员",
                type: "error",
              });
            }
            this.reset();
          })
          .catch(() => {
            this.$message({
              message: "添加失败，请联系管理员",
              type: "error",
            });
          });
      }
      if (this.tabPosition == "2") {
        if (this.newdata[0].department == undefined) {
          this.$message({
            message: "请上传人事类型的的excel文件",
            type: "error",
          });
          return;
        }
        const data = {
          userId: localData("get", "userinfo").id,
          userName: localData("get", "userinfo").name,
          type: 2,
          recordCount: this.dataCount,
          staffs: this.newdata,
        };
        newMoreStaff(data)
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "添加失败，请联系管理员",
                type: "error",
              });
            }
            this.reset();
          })
          .catch(() => {
            this.$message({
              message: "添加失败，请联系管理员",
              type: "error",
            });
          });
      }
    },
    // 重置
    reset() {
      this.dataCount = 0;
      this.result = "请上传文件";
      this.initData = [];
      this.newData = [];
    },
  },
};
</script>

<style>
#data-export {
  width: 100%;
  min-height: 300px;
}
.export-form {
  height: 300px;
  width: 500px;
  margin-left: 20px;
}
.xlsx-button {
  background-color: #545c64;
  border: 1px solid #545c64;
}
</style>