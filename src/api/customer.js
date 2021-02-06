import axios from "../util/axios";
// 所有记录
export function AllCustomer() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/customer/all")
      .then(res => {
        if (res.code == 200) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 删除
export function delCustomer(param) {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/customer/del/"+param.id)
      .then(res => {
        if (res.code == 200) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}