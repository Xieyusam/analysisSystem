<template>
  <div class="pageBox">
        <div class="box-card">
      <div class="card-child">商品总数{{productNameCount}}</div>
      <div class="card-child">商品类别{{productTypeCount}}</div>
      <div class="card-child">本月产品订单{{productsMonth}}</div>
      <div class="card-child">年度产品订单{{productsYear}}</div>
      <div class="card-child">本月订单总额{{MonthMoney}}</div>
      <div class="card-child">年度订单总额{{YearMoney}}</div>
    </div>
        <el-divider content-position="left">各类产品年度交易数量与金额柱状图</el-divider>
        <div id="typeYearChart" style="width: 600px; height: 350px"></div>
  </div>
</template>

<script>
import { AllProduct } from "@/api/product";
import { getAge,dateFormat, unique, getCurrentDateCont,getWorkAge,getCurrentDateNum } from "@/util/common";

export default {
  data() {
    return {
      productData:'',
      productDataTimeChange:'',
      productTypeArry:'No Data',
      productTypeCount:'No Data',
      productNameCount:'No Data',
      productNameArry:'No Data',
      productsMonth:'No Data',
      productsYear:'No Data',
      MonthMoney:'No Data',
      YearMoney:'No Data',
      Year:['2021','2020','2019','2018','2017','2016','2015','2014','2013','2012',]
    };
  },
  mounted(){
    this.getAllProduct()
  },
  methods: {
    getAllProduct() {
      AllProduct().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.productData = res.data.products;
          this.dataline(this.productData)
          this.productDataTimeChange = this.productData.map(item =>{
            item.trans_date = dateFormat("YYYY-mm-dd", new Date(parseInt(item.trans_date)))
            item.created_date = dateFormat("YYYY-mm-dd HH:MM", new Date(item.created_date))
            item.updated_date = dateFormat("YYYY-mm-dd HH:MM", new Date(item.updated_date))
            return item
          })
          // console.log(this.productDataTimeChange)
          this.typeYearData(this.productDataTimeChange,this.productTypeArry,this.Year[0])
          this.nameYearData(this.productDataTimeChange,this.productNameArry,this.Year[0])
        }
      });
    },
    dataline(data) { // 数据栏数据处理
      this.productNameArry = unique(data.map(item => item.name))
      this.productNameCount = this.productNameArry.length
      this.productTypeArry = unique(data.map(item => item.type))
      this.productTypeCount = this.productTypeArry.length
      let transDateArr = data.map((item) => parseInt(item.trans_date))
      this.productsMonth = getCurrentDateCont(transDateArr,'YYYY-mm')
      this.productsYear = getCurrentDateCont(transDateArr,'YYYY')
      let numArray = data.map((item) => { 
        return {
          selectTime:parseInt(item.trans_date),
          selectNum:parseInt(item.amount)
        }
      })
      this.MonthMoney = getCurrentDateNum(numArray,'YYYY-mm')
      this.YearMoney = getCurrentDateNum(numArray,'YYYY')
    },
    typeYearData(data,type,year) { //各类产品年度交易数量与金额柱状图
      let initdata = data.filter(item => item.trans_date.indexOf(year)!= -1)
      // console.log(initdata)
      let NumArry = []
      let MoneyArry = []
      type.forEach((v,i,d) => {
        console.log(v,i)
        let TypeArry = initdata.filter(item => item.type.indexOf(v)!= -1)
        let Num = TypeArry.reduce((sum,num)=>{
          return sum + parseInt(num.cout)
        },0)
        NumArry.push(Num)
        let Money = TypeArry.reduce((sum,num)=>{
          return sum + parseInt(num.amount)
        },0)
        MoneyArry.push(Money)
      });
      console.log(NumArry,MoneyArry)
      // this.typeYearChart()
    },
    typeYearChart() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var typeYearChart = echarts.init(document.getElementById("typeYearChart"));
      // 绘制图表
      typeYearChart.setOption({
           xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    },
    {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
      });
    },
    nameYearData(data,name,year) { //不同产品的年度交易数量与金额柱状图
      let initdata = data.filter(item => item.trans_date.indexOf(year)!= -1)
      // console.log(initdata)
      let NumArry = []
      let MoneyArry = []
      name.forEach((v,i,d) => {
        console.log(v,i)
        let TypeArry = initdata.filter(item => item.name.indexOf(v)!= -1)
        let Num = TypeArry.reduce((sum,num)=>{
          return sum + parseInt(num.cout)
        },0)
        NumArry.push(Num)
        let Money = TypeArry.reduce((sum,num)=>{
          return sum + parseInt(num.amount)
        },0)
        MoneyArry.push(Money)
      });
      console.log(NumArry,MoneyArry,'name')
      // this.typeYearChart()
    },
  },
};
</script>

<style>
.pageBox {
  width: 100%;
  min-height: 300px;
}
.box-card {
  width: 98%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.card-child {
  width: 25%;
  text-align: center;
}
</style>