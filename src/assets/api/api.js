// const base = "http://10.10.2.104:8000/";
const base = "http://192.168.140.25:789/";
const api = {
  // getMapData: "../jinternet/test.json", // 获取首页的拓扑关系数据(2.144打包部署)
  // getMapData: "../jinternet/json/test.json", // 获取首页的拓扑关系数据(部署废弃)
  getMapData: "../static/test.json", // 获取首页的拓扑关系数据(开发)
  getMapData2: "../static/test2.json",
  getOfficeMapData: "../static/office.json",
  getStorehouseMapData: "../static/storehourse.json",
  getBarracksMapData: "../static/barracks.json",
  optionsUrl: "https://js.arcgis.com/4.13/init.js" // arcgis地图引入(内网)
};

export default { api };
