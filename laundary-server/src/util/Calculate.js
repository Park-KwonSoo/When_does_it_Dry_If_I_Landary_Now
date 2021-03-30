const Time = require('../lib/Time');

exports.calculate = async function(object) {
    return await calculating(object);
}

const calculating = function(object) {
    const { temperatureNow, 
        temperatureToday, 
        temperatureForecast,
        humidityNow,
        humidityToday,
        humidityForecast
    } = object;


    //최적의 마르는 시간은 12시간이라 가정, 단위 = Hours
    let defaultDryTime = 12;

    //지금 시간의 초단기실황, 초단기에보의 온도를 받아와서 계산한다.
    const TodayTemperature = [];
    for(var key in temperatureNow) {
        TodayTemperature.push(parseFloat(temperatureNow[key]))
    };
    for(var key in temperatureToday) {
        TodayTemperature.push(parseFloat(temperatureToday[key]))
    };

    //TodayTemperature = 실황과 초단기예보의 온도값을 합친 array, 각 원소의 값은 1시간마다 측정되는 값이므로 해당 값 * (건조시간 알고리즘)을 이용하여 건조시간 에측함
    TodayTemperature.forEach(function(value) {
        if(value >= -10 && value <= 30) 
            defaultDryTime += 1 - (.0075 * value + .775);
        else if(value < -10)
            defaultDryTime += .3; 
    });

    //초단기실황, 초단기예보의 습도를 이용해 건조시간을 최단 예측
    const TodayHumidity = [];
    for(var key in humidityNow) {
        TodayHumidity.push(parseFloat(humidityNow[key]));
    }
    for(var key in humidityToday) {
        TodayHumidity.push(parseFloat(humidityToday[key]));
    }

    //TodayHumidity = 실황과 초단기예보의 습도값을 합친 array, 각 원소의 값은 1시간마다 측정되는 값이므로 해당 값 * (건조시간 알고리즘)을 적용
    TodayHumidity.forEach(function(value) {
        defaultDryTime += .0000007 * Math.pow(value, 3);
    })



    //현재 시간 + 예측 시간을 통해 건조시간을 예측한다.
    const time = Time.getTimesVilageFcst();
    
    //예측시간
    let predictTime = new Date(time.baseDate.substr(0, 4), 
    parseInt(time.baseDate.substr(4, 2)) - 1, 
    parseInt(time.baseDate.substr(6, 2)) + 1);
    predictTime.setHours(parseInt(time.baseTime.substr(0, 2)) + defaultDryTime);

    //예측 baseDate
    let predictBaseDate = String(predictTime.getFullYear());
    if(predictTime.getMonth() < 10)
        predictBaseDate += '0';
    predictBaseDate += String(predictTime.getMonth() + 1);
        
    if(predictTime.getDate() < 10)
        predictBaseDate += '0';
    predictBaseDate += String(predictTime.getDate());

    //예측 baseTime
    let predictBaseTime = String(predictTime.getHours()) + '00';
    if(predictTime.getHours() < 10)
        predictBaseTime = '0'.concat(predictBaseTime);

    

    //temperatureForecast = 3시간마다 갱신되는 온도이므로 3을 곱해줘서 계산한다. 예측 기간을 초단기예보를 통해 예측한다.
    //temperatureForecastValue : 예측 시간 이전의 동네 예보의 기온값들을 순서대로 모두 저장함.
    const temperatureForecastValue = [];
    for(var key in temperatureForecast) {
        if(parseInt(key) < parseInt(predictBaseDate)) {
            temperatureForecast[key].filter(function(element) {
                temperatureForecastValue.push(parseFloat(element.fcstValue));
            })
        }   else if(parseInt(key) === parseInt(predictBaseDate)) {
            temperatureForecast[key].filter(function(element) {
                if(parseInt(element.fcstTime) <= parseInt(predictBaseTime)) 
                    temperatureForecastValue.push(parseInt(element.fcstValue));
            })
        }
    };

    temperatureForecastValue.forEach(function(value) {
        if(value >= -10 && value <= 30)
            defaultDryTime += 3 * (1 - (.0075 * value + .775));
        else if(value < -10)
            defaultDryTime += 3 * .3; 
    });


    //humidityForecastValue = 동네예보 습도의 값을 저장한다.
    const humidityForecastValue = [];
    for(var key in humidityForecast) {
        if(parseInt(key) < parseInt(predictBaseDate)) {
            humidityForecast[key].filter(function(element) {
                humidityForecastValue.push(parseFloat(element.fcstValue));
            })
        }   else if(parseInt(key) === parseInt(predictBaseDate)) {
            humidityForecast[key].filter(function(element) {
                if(parseInt(element.fcstTime) <= parseInt(predictBaseTime)) {
                    humidityForecastValue.push(parseFloat(element.fcstValue));
                }
            })
        }
    }

    humidityForecastValue.forEach(function(value) {
        defaultDryTime += 3 * .0000007 * Math.pow(value, 3);
    });

    console.log("예상 시간 : ", defaultDryTime);
    return parseInt(defaultDryTime);
}