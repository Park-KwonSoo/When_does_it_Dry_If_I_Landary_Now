exports.getHumidityNow = async function(Object) {
    const { item } = Object.response.body.items;

    //REH = 습도
    const humidity = item.filter(function(element){
        return element.category === 'REH'
    });

    const obsrValue = {};

    humidity.forEach(function(value){
        obsrValue[value.baseTime] = value.obsrValue;
    });

    return obsrValue;
}

exports.getHumidityForecastSrt = async function(Object) {
    const { item } = Object.response.body.items;

    const humidty = item.filter(function(element){
        return element.category === 'REH'
    });

    const fcstValue = {};

    humidty.forEach(function(value){
        fcstValue[value.fcstTime] = value.fcstValue;
    })

    return fcstValue;
}

exports.getHumidityForecastVilage = async function(Object) {
    const { item } = Object.response.body.items;

    const humidty = item.filter(function(element){
        return element.category === 'REH'
    });

    const fcstValue = {};

    humidty.forEach(function(value){
        fcstValue[value.fcstDate] = [];
    });

    humidty.forEach(function(value){
        fcstValue[value.fcstDate].push({
            'fcstTime' : value.fcstTime,
            'fcstValue' : value.fcstValue
        })
    });

    return fcstValue;
}