// 时间格式转换
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}
// 根据时间戳获取年龄
function getAge(birthday) {
  birthday = parseInt(birthday)
  //出生时间 毫秒
  var birthDayTime = new Date(birthday).getTime();
  //当前时间 毫秒
  var nowTime = new Date().getTime();
  //一年毫秒数(365 * 86400000 = 31536000000)
  return Math.ceil((nowTime - birthDayTime) / 31536000000);
}
// 根据时间戳获取工龄
function getWorkAge(timeValue) {
    timeValue = parseInt(timeValue)
    //出生时间 毫秒
    var DayTime = new Date(timeValue).getTime();
    //当前时间 毫秒
    var nowTime = new Date().getTime();
    //一年毫秒数(365 * 86400000 = 31536000000)
    // console.log((nowTime - birthDayTime) / 31536000000)
    // console.log(parseInt((nowTime - birthDayTime) / 31536000000),'int')
    return parseInt((nowTime - DayTime) / 31536000000);
  }
// 数组去重函数
function unique(data) {
  data = data || [];
  var a = {};
  for (var i = 0; i < data.length; i++) {
    var v = data[i];
    if (typeof (a[v]) == 'undefined') {
      a[v] = 1;
    }
  };
  data.length = 0;
  for (var i in a) {
    data[data.length] = i;
  }
  return data;
}
// 传入一组时间错，统计出处于目前当月的时间数量
function getCurrentDateCont(data,fmt){
   let getNow = new Date()
  //  console.log(getNow,66)
   getNow = dateFormat(fmt, getNow)
   let num = 0 
   data.forEach(element => {
      let time = dateFormat(fmt,new Date(element))
      // console.log(time)
      if(time.indexOf(getNow)!=-1) {
          num ++
      }
   });
    return num
}
// 传入一组数据，统计出处于某个时间某个总额数量
//Key1:selectTime
//Key2:selectNum
function getCurrentDateNum(data,fmt){
  let getNow = new Date()
 //  console.log(getNow,66)
  getNow = dateFormat(fmt, getNow)
  let num = 0 
  data.forEach(element => {
     let time = dateFormat(fmt,new Date(element.selectTime))
    //  console.log(time)
     if(time.indexOf(getNow)!=-1) {
         num  = num + element.selectNum
     }
  });
   return num
}

export {
  dateFormat,
  getAge,
  getWorkAge,
  unique,
  getCurrentDateCont,
  getCurrentDateNum
};
