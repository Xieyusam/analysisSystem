<template>
  <div class="pageBox">
    <div class="box-card">
      <div class="card-child">
        商品总数
        <div class="num-card">{{ productNameCount }}</div>
      </div>
      <div class="card-child">
        商品类别
        <div class="num-card">{{ productTypeCount }}</div>
      </div>
      <div class="card-child">
        本月产品订单
        <div class="num-card">{{ productsMonth }}</div>
      </div>
      <div class="card-child">
        年度产品订单
        <div class="num-card">{{ productsYear }}</div>
      </div>
      <div class="card-child">
        本月订单总额
        <div class="num-card">{{ MonthMoney }}</div>
      </div>
      <div class="card-child">
        年度订单总额
        <div class="num-card">{{ YearMoney }}</div>
      </div>
    </div>
    <div class="line">
      <div class="line-title">{{typeYearChartValue}}年各类产品年度交易数量与金额柱状图</div>
    </div>
    <div class="Chart-box">
      <div id="typeYearChart" style="width: 50vw; height: 28vw"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="filterBox">
          <el-select
            v-model="typeYearChartValue"
            @change="typeYearChartChange"
            size="medium"
            placeholder="请选择"
            style="width: 30vw"
          >
            <el-option
              v-for="item in Year"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="result-box">{{YearOrderChartResult}}</div>
      </div>
    </div>
    <div class="line">
      <div class="line-title">{{nameYearChartValue}}年单一产品的年度交易数量与金额柱状图</div>
    </div>
    <div class="Chart-box">
      <div id="nameYearChart" style="width: 50vw; height: 28vw"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="filterBox">
          <el-select
            v-model="nameYearChartValue"
            @change="nameYearChartrChange"
            size="medium"
            placeholder="请选择"
            style="width: 30vw"
          >
            <el-option
              v-for="item in Year"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="result-box">{{nameYearChartResult}}</div>
      </div>
    </div>
    <div class="line">
      <div class="line-title">{{YearOrderChartValue}}年每月产品订单与金额折线图</div>
    </div>
    <div class="Chart-box">
      <div id="YearOrderChart" style="width: 50vw; height: 28vw"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="filterBox">
          <el-select
            v-model="YearOrderChartValue"
            @change="YearOrderChartChange"
            size="medium"
            placeholder="请选择"
            style="width: 30vw"
          >
            <el-option
              v-for="item in Year"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="result-box">{{typeYearChartResult}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { AllProduct } from "@/api/product";
import {
  getAge,
  dateFormat,
  unique,
  getCurrentDateCont,
  getWorkAge,
  getCurrentDateNum,
} from "@/util/common";

export default {
  data() {
    return {
      productData: "",
      productDataTimeChange: "",
      productTypeArry: "No Data",
      productTypeCount: "No Data",
      productNameCount: "No Data",
      productNameArry: "No Data",
      productsMonth: "No Data",
      productsYear: "No Data",
      MonthMoney: "No Data",
      YearMoney: "No Data",
      Year: [
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
      ],
      YearOrderChartValue: "2021",
      nameYearChartValue: "2021",
      typeYearChartValue: "2021",
      YearOrderChartResult: "正在分析...",
      nameYearChartResult: "正在分析...",
      typeYearChartResult: "正在分析...",
    };
  },
  mounted() {
    this.getAllProduct();
  },
  methods: {
    getAllProduct() {
      AllProduct().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.productData = res.data.products;
          this.dataline(this.productData);
          this.productDataTimeChange = this.productData.map((item) => {
            item.trans_date = dateFormat(
              "YYYY-mm-dd",
              new Date(parseInt(item.trans_date))
            );
            item.created_date = dateFormat(
              "YYYY-mm-dd HH:MM",
              new Date(item.created_date)
            );
            item.updated_date = dateFormat(
              "YYYY-mm-dd HH:MM",
              new Date(item.updated_date)
            );
            return item;
          });
          // console.log(this.productDataTimeChange)
          this.typeYearData(
            this.productDataTimeChange,
            this.productTypeArry,
            this.typeYearChartValue
          );
          this.nameYearData(
            this.productDataTimeChange,
            this.productNameArry,
            this.nameYearChartValue
          );
          this.YearOrderData(
            this.productDataTimeChange,
            this.YearOrderChartValue
          );
        }
      });
    },
    dataline(data) {
      // 数据栏数据处理
      this.productNameArry = unique(data.map((item) => item.name));
      this.productNameCount = this.productNameArry.length;
      this.productTypeArry = unique(data.map((item) => item.type));
      this.productTypeCount = this.productTypeArry.length;
      let transDateArr = data.map((item) => parseInt(item.trans_date));
      this.productsMonth = getCurrentDateCont(transDateArr, "YYYY-mm");
      this.productsYear = getCurrentDateCont(transDateArr, "YYYY");
      let numArray = data.map((item) => {
        return {
          selectTime: parseInt(item.trans_date),
          selectNum: parseInt(item.amount),
        };
      });
      this.MonthMoney = getCurrentDateNum(numArray, "YYYY-mm");
      this.YearMoney = getCurrentDateNum(numArray, "YYYY");
    },
    typeYearData(data, type, year) {
      //各类产品年度交易数量与金额柱状图
      let initdata = data.filter((item) => item.trans_date.indexOf(year) != -1);
      // console.log(initdata)
      let NumArry = [];
      let MoneyArry = [];
      type.forEach((v, i, d) => {
        // console.log(v, i);
        let TypeArry = initdata.filter((item) => item.type.indexOf(v) != -1);
        let Num = TypeArry.reduce((sum, num) => {
          return sum + parseInt(num.cout);
        }, 0);
        NumArry.push(Num);
        let Money = TypeArry.reduce((sum, num) => {
          return sum + parseInt(num.amount);
        }, 0);
        MoneyArry.push(Money);
      });
      // console.log(NumArry, MoneyArry);
      this.typeYearChart(type, NumArry, MoneyArry);
      //文字分析
      let sumdata1 = NumArry.reduce((sum,num)=>{
        return sum + num
      },0)
      let sumdata2 = MoneyArry.reduce((sum,num)=>{
        return sum + num
      },0)
      let index1 = Math.max(...NumArry)
      let index2 = NumArry.indexOf(index1)
      let index3 = Math.max(...MoneyArry)
      let index4 = NumArry.indexOf(index1)
      this.YearOrderChartResult = ''
      if(sumdata1 != 0){
        this.YearOrderChartResult = this.YearOrderChartResult + this.typeYearChartValue + '年，公司各类产品年度交易总数量为'+sumdata1+',其中最畅销的一类产品是'+type[index2]+'类,共售出'+index1+'个，需要继续保持该类产品销量的同时，并推销别的产品。'
      }
      if(sumdata2 != 0){
        this.YearOrderChartResult =this.YearOrderChartResult + this.typeYearChartValue + '年公司各类产品年度交易总金额为'+sumdata2+',其中'+type[index4]+'类产品售出金额最多,共'+index3+'元。公司可在该类产品上多挖掘新的产品。'
      }
    },
    typeYearChart(type, NumArry, MoneyArry) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var typeYearChart = echarts.init(
        document.getElementById("typeYearChart")
      );
      // 绘制图表
      typeYearChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["交易数量", "交易金额"],
        },
        xAxis: [
          {
            type: "category",
            data: type,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "交易数量",
            min: 0,
            max: 50,
            // interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "交易金额",
            min: 0,
            max: 100,
            // interval: 30,
            axisLabel: {
              formatter: "{value} 万元",
            },
          },
        ],
        series: [
          {
            name: "交易数量",
            type: "bar",
            data: NumArry,
          },
          {
            name: "交易金额",
            type: "bar",
            yAxisIndex: 1,
            data: MoneyArry.map((item) => (item = item / 10000)),
          },
        ],
      });
    },
    nameYearData(data, name, year) {
      //不同产品的年度交易数量与金额柱状图
      let initdata = data.filter((item) => item.trans_date.indexOf(year) != -1);
      // console.log(initdata)
      let NumArry = [];
      let MoneyArry = [];
      name.forEach((v, i, d) => {
        // console.log(v, i);
        let TypeArry = initdata.filter((item) => item.name.indexOf(v) != -1);
        let Num = TypeArry.reduce((sum, num) => {
          return sum + parseInt(num.cout);
        }, 0);
        NumArry.push(Num);
        let Money = TypeArry.reduce((sum, num) => {
          return sum + parseInt(num.amount);
        }, 0);
        MoneyArry.push(Money);
      });
      // console.log(NumArry, MoneyArry, "name");
      this.nameYearChart(name, NumArry, MoneyArry);
      //文字分析
      let sumdata1 = NumArry.reduce((sum,num)=>{
        return sum + num
      },0)
      let sumdata2 = MoneyArry.reduce((sum,num)=>{
        return sum + num
      },0)
      let index1 = Math.max(...NumArry)
      let index2 = NumArry.indexOf(index1)
      let index3 = Math.max(...MoneyArry)
      let index4 = NumArry.indexOf(index1)
      this.nameYearChartResult = ''
      if(sumdata1 != 0){
        this.nameYearChartResult = this.nameYearChartResult + this.typeYearChartValue + '年，公司单一产品的年度交易总数量为'+sumdata1+',其中最畅销的一款产品是'+name[index2]+',共售出'+index1+'个。占总数的'+((index1/sumdata1)*100).toFixed(2)+'%。'
      }
      if(sumdata2 != 0){
        this.nameYearChartResult = this.nameYearChartResult + this.typeYearChartValue + '年公司单一产品的年度交易总金额为'+sumdata2+',其中'+name[index4]+'售出金额最多,共'+index3+'元。'
      }
    },
    nameYearChart(name, NumArry, MoneyArry) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var nameYearChart = echarts.init(
        document.getElementById("nameYearChart")
      );
      // 绘制图表
      nameYearChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["bar","pie"] },
            // restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["交易数量", "交易金额"],
        },
        xAxis: [
          {
            type: "category",
            data: name,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "交易数量",
            min: 0,
            max: 50,
            // interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "交易金额",
            min: 0,
            max: 100,
            // interval: 30,
            axisLabel: {
              formatter: "{value} 万元",
            },
          },
        ],
        series: [
          {
            name: "交易数量",
            type: "bar",
            data: NumArry,
          },
          {
            name: "交易金额",
            type: "bar",
            yAxisIndex: 1,
            data: MoneyArry.map((item) => (item = item / 10000)),
          },
        ],
      });
    },
    YearOrderData(data, year) {
      const searchYear = year;
      const initdata = data;
      // console.log(initdata);
      const month = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      const month2 = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ];
      let NumArry = [];
      let MoneyArry = [];
      month.forEach((item) => {
        // console.log(searchYear + "-" + item);

        const value = initdata.filter(
          (item1) => item1.trans_date.indexOf(searchYear + "-" + item) != -1
        );
        let num = value.length;
        let Money = value.reduce((sum, num) => {
          return sum + parseInt(num.amount);
        }, 0);
        NumArry.push(num);
        MoneyArry.push(Money);
      });
      // console.log(NumArry, MoneyArry,'YearOrderData');
      this.YearOrderChart(month2, NumArry, MoneyArry);
      //文字分析
      let sumdata1 = NumArry.reduce((sum,num)=>{
        return sum + num
      },0)
      let avgdata1 = sumdata1 / 12
      let mouthArr1 = []
      NumArry.forEach((v,i,a)=>{
        if(v>avgdata1){
          mouthArr1.push(month2[i])
        }
      })
      let sumdata2 = MoneyArry.reduce((sum,num)=>{
        return sum + num
      },0)
      let avgdata2 = sumdata2 / 12
      let mouthArr2 = []
      MoneyArry.forEach((v,i,a)=>{
        if(v>avgdata2){
          mouthArr2.push(month2[i])
        }
      })
      this.typeYearChartResult = ''
      if(sumdata1!=0){
        this.typeYearChartResult = this.typeYearChartResult +this.YearOrderChartValue+ '年，公司平均每月售出产品数量为'+avgdata1.toFixed(2)+'个，其中超过平均数的月份有'+mouthArr1.join('、')+",是产品销售的旺季。"
      }
      if(sumdata2!=0){
        this.typeYearChartResult = this.typeYearChartResult +this.YearOrderChartValue + '年，公司平均每月售出产品金额为'+avgdata2.toFixed(2)+'个，其中超过平均金额的月份有'+mouthArr2.join('、')+"。"
      }
    },
    YearOrderChart(month, NumArry, MoneyArry) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var YearOrderChart = echarts.init(
        document.getElementById("YearOrderChart")
      );
      // 绘制图表
      YearOrderChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["订单数量", "交易金额"],
        },
        xAxis: [
          {
            type: "category",
            data: month,
            // axisPointer: {
            //   type: "shadow",
            // },
            // axisTick: {
            //     alignWithLabel: false
            // }
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "订单数量",
            min: 0,
            max: 50,
            // interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "交易金额",
            min: 0,
            max: 100,
            // interval: 30,
            axisLabel: {
              formatter: "{value} 万元",
            },
          },
        ],
        series: [
          {
            name: "订单数量",
            type: "line",
            data: NumArry,
          },
          {
            name: "交易金额",
            type: "line",
            yAxisIndex: 1,
            data: MoneyArry.map((item) => (item = item / 10000)),
          },
        ],
      });
    },
    typeYearChartChange() {
      this.typeYearData(
        this.productDataTimeChange,
        this.productTypeArry,
        this.typeYearChartValue
      );
    },
    nameYearChartrChange() {
      this.nameYearData(
        this.productDataTimeChange,
        this.productNameArry,
        this.nameYearChartValue
      );
    },
    YearOrderChartChange() {
      this.YearOrderData(this.productDataTimeChange, this.YearOrderChartValue);
    },
  },
};
</script>

<style scoped>
.pageBox {
  width: 100%;
  /* min-height: 300px; */
  height: 100%;
}
.box-card {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
}
.card-child {
  width: 13vw;
  height: 2.4vw;
  text-align: center;
  border-top-right-radius: 50em;
  border-bottom-right-radius: 50em;
  font-size: 1vw;
  border-left: 4px solid #545c64;
  background-color: #545c641a;
  line-height: 2.4vw;
  padding: 6px 6px 6px 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.num-card {
  height: 100%;
  padding: 0 10px;
  min-width: 1.4vw;
  border-radius: 50em;
  color: #ffffff;
  background-color: #545c64;
}
.line {
  border-top: 1px solid #545c64;
  min-height: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}
.line-title {
  color: #ffffff;
  /* border-left:1px solid #545c64 ; */
  background-color: #545c64;
  border-bottom-right-radius: 20px;
  min-width: 30px;
  padding: 4px 20px 4px 4px;
  margin-top: -1px;
}
.Chart-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.result-box {
  margin-top: 2vh;
  width: 30vw;
  height: 18vw;
  background: #545c641a;
  border-radius: 8px;
  padding: 8px;
  font-size: 1.2vw;
  line-height: 3vw;
}
</style>