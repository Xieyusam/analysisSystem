<template>
  <div class="pageBox">
    <el-card class="box-card">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-card>

    <el-divider content-position="left">客户分析</el-divider>
    <div class="charts-box">
      <div class="charts-inner">
        <div id="myChart" style="width: 100%; height: 100%"></div>
      </div>
      <div class="res-inner">
        分析结果：<br />
        2019-2020年，湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
      </div>
    </div>

    <el-divider content-position="left">客户分析</el-divider>
    <div class="charts-box">
      <div class="charts-inner">
        <div id="myChart2" style="width: 100%; height: 100%"></div>
      </div>
      <div class="res-inner">
        分析结果：<br />
        2019-2020年，湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
      </div>
    </div>

    <el-divider content-position="left">客户分析</el-divider>
    <div class="charts-box">
      <div class="charts-inner">
        <div id="myChart3" style="width: 100%; height: 100%"></div>
      </div>
      <div class="res-inner">
        分析结果：<br />
        2019-2020年，湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
        湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人湖人
      </div>
    </div>

    <el-divider></el-divider>
  </div>
</template>

<script>
// import echarts from 'echarts'
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      value1: "",
    };
  },
  mounted() {
    this.drawLine();
    this.drawLine2();

  },
  methods: {
    drawLine() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          // text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    drawLine2() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart2 = echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart2.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
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
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
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
  min-height: 600px;
}
.box-card {
  width: 98%;
  margin: auto;
}
.charts-box {
  display: flex;
  width: 100%;
  height: 300px;
}
.charts-inner {
  width: 70%;
  height: 100%;
}
.res-inner {
  width: 30%;
  height: 100%;
}
</style>