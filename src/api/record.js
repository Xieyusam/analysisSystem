import { localData, cookieData } from "../util/local";
import axios from "../util/axios";
// 所有记录
export function AllRecord() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/record/all")
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