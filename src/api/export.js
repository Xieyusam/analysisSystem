import axios from "../util/axios";

export function newMoreStaff(param) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/staff/newMore", param)
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

export function newMoreProduct(param) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/product/newMore", param)
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

export function newMoreCustomer(param) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/customer/newMore", param)
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