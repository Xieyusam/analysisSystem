<template>
  <div class="pageBox">
    <div class="box-card">
      <div class="card-child">在职人数{{onlineCout}}</div>
      <div class="card-child">部门总数{{departmentCout}}</div>
      <div class="card-child">本月入职</div>
      <div class="card-child">本月离职</div>
      </div>
    <el-divider content-position="left">各年龄段员工占比</el-divider>


  </div>
</template>

<script>
import { AllStaff } from "@/api/staff";
import { getAge,unique } from "@/util/common";
export default {
  data() {
    return {
      staffData:[],
      onlineCout:'',
      departmentCout:''
    };
  },
  mounted() {
    this.getAllStaff()
  },
  methods: {
    getAllStaff() { // 获取所有员工数据
      AllStaff().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.staffData = res.data.staffs;
          this.dataCard(this.staffData)
          this.ageAnalysis(this.staffData)
          this.SexAnalysis(this.staffData)
          this.homeAnalysis(this.staffData)
          this.departmentAnalysis(this.staffData)
          this.salaryAnalysis(this.staffData)
        }
      });
    },
    dataCard(data) { // 数据栏
      this.onlineCout = data.length
      // let department = unique( data.map(item => {
      //   return item.department
      // }))
      // // console.log(department)
      // this.departmentCout = department.length
    },
    ageAnalysis(data){ // 年龄数据
      let agedata = data.map(item => {
        const age = getAge(item.birthday)
        item.age = age
        return item
      }) 
      let ageCoutArry = [0,0,0,0,0]
      agedata.forEach(item => {
        if(item.age>=20 && item.age <30) {
          ageCoutArry[0]++
        }
        if(item.age>=30 && item.age <40) {
          ageCoutArry[1]++
        }
        if(item.age>=40 && item.age <50) {
          ageCoutArry[2]++
        }
        if(item.age>=50 && item.age <60) {
          ageCoutArry[3]++
        }
        if(item.age>=60) {
          ageCoutArry[4]++
        }
      });
      console.log(ageCoutArry)
    },
    SexAnalysis(data){ // 性别数据
      let manCout = data.filter(item => item.sex == 0 ).length
      let womanCout = data.filter(item => item.sex == 1 ).length
      console.log(manCout,womanCout)
    },
    homeAnalysis(data){ // 户籍数据
      let home = unique( data.map(item => {
        return item.home
      }))
      let homeData = []
      home.forEach((item)=>{
        homeData.push(data.filter(d => d.home == item).length) 
      })
      console.log(home,homeData)
    },
    departmentAnalysis(data){ // 部门数据
      let department = unique( data.map(item => {
        return item.department
      }))
      // console.log(department)
      this.departmentCout = department.length
      let departmentData = []
      department.forEach((item)=>{
        departmentData.push(data.filter(d => d.department == item).length) 
      })
      console.log(department,departmentData)
    },
    salaryAnalysis(data) {
      let salaryCoutArry = [0,0,0,0,0]
      data.forEach(item => {
        if( item.salary <= 4000) {
          salaryCoutArry[0]++
        }
        if(item.salary > 4000 && item.salary <= 6000) {
          salaryCoutArry[1]++
        }
        if(item.salary > 6000 && item.salary <= 8000) {
          salaryCoutArry[2]++
        }
        if(item.salary > 8000 && item.salary <= 10000) {
          salaryCoutArry[3]++
        }
        if(item.salary> 10000) {
          salaryCoutArry[4]++
        }
      });
      console.log(salaryCoutArry)
    }
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
.card-child{
  width:25%;
  text-align: center;
}
</style>