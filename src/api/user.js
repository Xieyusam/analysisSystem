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

export function UserRegister(param) {
  // 注册
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user/register", param)
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
// 修改密码
export function newPassword(param) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/newPassword", param)
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
// 重置密码
export function resetPassword(param) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/resetPassword", param)
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

// 删除用户
export function deleteUser(param) {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/user/del/"+param.id)
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