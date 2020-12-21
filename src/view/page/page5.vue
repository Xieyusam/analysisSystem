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
          <a href="../../../static/test.xlsx">客户数据导入模板.xlsx</a>
          <!-- <span @click="downTemXlsx">客户数据导入模板.xlsx</span> -->
        </el-form-item>
        <el-form-item label="导入人">
          <span>周杰伦</span>
        </el-form-item>
        <el-form-item label="导入时间">
          <span>2020.12.19 21:58</span>
        </el-form-item>
        <el-form-item label="选择文件">
          <!-- <span>文件</span> -->
          <vue-xlsx-table @on-select-file="handleSelectedFile">选择文件</vue-xlsx-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">导入到系统</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "0",
    };
  },
  methods:{
    handleSelectedFile(data){
      console.log(data)
    },
    downTemXlsx(){
      Window.loaction.href = "../../static/test.xlsx"
    },
    onSubmit(){

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