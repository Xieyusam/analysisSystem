<template>
  <div class="pageBox">
    <div class="box-card">
      <div class="card-child">在职人数<div class="num-card">{{ onlineCout }}</div></div>
      <div class="card-child">部门总数<div class="num-card">{{ departmentCout }}</div></div>
      <div class="card-child">本月入职<div class="num-card">{{ nowMonthOnlineCout }}</div></div>
      <div class="card-child">本月离职<div class="num-card">{{ nowMonthOverCout }}</div></div>
      <div class="card-child">本年入职<div class="num-card">{{ nowYearOnlineCout }}</div></div>
      <div class="card-child">本年离职<div class="num-card">{{ nowYearOverCout }}</div></div>
    </div>
    <div class="line"><div class="line-title">各年龄段员工占比</div></div>
    <div class="Chart-box">
      <div id="AgeChart" style="width: 50vw; height: 28vw;"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="result-box">{{ageTextResult}}</div>
      </div>
    </div>
    <div class="line"><div class="line-title">员工工资水平占比</div></div>
    <div class="Chart-box">
      <div id="SalaryChart" style="width: 50vw; height: 28vw;"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="result-box">{{SalaryTextResult}}</div>
      </div>
    </div>
    <div class="line"><div class="line-title">员工性别占比</div></div>
    <div class="Chart-box">
      <div id="SexChart" style="width: 50vw; height: 28vw;"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="result-box">{{SexTextResult}}</div>
      </div>
    </div>

    <div class="line"><div class="line-title">员工工龄占比</div></div>
    <div class="Chart-box">
      <div id="WorkAgeChart" style="width: 50vw; height: 28vw;"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="result-box">{{WorkAgeTextResult}}</div>
      </div>
    </div>

    <div class="line"><div class="line-title">员工户籍柱状图</div></div>
    <div class="Chart-box">
      <div id="HomeChart" style="width: 50vw; height: 28vw;"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="result-box">{{HomeTextResult}}</div>
      </div>
    </div>

    <div class="line"><div class="line-title">各部门员工数量柱状图</div></div>
    <div class="Chart-box">
      <div id="DepartmentChart" style="width: 50vw; height: 28vw;"></div>
      <div class="right-box" style="width: 40vw; height: 28vw">
        <div class="result-box">{{DepartmentTextResult}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import { AllStaff } from "@/api/staff";
import { getAge, unique, getCurrentDateCont,getWorkAge } from "@/util/common";
export default {
  data() {
    return {
      staffData: [],
      onlineCout: "",
      nowMonthOverCout: "", // 本月离职
      nowMonthOnlineCout: "", // 本月入职
      staffOnlineData: "", // 在职
      staffOverData: "", // 离职
      departmentCout: "",// 部门数量
      ageTextResult:'', // 年龄分析结果
      SalaryTextResult:'',// 工资分析结果
      SexTextResult:'',// /性别分析结果
      WorkAgeTextResult:'',// 工龄分析结果
      HomeTextResult:'',// 户籍分析结果
      DepartmentTextResult:'',// 部门分析结果
      nowYearOnlineCout:"",
      nowYearOverCout:""
    };
  },
  mounted() {
    this.getAllStaff();
  },
  methods: {
    getAllStaff() {
      // 获取所有员工数据
      AllStaff().then((res) => {
        // // console.log(res);
        if (res.code == 200) {
          this.staffData = res.data.staffs;
          this.dataDue(this.staffData);
        }
      });
    },
    dataDue(data) {
      // 数据栏
      this.staffOnlineData = data.filter((item) => item.overday == null);
      this.staffOverData = data.filter((item) => item.overday != null);
      this.dataLine(this.staffOnlineData, this.staffOverData);
      this.ageAnalysis(this.staffOnlineData);
      this.SexAnalysis(this.staffOnlineData);
      this.workAgeAnalysis(this.staffOnlineData)
      this.homeAnalysis(this.staffOnlineData);
      this.departmentAnalysis(this.staffOnlineData);
      this.salaryAnalysis(this.staffOnlineData);
    },
    dataLine(OnlineData, Overdata) {
      //数据栏数据处理
      this.onlineCout = OnlineData.length; // 在职人数
      let overArr = Overdata.map((item) => parseInt(item.overday));
      this.nowMonthOverCout = getCurrentDateCont(overArr,'YYYY-mm');
      let OnlineArr = OnlineData.map((item) => parseInt(item.initday));
      this.nowMonthOnlineCout = getCurrentDateCont(OnlineArr,'YYYY-mm');
      this.nowYearOnlineCout = getCurrentDateCont(OnlineArr, "YYYY");
      this.nowYearOverCout = getCurrentDateCont(overArr, "YYYY");
    },
    workAgeAnalysis(data) {
      // 年龄数据
      let workAgedata = data.map((item) => {
        const workAge = getWorkAge(item.initday);
        item.workAge = workAge;
        return item;
      });
      let workAgeCoutArry = [0, 0, 0, 0, 0];
      workAgedata.forEach((item) => {
        if (item.workAge < 1 ) {
          workAgeCoutArry[0]++;
        }
        if (item.workAge >= 1 && item.workAge <= 2) {
          workAgeCoutArry[1]++;
        }
        if (item.workAge >= 3 && item.workAge <= 5) {
          workAgeCoutArry[2]++;
        }
        if (item.workAge >= 6 && item.workAge <= 10) {
          workAgeCoutArry[3]++;
        }
        if (item.workAge > 10) {
          workAgeCoutArry[4]++;
        }
      });
      // console.log(workAgeCoutArry);
      this.drawWorkAgeChart(workAgeCoutArry);
    },
    drawWorkAgeChart(data) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var WorkAgeChart = echarts.init(document.getElementById("WorkAgeChart"));
      let textData =  [
            "小于1年",
            "1年~2年",
            "3年~5年",
            "6年~10年",
            "10年以上",
          ]
      let WorkAgeData = [
              { value: data[0], name: "小于1年" },
              { value: data[1], name: "1年~2年" },
              { value: data[2], name: "3年~5年" },
              { value: data[3], name: "6年~10年" },
              { value: data[4], name: "10年以上" },
            ]
      // 绘制图表
      WorkAgeChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: textData,
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
            data: WorkAgeData,
          },
        ],
      });
      // 文字分析
      let index1 = Math.max(...data)
      let index2 = data.indexOf(Math.max(...data))
      this.WorkAgeTextResult = `根据数据分析，公司中工龄处于${textData[index2]}的比较多，有${index1}人；${index2 >= 2 ? '整体分析，3年以上工龄的员工比较多，人员结构稳定':'整体分析，2年以下工龄的员工比较多，人员流动性较大，可能会出现员工流失现象'}`
    },
    ageAnalysis(data) {
      // 年龄数据
      let agedata = data.map((item) => {
        const age = getAge(item.birthday);
        item.age = age;
        return item;
      });
      let ageCoutArry = [0, 0, 0, 0, 0];
      agedata.forEach((item) => {
        if (item.age >= 20 && item.age < 30) {
          ageCoutArry[0]++;
        }
        if (item.age >= 30 && item.age < 40) {
          ageCoutArry[1]++;
        }
        if (item.age >= 40 && item.age < 50) {
          ageCoutArry[2]++;
        }
        if (item.age >= 50 && item.age < 60) {
          ageCoutArry[3]++;
        }
        if (item.age >= 60) {
          ageCoutArry[4]++;
        }
      });
      // console.log(ageCoutArry);
      this.drawAgeChart(ageCoutArry);
    },
    drawAgeChart(data) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var AgeChart = echarts.init(document.getElementById("AgeChart"));
      // 绘制图表
      const textdata =  [
            "20岁~29岁",
            "30岁~39岁",
            "40岁~49岁",
            "50岁~59岁",
            "60岁以上",
          ]
      const pieData = [
        { value: data[0], name: "20岁~29岁" },
        { value: data[1], name: "30岁~39岁" },
        { value: data[2], name: "40岁~49岁" },
        { value: data[3], name: "50岁~59岁" },
        { value: data[4], name: "60岁以上" },
      ]
      AgeChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: textdata,
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
            data:pieData,
          },
        ],
      });
      // 文字分析
      let index1 = Math.max(...data)
      let index2 = data.indexOf(Math.max(...data))
      let peo1 = data[0] + data[1] + data[2]
      let peo2 = data[3] + data[4]
      this.ageTextResult = '在各年龄段中，公司 ' + textdata[index2] + 
      '年龄段的人数最多，有'+index1 +'人。以整体年龄来看39岁以下共'+peo1+'人，40岁以上共'+peo2+'人，'+(peo1 > peo2 ? '公司人员整体比较年轻充满活力' : '公司人员整体年龄较大')
    },
    SexAnalysis(data) {
      // 性别数据
      let manCout = data.filter((item) => item.sex == 0).length;
      let womanCout = data.filter((item) => item.sex == 1).length;
      // console.log(manCout, womanCout);
      this.drawSexChart(manCout,womanCout) 
    },
    drawSexChart(manCout,womanCout) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var SexChart = echarts.init(document.getElementById("SexChart"));
      // 绘制图表
      SexChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: [
            "男","女"
          ],
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
            data: [
              { value: manCout, name: "男" },
              { value: womanCout, name: "女" }
            ],
          },
        ],
      });
      this.SexTextResult = `公司总人数${this.onlineCout}，其中男性${manCout}人，女性${womanCout}人，男女比例为${(manCout/womanCout).toFixed(2)}`
    },
    homeAnalysis(data) {
      // 户籍数据
      let home = unique(
        data.map((item) => {
          return item.home;
        })
      );
      let homeData = [];
      home.forEach((item) => {
        homeData.push(data.filter((d) => d.home == item).length);
      });
      // console.log(home, homeData);
      this.drawHomeChart(home,homeData)
    },
    drawHomeChart(home,homeData) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var HomeChart = echarts.init(document.getElementById("HomeChart"));
      // 绘制图表
      HomeChart.setOption({
        title: {
        },
        tooltip: {},
        xAxis: {
          data:home,
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: homeData,
          },
        ],
      });
      let maxVal = Math.max(...homeData)
      let maxindex = homeData.indexOf(maxVal)
      let minVal = Math.min(...homeData)
      let minindex = homeData.indexOf(minVal)
      this.HomeTextResult = `经过数据分析，公司员工分别来自${homeData.length}个地区，其中${home[maxindex]}地区的人数最多，有${maxVal}人，而${home[minindex]}地区的人数较少，只有${minVal}人`
    },
    departmentAnalysis(data) {
      // 部门数据
      let department = unique(
        data.map((item) => {
          return item.department;
        })
      );
      // // console.log(department)
      this.departmentCout = department.length;
      let departmentData = [];
      department.forEach((item) => {
        departmentData.push(data.filter((d) => d.department == item).length);
      });
      // console.log(department, departmentData);
      this.drawDepartmentChart(department,departmentData)
    },
    drawDepartmentChart(department,departmentData) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var DepartmentChart = echarts.init(document.getElementById("DepartmentChart"));
      // 绘制图表
      DepartmentChart.setOption({
        title: {
          // text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data:department,
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: departmentData,
          },
        ],
      });
      let maxVal = Math.max(...departmentData)
      let maxindex = departmentData.indexOf(maxVal)
      let minVal = Math.min(...departmentData)
      let minindex = departmentData.indexOf(minVal)
      this.DepartmentTextResult = `公司员工分别有${department.length}个部门，其中${department[maxindex]}的人数最多，有${maxVal}人，而${department[minindex]}的人数较少，只有${minVal}人`
    
    },
    salaryAnalysis(data) {
      let salaryCoutArry = [0, 0, 0, 0, 0];
      data.forEach((item) => {
        if (item.salary <= 4000) {
          salaryCoutArry[0]++;
        }
        if (item.salary > 4000 && item.salary <= 6000) {
          salaryCoutArry[1]++;
        }
        if (item.salary > 6000 && item.salary <= 8000) {
          salaryCoutArry[2]++;
        }
        if (item.salary > 8000 && item.salary <= 10000) {
          salaryCoutArry[3]++;
        }
        if (item.salary > 10000) {
          salaryCoutArry[4]++;
        }
      });
      // console.log(salaryCoutArry);
      this.drawSalaryChart(salaryCoutArry);
    },
    drawSalaryChart(data) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var SalaryChart = echarts.init(document.getElementById("SalaryChart"));
      // 绘制图表
      const textData = [
            "4000元以下",
            "4001元~6000元",
            "6001元~8000元",
            "8001元~10000元",
            "10000元以上",
          ]
      const SalaryData = [
              { value: data[0], name: "4000元以下" },
              { value: data[1], name: "4001元~6000元" },
              { value: data[2], name: "6001元~8000元" },
              { value: data[3], name: "8001元~10000元" },
              { value: data[4], name: "10000元以上" },
            ]
      SalaryChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data:textData,
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
            data: SalaryData,
          },
        ],
      });
      // 文字分析
      let index1 = Math.max(...data)
      let index2 = data.indexOf(Math.max(...data))
      let peo1 = data[0] + data[1] + data[2]
      let peo2 = data[3] + data[4]
      this.SalaryTextResult = '公司内工资水平处于 ' + textData[index2] + 
      '的人数最多，有'+index1 +'人。'
    
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
  min-width: 20px;
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