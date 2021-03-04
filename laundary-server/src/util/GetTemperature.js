const API = require('./GetAPI');

//지금 현재의 기온을 받아옴
exports.getTemperatureNow = async function(Object) {
    const { nx, ny } = Object;

    const result = await API.getAPI("getUltraSrtNcst", nx, ny);
    const { item } = result.response.body.items;

    //현재 아이템 중에서 T1H(기온)을 가져온다
    const temperature = item.filter(function(element){
        return element.category === 'T1H'
    });

    const obsrValue = {};
    temperature.forEach(function(value){
        obsrValue[value.baseTime] = value.obsrValue;
    });

    return obsrValue;
}


//미래의 기온을 받아옴
exports.getTemperatureForecastSrt = async function(Object) {
    const { nx, ny } = Object;

    const result = await API.getAPI('getUltraSrtFcst', nx, ny);
    const { item } = result.response.body.items;

    const temperature = item.filter(function(element){
        return element.category === 'T1H'
    });

    const fcstValue = {};

    temperature.forEach(function(value){
        fcstValue[value.fcstTime] = value.fcstValue;
    });

    return fcstValue;
}


exports.getTemperatureForecastVilage = async function(Object) {
    const { nx, ny } = Object;

    const result = await API.getAPI('getVilageFcst', nx, ny);
    const { item } = result.response.body.items;

    const temperature = item.filter(function(element){
        return element.category === 'T3H'
    });

    const fcstValue = {};

    temperature.forEach(function(value){
        fcstValue[value.fcstDate] = []
    });

    temperature.forEach(function(value){
        fcstValue[value.fcstDate].push({
            'fcstTime' : value.fcstTime,
            'fcstValue' : value.fcstValue
        })
    });

    return fcstValue;
}