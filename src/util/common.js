function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
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

function getAge(birthday) {
    birthday = parseInt(birthday)
    //出生时间 毫秒
    var birthDayTime = new Date(birthday).getTime(); 
    //当前时间 毫秒
    var nowTime = new Date().getTime(); 
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((nowTime-birthDayTime)/31536000000);
}
// Array.prototype.unique = function(){   
//     var a = {};   
//     for(var i = 0,len = this.length;i < len;i++){   
//     var v = this[i];   
//     if(typeof a[v] == 'undefined'){   
//     a[v] = 1;   
//     }   
//     }   
//     this.length = 0;   
//     for(var p in a){   
//     this[this.length] = p;   
//     delete a[p];   
//     }   
//     return this;   
//     };  
function unique(data){  
    data = data || [];  
        var a = {};  
    for (var i=0; i<data.length; i++) {  
        var v = data[i];  
        if (typeof(a[v]) == 'undefined'){  
            a[v] = 1;  
        }  
    };  
    data.length=0;  
    for (var i in a){  
        data[data.length] = i;  
    }  
    return data;  
} 

export { dateFormat ,getAge,unique};