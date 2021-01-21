<template>
  <div class="pageBox">
    <div class="box-card">
      <div class="card-child">商品总数{{ productNameCount }}</div>
      <div class="card-child">商品类别{{ productTypeCount }}</div>
      <div class="card-child">本月产品订单{{ productsMonth }}</div>
      <div class="card-child">年度产品订单{{ productsYear }}</div>
      <div class="card-child">本月订单总额{{ MonthMoney }}</div>
      <div class="card-child">年度订单总额{{ YearMoney }}</div>
    </div>
    <el-divider content-position="left"
      >各类产品年度交易数量与金额柱状图</el-divider
    >
    <div id="typeYearChart" style="width: 600px; height: 350px"></div>
    <el-divider content-position="left"
      >单一产品的年度交易数量与金额柱状图</el-divider
    >
    <div id="nameYearChart" style="width: 600px; height: 350px"></div>
    <el-divider content-position="left"
      >2020年每月产品订单与金额折线图</el-divider
    >
    <div id="YearOrderChart" style="width: 600px; height: 350px"></div>
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
            this.Year[0]
          );
          this.nameYearData(
            this.productDataTimeChange,
            this.productNameArry,
            this.Year[0]
          );
          this.YearOrderData(this.productDataTimeChange, this.Year[0]);
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
      // this.typeYearChart()
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
      this.YearOrderChart(month2, NumArry, MoneyArry)
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