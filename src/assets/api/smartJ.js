const base = 'http://10.10.2.104:8000/'

const apiCamp = {
    getPassData: '../static/smartJ-Json/pass.json', // 获取智能出入的数据
    getRealTimeData: '../static/smartJ-Json/realTimeInformation.json', // 获取实时数据
    getElectricityData: '../static/smartJ-Json/electricityConsumption.json', //获取各楼宇用电情况
    getTemperatureHumidityData: '../static/smartJ-Json/temperatureHumidity.json', //获取室内温湿度情况
    getMonitoringData: '../static/smartJ-Json/monitoringInformation.json' //获取监控信息
}

export default apiCamp