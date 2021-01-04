<template>
  <div id="data-export">
    <el-radio-group v-model="tabPosition" style="margin-left: 20px;">
      <el-radio-button label="0">客户数据导入</el-radio-button>
      <el-radio-button label="1">产品数据导入</el-radio-button>
      <el-radio-button label="2">人事数据导入</el-radio-button>
    </el-radio-group>
    <el-divider></el-divider>
    <div class="export-form">
      <el-form ref="form" label-width="100px" >
        <el-form-item label="导入模板下载">
          <!-- <el-input v-model="form.name"></el-input> -->
          <a v-show="tabPosition=='0'" href="../../../static/test.xlsx">客户数据导入模板.xlsx</a>
          <a v-show="tabPosition=='1'" href="../../../static/test.xlsx">产品数据导入模板.xlsx</a>
          <a v-show="tabPosition=='2'" href="../../../static/test.xlsx">人事数据导入模板.xlsx</a>
          <!-- <span @click="downTemXlsx">客户数据导入模板.xlsx</span> -->
        </el-form-item>
        <el-form-item label="导入人">
          <span>{{username}}</span>
        </el-form-item>
        <!-- <el-form-item label="导入时间">
          <span>2020.12.19 21:58</span>
        </el-form-item> -->
        <el-form-item label="选择文件">
          <!-- <span>文件</span> -->
          <vue-xlsx-table @on-select-file="handleSelectedFile">选择文件</vue-xlsx-table>
        </el-form-item>
        <el-form-item label="导入数量">
          <span>{{dataCount}}</span>
        </el-form-item>
        <el-form-item label="解析结果">
          <span>{{result}}</span>
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
export default {
  data() {
    return {
      tabPosition: "0",
      username:'',
      dataCount:0,
      result:'请上传文件',
      initData:[],
      newData:[]
    };
  },
  mounted(){
    this.username = localData('get','userinfo').name
  },
  methods:{
    handleSelectedFile(data){
      console.log(data)
      if(this.tabPosition == '0') {
        console.log('处理客户数据')
        this.dueToCumData(data.body)

      }
      else if(this.tabPosition == '1') {
        console.log('处理产品数据')
        this.dueToProData(data.body)
      }
      else if(this.tabPosition == '2') {
        console.log('处理人事数据')
        this.dueToStaData(data.body)
      }
    },
    downTemXlsx(){
      Window.loaction.href = "../../static/test.xlsx"
    },
    timeStamp(time) {
      // 转换为时间戳
      const timeVal = new Date(time).getTime()
      return timeVal
    },
    //excel数据处理（客户）
    dueToCumData(data) {
        this.newdata = data.map(item =>{
        const newValue = {
          name:item.客户名称,
          industry:item.行业,
          register_year:parseInt(item.公司注册年份) ,
          register_capital:parseInt(item.公司注册资金),
          start_date:this.timeStamp(item.开始合作时间),
          over_date:item.停止合作时间 ? this.timeStamp(item.停止合作时间) : null
        }
        return newValue
      })
      this.dataCount = this.newdata.length
      this.result = '解析成功'
      console.log(this.newdata)
    },
    //excel数据处理（产品）
    dueToProData(data) {
        this.newdata = data.map(item =>{
        const newValue = {
          name:item.产品名称,
          trans_date :this.timeStamp(item.产品交易日期),
          type:item.产品类型 ,
          amount:item.产品交易金额,
          cout:item.产品交易数量,
        }
        return newValue
      })
      this.dataCount = this.newdata.length
      this.result = '解析成功'
      console.log(this.newdata)
    },
    //excel数据处理（人事）
    dueToStaData(data) {
      // console.log(data,'')
      this.newdata = data.map(item =>{
        const newValue = {
          name:item.员工姓名,
          sex :item.性别 == '男' ? 0 : 1,
          birthday:this.timeStamp(item.出生日期) ,
          home:item.户籍,
          department:item.部门 ,
          salary:item.工资 ,
          initday:this.timeStamp(item.入职日期)
        }
        return newValue
      })
      this.dataCount = this.newdata.length
      this.result = '解析成功'
      console.log(this.newdata)
    },
    onSubmit(){

    },
    // 重置
    reset() {
      this.dataCount = 0
      this.result = '请上传文件'
      this.initData = []
      this.newData = []
    }
  }
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
</style>