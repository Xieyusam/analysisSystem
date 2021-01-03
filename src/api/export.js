import axios from "../util/axios";

export function newMoreStaff(param) {
    //  登录
    return new Promise((resolve, reject) => {
      axios
        .post("/api/staff/newMore",param)
        .then(res => {
          if (res.code == 200) {
            resolve(res);
          } else if (res.code == 500) {
            reject(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }