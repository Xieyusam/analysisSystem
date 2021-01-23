<template>
  <div class="pageBox">
    <div class="box-card">
      <div class="card-child">
        客户总数
        <div class="num-card">
          {{ customerCount }}
        </div>
      </div>
      <div class="card-child">
        客户类型
        <div class="num-card">{{ customerIndustryCount }}</div>
      </div>
      <div class="card-child">
        本月新增客户
        <div class="num-card">{{ startDateMonth }}</div>
      </div>
      <div class="card-child">
        本月流失客户
        <div class="num-card">{{ OverDateMonth }}</div>
      </div>
      <div class="card-child">
        本年新增客户
        <div class="num-card">{{ startDateYear }}</div>
      </div>
      <div class="card-child">
        本年流失客户
        <div class="num-card">{{ OverDateYear }}</div>
      </div>
    </div>
    <div class="line"><div class="line-title">客户公司行业类型占比</div></div>

    <div id="typeChart" style="width: 600px; height: 350px"></div>
    <div class="line"><div class="line-title">客户公司规模占比</div></div>

    <div id="capitalChart" style="width: 600px; height: 350px"></div>
    <div class="line"><div class="line-title">客户公司注册年限占比</div></div>

    <div id="yearChart" style="width: 600px; height: 350px"></div>
    <div class="line">
      <div class="line-title">2020年客户公司数量变化折线图</div>
    </div>

    <div id="numChart" style="width: 600px; height: 350px"></div>
  </div>
</template>

