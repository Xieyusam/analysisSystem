import axios from "../util/axios";
// 所有记录
export function AllProduct() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/product/all")
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
export function delProduct(param) {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/product/del/"+param.id)
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