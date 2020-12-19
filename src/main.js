// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "./util/axios"
import {
  cookieData
} from "@/util/local";


Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

// 引入echarts
// import echarts from 'echarts' //引入echarts
// Vue.prototype.$echarts = echarts //引入组件


router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
  } else {
    if (cookieData("get", "token")) {
      next()
    } else {
      next("/login");
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
