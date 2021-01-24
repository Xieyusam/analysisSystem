<template>
  <div id="mainpage">
    <el-container>
      <el-header>
        <headerbox></headerbox>
      </el-header>
      <el-container >

          <el-main  id="containerbox">
            <router-view />
          </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import menubox from "@/components/menubox";
import headerbox from "@/components/headerbox";

export default {
  name: "mainpage",
  components: {
    menubox,
    headerbox,
  },
  data() {
    return {};
  },
  watch:{
   '$route':function(to,from){
// 　　　document.body.scrollTop = 0
     document.getElementById('containerbox').scrollTop = 0
   }},
  methods:{
    
  }
}
</script>

<style>
#mainpage {
  /* background-color: #94faf534; */
  height: 100vh;
  width: 100vw;
}
.el-header {
  /* background-color: #409eff; */
  color: #333;
  text-align: center;
  height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  height: 100%;
  /* height: 200px; */
}

.el-main {
  background-color: #ffffff;
  color: #333;
  /* text-align: center; */
  height: 100%;
  /* line-height: 160px; */
  padding: 40px;
}
#containerbox {
  height: calc(100vh - 60px);
  /* overflow: hidden; */
}
</style>
