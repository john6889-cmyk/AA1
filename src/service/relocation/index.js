import { request } from "../request";

export function allDeviceList(params) {
  return request({
    url: "/device/list",
    method: "post",
    data: {
      ...params
    }
  });
}

export function resetDeviceList() {
  return request({
    url: "/device/reset-location",
    method: "post",
    data: {}
  });
}

export function moveDevices(params) {
  return request({
    url: "/device/move-campsite",
    method: "post",
    data: {
      ...params
    }
  });
}
