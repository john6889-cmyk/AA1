import { Message } from "element-ui";
import axios from "axios";

// export const BaseUrl = "http://10.10.2.166:789/";
// export const soketUrl = "ws://10.10.2.166:789/getStatusByResIdd";

export const BaseUrl = "http://192.168.140.25:789/";
export const soketUrl = "ws://192.168.140.25:789/getStatusByResIdd";
export function request(config) {
  const instance = axios.create({
    baseURL: BaseUrl
    // baseURL: `http://${location.hostname}:5000/api/`
  });

  //请求拦截器
  instance.interceptors.request.use(config => {
    return config;
  }),
    err => {
      //请求失败
      console.log(err);
    };

  //响应拦截器
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      //响应拦截失败
      console.log(err);
      return err;
    }
  );
  //发送真正的网络请求
  return instance(config);
}