<script>
import { AllCustomer } from "@/api/customer";
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
      customerData: [],
      customerDataTimeChange: [],
      customerCount: "", // 客户总数
      customerIndustryArry: "",
      customerIndustryCount: "",
      startDateMonth: "",
      OverDateMonth: "",
      startDateYear: "",
      OverDateYear: "",
      customerOnline: "",
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
    this.getAllCustomer();
  },
  methods: {
    getAllCustomer() {
      AllCustomer().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.customerData = res.data.customers;
          this.dataline(this.customerData);
          this.customerDataTimeChange = this.customerData.map((item) => {
            item.start_date = dateFormat(
              "YYYY-mm-dd",
              new Date(parseInt(item.start_date))
            );
            if (item.over_date) {
              item.over_date = dateFormat(
                "YYYY-mm-dd",
                new Date(parseInt(item.over_date))
              );
            }
            item.updated_date = dateFormat(
              "YYYY-mm-dd HH:MM",
              new Date(item.updated_date)
            );
            return item;
          });
          // console.log(this.customerDataTimeChange)
          this.customerOnline = this.customerDataTimeChange.filter(
            (item) => item.over_date == null
          );
          this.customerOver = this.customerDataTimeChange.filter(
            (item) => item.over_date != null
          );
          this.typeData(this.customerOnline, this.customerIndustryArry);
          this.capitalData(this.customerOnline);
          this.yearData(this.customerOnline, 2021); //默认2021
          this.numData(this.customerOnline, this.customerOver, this.Year[0]);
        }
      });
    },
    dataline(data) {
      this.customerCount = data.filter((item) => item.over_date == null).length;
      this.customerIndustryArry = unique(data.map((item) => item.industry));
      this.customerIndustryCount = this.customerIndustryArry.length;
      let startDateArr = data
        .filter((item) => item.over_date == null)
        .map((item) => parseInt(item.start_date));
      let OverDateArr = data
        .filter((item) => item.over_date != null)
        .map((item) => parseInt(item.over_date));
      console.log(startDateArr, "startDateArr");
      this.startDateMonth = getCurrentDateCont(startDateArr, "YYYY-mm");
      this.OverDateMonth = getCurrentDateCont(OverDateArr, "YYYY-mm");
      this.startDateYear = getCurrentDateCont(startDateArr, "YYYY");
      this.OverDateYear = getCurrentDateCont(OverDateArr, "YYYY");
    },
    typeData(online, type, year) {
      const typeArry = type;
      const onlineData = online;
      let numArray = [];
      typeArry.forEach((item) => {
        const length = onlineData.filter((item2) => item2.industry == item)
          .length;
        numArray.push(length);
      });
      console.log(typeArry, numArray);
      this.typeChart(typeArry, numArray);
    },
    typeChart(typeArry, numArray) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var typeChart = echarts.init(document.getElementById("typeChart"));
      let typeData = [];
      typeArry.forEach((v, i, a) => {
        const value = {
          value: numArray[i],
          name: typeArry[i],
        };
        typeData.push(value);
      });
      // 绘制图表
      typeChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: typeArry,
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["pie", "bar"] },
            // restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            // name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: typeData,
          },
        ],
      });
    },
    capitalData(online, year) {
      const typeArry = ["小型企业", "中小型企业", "中大型企业", "大型企业"];
      const onlineData = online;
      let numArray = [0, 0, 0, 0];
      onlineData.forEach((item) => {
        if (item.register_capital <= 500) {
          numArray[0]++;
        }
        if (item.register_capital <= 1000 && item.register_capital > 500) {
          numArray[1]++;
        }
        if (item.register_capital <= 2000 && item.register_capital > 1000) {
          numArray[2]++;
        }
        if (item.register_capital > 2000) {
          numArray[3]++;
        }
      });
      // console.log(typeArry, numArray);
      this.capitalChart(typeArry, numArray);
    },
    capitalChart(typeArry, numArray) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var capitalChart = echarts.init(document.getElementById("capitalChart"));
      let capitalData = [
        { value: numArray[0], name: typeArry[0] },
        { value: numArray[1], name: typeArry[1] },
        { value: numArray[2], name: typeArry[2] },
        { value: numArray[3], name: typeArry[3] },
      ];
      // 绘制图表
      capitalChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: typeArry,
        },
        toolbox: {
          feature: {
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            // name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: capitalData,
          },
        ],
      });
    },
    yearData(online, year) {
      const typeArry = ["2年以内", "3~5年", "5~10年", "10年以上"];
      const onlineData = online;
      let numArray = [0, 0, 0, 0];
      onlineData.forEach((item) => {
        const yearCut = year - parseInt(item.register_year);
        if (yearCut <= 2) {
          numArray[0]++;
        }
        if (yearCut <= 5 && yearCut >= 3) {
          numArray[1]++;
        }
        if (yearCut <= 10 && yearCut >= 6) {
          numArray[2]++;
        }
        if (yearCut >= 10) {
          numArray[3]++;
        }
      });
      this.yearChart(typeArry, numArray);
    },
    yearChart(typeArry, numArray) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var yearChart = echarts.init(document.getElementById("yearChart"));
      let yearData = [
        { value: numArray[0], name: typeArry[0] },
        { value: numArray[1], name: typeArry[1] },
        { value: numArray[2], name: typeArry[2] },
        { value: numArray[3], name: typeArry[3] },
      ];
      // 绘制图表
      yearChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: typeArry,
        },
        toolbox: {
          feature: {
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            // name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: yearData,
          },
        ],
      });
    },
    numData(online, over, year) {
      const YearValue = year;
      const onlineData = online;
      const overData = over;
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
      let onlineNum = [];
      let overNum = [];
      let NewNum = [];
      month.forEach((item) => {
        const length1 = onlineData.filter(
          (item2) => item2.start_date.indexOf(YearValue + "-" + item) != -1
        ).length;
        const length2 = overData.filter(
          (item2) => item2.over_date.indexOf(YearValue + "-" + item) != -1
        ).length;
        NewNum.push(length1);
        overNum.push(length2);
      });
      let onlineData2 = onlineData.map((item) => {
        item.start_year = parseInt(item.start_date.split("-")[0]);
        return item;
      });
      const onlineYearCount = onlineData2.filter(
        (item) => item.start_year < parseInt(YearValue)
      ).length;
      let onlineYearCountInit = onlineYearCount;
      NewNum.forEach((v, i, a) => {
        onlineYearCountInit = onlineYearCountInit + v - overNum[i];
        onlineNum.push(onlineYearCountInit);
      });
      console.log(onlineYearCount, onlineNum, NewNum, overNum);
      this.numChart(month2, onlineNum, NewNum, overNum);
    },
    numChart(month, onlineNum, NewNum, overNum) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var numChart = echarts.init(document.getElementById("numChart"));
      // 绘制图表
      numChart.setOption({
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
          data: ["合作客户", "新增客户", "流失客户"],
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
        yAxis: {
          type: "value",
          name: "数量",
          // min: 0,
          // max: 50,
          // interval: 50,
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "合作客户",
            type: "line",
            data: onlineNum,
          },
          {
            name: "新增客户",
            type: "line",
            data: NewNum,
          },
          {
            name: "流失客户",
            type: "line",
            data: overNum,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.pageBox {
  width: 100%;
  min-height: 300px;
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
  min-width: 20px;
  padding: 4px 20px 4px 4px;
  margin-top: -1px;
}
</style>