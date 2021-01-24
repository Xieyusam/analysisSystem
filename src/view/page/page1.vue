<template>
  <div class="pageBox">
    <el-carousel height="65vh" class="carousel-box">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.src" alt="" style="width: 100%; height: 100%" />
      </el-carousel-item>
    </el-carousel>
    <div class="index-box">
      <div @click="gotopage('page2')" class="innerbox1">
        <i class="iconfont iconicon1"></i>客户数据分析
      </div>
      <div @click="gotopage('page4')" class="innerbox1">
        <i class="iconfont iconrenshiguanli"></i>人事数据分析
      </div>
      <div @click="gotopage('page3')" class="innerbox1">
        <i class="iconfont iconbumen"></i>产品数据分析
      </div>
      <div @click="gotopage('page6')" class="innerbox1"><i class="el-icon-document-add"></i>数据列表</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [
        {
          src: require("../../assets/banner7.jpg"),
        },
        {
          src: require("../../assets/banner8.jpg"),
        },
        {
          src: require("../../assets/banner2.jpg"),
        },
        {
          src: require("../../assets/banner4.jpg"),
        },
        {
          src: require("../../assets/banner6.jpg"),
        },
      ],
    };
  },
  methods: {
    gotopage(page) {
      this.$router.push({ path: "/" + page });
    },
  },
};
</script>

<style scoped>
.pageBox {
  width: 100%;
  /* min-height: 300px; */
  height: 100%;
  /* background-color: #545c64;
margin: -40px;
  margin-bottom: 0; */
}
.index-box {
  height: 10vw;
  width: 70vw;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: #545c64; */
  margin-top: 1vw;
}
.innerbox1 {
  background-color: #545c64;
  height: 10vw;
  width: 10vw;
  /* line-height:10vw ; */
  border-radius: 20px;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}
.innerbox1:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  color: #b1aeae;
}
.innerbox1 > i {
  font-size: 5vw;
}
.carousel-box {
  margin: -40px;
  margin-bottom: 0;
}
</style>