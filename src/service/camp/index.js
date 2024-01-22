import { request } from "../request";

export function buildingDeviceList(campName, buildingName) {
  return request({
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // },
    url: "/smartCamp/buildingDeviceList",
    method: "post",
    data: {
      campName,
      buildingName
    }
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

export function getSelDeviceDataById(resId) {
  return request({
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // },
    url: "/smartCamp/getResourceState",
    method: "post",
    data: {
      resId
    }
  });
}

export function getGasFlowData(resId) {
  return request({
    url: "/smartCamp/getFlowData",
    method: "get",
    params: { resId }
  });
}

export function getTemperaAndHumi(campName) {
  return request({
    url: "/smartCamp/getTemperaAndHumi",
    method: "get",
    params: { campName }
  });
}

export function controlResById(resId, command) {
  return request({
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // },
    url: "/smartCamp/controlResByCom",
    method: "post",
    data: {
      resId,
      command
    }
  });
}
export function controlPlugById(resId, command) {
  return request({
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // },
    url: "/smartCamp/controlResByPlug",
    method: "post",
    data: {
      resId,
      command
    }
  });
}

export function getBtnList(campName) {
  return request({
    url: "/smartCamp/getButtonList",
    method: "get",
    params: { campName }
  });
}
