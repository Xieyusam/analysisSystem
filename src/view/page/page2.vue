<template>
  <div class="pageBox">
  <div class="box-card">
      <div class="card-child">客户总数6{{  }}</div>
      <div class="card-child">本月新增客户6{{  }}</div>
      <div class="card-child">本年新增客户6{{  }}</div>
      <div class="card-child">本年流失客户6{{  }}</div>
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
  mounted() {},
  methods: {},
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