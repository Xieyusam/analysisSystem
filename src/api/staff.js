import axios from "../util/axios";
// 所有
export function AllStaff() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/staff/all")
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
export function delStaff(param) {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/staff/del/"+param.id)
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