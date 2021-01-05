import { localData, cookieData } from "../util/local";
import axios from "../util/axios";

export function UserLogin(param) {
    //  登录
    return new Promise((resolve, reject) => {
      axios
        .post("/api/login", param)
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

export function AllUser() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/AllUser")
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