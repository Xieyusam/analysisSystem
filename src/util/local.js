
// local操作
const localData = function(method, name, obj) {
    /*
     * 参数说明：
     * method：get获取，set存入或覆盖，clean清除
     * name:localStorage的名称
     * obj:存入的内容，可以是任意类型
     * localStorage.getItem(key):获取指定key本地存储的值
     * localStorage.setItem(key,value)：将value存储到key字段
     * localStorage.removeItem(key):删除指定key本地存储的值
     * */
    switch (method) {
      case "get":
        if (localStorage.getItem(name + "_obj")) {
          return JSON.parse(localStorage.getItem(name + "_obj"));
        } else if (localStorage.getItem(name + "_str")) {
          return localStorage.getItem(name + "_str");
        } else {
          return null;
        }
      case "set":
        localData("clean", name);
        if (typeof obj == "object") {
          localStorage.setItem(name + "_obj", JSON.stringify(obj));
        } else {
          localStorage.setItem(name + "_str", obj);
        }
        return true;
      case "clean":
        localStorage.removeItem(name + "_obj");
        localStorage.removeItem(name + "_str");
        return true;
    }
  };
  
  // session操作
  const sessionData = function(method, name, obj) {
    /*
     * 参数说明：
     * method：get获取，set存入或覆盖，clean清除
     * name:session的名称
     * obj:存入的内容，可以是任意类型
     * */
    switch (method) {
      case "get":
        if (sessionStorage.getItem(name + "_obj")) {
          return JSON.parse(sessionStorage.getItem(name + "_obj"));
        } else if (sessionStorage.getItem(name + "_str")) {
          return sessionStorage.getItem(name + "_str");
        } else {
          return null;
        }
      case "set":
        sessionData("clean", name);
        if (typeof obj == "object") {
          sessionStorage.setItem(name + "_obj", JSON.stringify(obj));
        } else {
          sessionStorage.setItem(name + "_str", obj);
        }
        return true;
      case "clean":
        sessionStorage.removeItem(name + "_obj");
        sessionStorage.removeItem(name + "_str");
        return true;
    }
  };
  
  // session操作
  const cookieData = function(method, name, obj, t) {
    if (method === "set") {
      setCookie(name, obj, t);
    } else if (method === "get") {
      return getCookie(name);
    } else if (method === "clean") {
      removeCookie(name);
    }
  };
  
  // 设置cookie
  function setCookie(key, value, t) {
    var oDate = new Date(); //创建日期对象
    oDate.setDate(oDate.getDate() + t); //设置过期时间
  
    document.cookie =
      key + "=" + JSON.stringify(value) + ";expires=" + oDate.toGMTString();
      //设置cookie的名称，数值，过期时间
  }
  
  // 获取cookie的单个数值
  function getCookie(key) {
    var arr1 = document.cookie.split("; "); 
    //将cookie按“; ”分割，数组元素为： cookie名=cookie值
    for (var i = 0; i < arr1.length; i++) {
      //分割数组里的每个元素
      var arr2 = arr1[i].split("="); //按照“=”分割
      if (arr2[0] == key) {
        return JSON.parse(arr2[1]); //返回翻译编码后的cookie值
      }
    }
  }
  // 移除cookie
  function removeCookie(key) {
    setCookie(key, "", -1); //cookie的过期时间设为昨天
  }
  
  export { localData, sessionData, cookieData };
  