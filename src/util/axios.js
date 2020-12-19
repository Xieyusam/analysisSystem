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
      config.headers.token = cookieData("get", "token");
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
    if (response.data.status == 401) {
      Message.error({
        background: true,
        content: "登录过期",
        duration: 10,
        closable: true
      });
      cookieData("clean", "token"); // 清除token
      window.location.replace("http://aiot.ctjt.cn/#/login"); // 重定向路由地址
    }

    if (response.data.status == 500) {
      Message.error({
        background: true,
        content: response.data.msg,
        duration: 10,
        closable: true
      });
    }
    return response.data;
  },

  function (error) {
    MessageTip.instance(error.response.status);
    return Promise.reject(error);
  }
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
          if (res.status == 200 || res.status == 403) {
            resolve(res);
          } else if (res.status != 401 && res.status < 500) {
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
          } else if (res.status >= 500) {
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch(error => {
          Message.error({
            background: true,
            content: "网络错误",
            duration: 10,
            closable: true
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
          if (res.status == 200) {
            resolve(res);
          } else if (res.status != 500) {
            Message.error({
              background: true,
              content: res.msg,
              duration: 10,
              closable: true
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
