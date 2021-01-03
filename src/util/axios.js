import {
  cookieData
} from "@/util/local";
import axios from "axios";

// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 查找cookie有没有token ，有则添加token请求头
    if (cookieData("get", "token")) {
      config.headers.authorization = cookieData("get", "token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    // console.log(response,'response')
    if (response.data.code == 401) {
      this.$message({
        showClose: true,
        message: '登录过期',
        type: 'warning'
      });
      cookieData("clean", "token"); // 清除token
      window.location.replace("http://localhost:8080/#/login"); // 重定向路由地址
    }
    // if (response.data.code == 500) {
    //   this.$message({
    //     showClose: true,
    //     message: '',
    //     type: 'warning'
    //   });
    // }
    return response.data;
  },
);

//get请求
export default {
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
          method: "get",
          url,
          params: param
        })
        .then(res => {
          if (res.code == 200 || res.code == 403) {
            resolve(res);
          } else if (res.code != 401 && res.code < 500) {
            reject(res);
            // Message.error({
            //   background: true,
            //   content: res.msg,
            //   duration: 10,
            //   closable: true
            // });
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
          } else if (res.code >= 500) {
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch(error => {
          // Message.error({
          //   background: true,
          //   content: "网络错误",
          //   duration: 10,
          //   closable: true
          // });
          this.$message({
            showClose: true,
            message: '网络错误',
            type: 'error'
          });
          reject(error);
        });
    });
  },
  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
          method: "post",
          url,
          data: param,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          if (res.code == 200) {
            resolve(res);
          } else if (res.code != 500) {
            // Message.error({
            //   background: true,
            //   content: res.msg,
            //   duration: 10,
            //   closable: true
            // });
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
            reject(res);
          } else {
            reject(res);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
