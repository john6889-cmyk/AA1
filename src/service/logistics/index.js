//物流页面接口
import { request } from "../request";
export function logisticsOptions() {
  return request({
    url: "/smartCamp/getOrderList",
    method: "get"
  });
}

export function orderDetailInfo(order) {
  return request({
    url: "/smartCamp/getOrderDetail",
    method: "get",
    params: {
      order
    }
  });
}

export function campList() {
  return request({
    url: "/smartCamp/getCampList",
    method: "get"
  });
}

//获取营区温湿度
export function getTemperaAndHumi(campName) {
  return request({
    url: "/smartCamp/getTemperaAndHumi",
    method: "get",
    params: { campName }
  });
}

export function cameraDeviceList(campName, buildingName) {
  return request({
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // },
    url: "/smartCamp/cameraDeviceList",
    method: "post",
    data: {
      campName,
      buildingName
    }
  });
}
