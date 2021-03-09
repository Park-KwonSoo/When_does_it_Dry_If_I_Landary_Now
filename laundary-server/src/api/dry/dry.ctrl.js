const calculate = require('../../util/Calculate');
const getHumidity = require('../../util/GetHumidity');
const getLocation = require('../../util/GetLocation');
const getTemperature = require('../../util/GetTemperature');
const getWeatherAPI = require('../../util/GetWeatherAPI');

//빨래 예상 건조 시간을 출력
exports.whenDry = async(ctx) => {
    try {
        const result = await calculateTime();
        ctx.body = result;

        console.log("Calculating Complete");

    }   catch(e) {
        return ctx.throw(500, e);   
    }
};

//예상 날짜를 input으로 받고 그 시간 내에 가능한지 결과 출력
exports.canDry = async(ctx) => {
    try {
        let { Year, Month, date } = ctx.request.body;
        if(Month.length === 1)
            Month = '0'.concat(Month);
        if(date.length === 1)
            date = '0'.concat(date);

        const inputTime = new Date(Year + '-' + Month + '-' + date);

        let calTime = await calculateTime();
        if(calTime.Month.length === 1)
            calTime.Month = '0'.concat(calTime.Month);
        if(calTime.date.length === 1)
            calTime.date = '0'.concat(calTime.date);

        const isOkayTime = new Date(
            calTime.Year + '-' + calTime.Month + '-' + calTime.date
            + 'T' + calTime.Hours + ':' + calTime.Minutes
        );
        
        let result = false;
        //예상시간이 입력한 날짜보다 더 늦으면 시간안에 건조 됨
        if(isOkayTime <= inputTime)
            result = true;

        ctx.body = result;

    }   catch(e) {
        return ctx.throw(500, e);
    }
}

const calculateTime = async() => {
     //현재 위치의 (위도, 경도)를 바탕으로 nx, ny 값 구하기
     const getMyLocate = await getLocation.getLocation();
     const location = await getLocation.translateLocation(getMyLocate);
     const { nx, ny } = location;

     //기상청 API값을 각각 가져옴
     /**
      * 초단기실황
      * 초단기예보
      * 동네예보
      */
     const item_Now = await getWeatherAPI.getAPI('getUltraSrtNcst', nx, ny);
     const item_Today = await getWeatherAPI.getAPI('getUltraSrtFcst', nx, ny);
     const item_Forecast = await getWeatherAPI.getAPI('getVilageFcst', nx, ny);


     //현재 조회하는 시간의 기온 가져옴
     /*
     *   temperatureNow : 현재 기온
     *   temperatureForecastSrt : 오늘의 각 시간별 기온
     *   temperatureForecastVilage : 이틀 뒤까지의 각 3시간별 기온
     */
     const temperatureNow = await getTemperature.getTemperatureNow(item_Now);
     const temperatureToday = await getTemperature.getTemperatureForecastSrt(item_Today);
     const temperatureForecast = await getTemperature.getTemperatureForecastVilage(item_Forecast);

     const humidityNow = await getHumidity.getHumidityNow(item_Now);
     const humidityToday = await getHumidity.getHumidityForecastSrt(item_Today);
     const humidityForecast = await getHumidity.getHumidityForecastVilage(item_Forecast);

     //위에서 구한 온도, 습도를 바탕으로 빨래 건조시간 예측
     const calResult = await calculate.calculate({
         temperatureNow,
         temperatureToday,
         temperatureForecast,
         humidityNow,
         humidityToday,
         humidityForecast
     });

     // ctx.body = {
     //     'Temperature_Now' : temperatureNow,
     //     'Temperature_Today' : temperatureToday,
     //     'Temperature_Forecast' : temperatureForecast,
     //     'Humidity_Now' : humidityNow,
     //     'Humidity_Today' : humidityToday,
     //     'Humidity_Forecast' : humidityForecast,
     //     'Location' : location
     // };

     let predictTime = new Date();
     predictTime.setHours(predictTime.getHours() + calResult);

     const Year = String(predictTime.getFullYear());
     const Month = String(predictTime.getMonth() + 1);
     const date = String(predictTime.getDate());

     let Hours = String(predictTime.getHours());
     if(parseInt(Hours) < 10)
         Hours = '0'.concat(Hours);
     
     let Minutes = String(predictTime.getMinutes());
     if(parseInt(Minutes) < 10)
         Minutes = '0'.concat(Minutes);
     
     //result
     // ctx.body = {Year + '년 '
     // + Month + '월 '
     // + date + '일 '
     // + Hours + ':'
     // + Minutes;}

     return {
         Year,
         Month,
         date,
         Hours,
         Minutes
     };
};