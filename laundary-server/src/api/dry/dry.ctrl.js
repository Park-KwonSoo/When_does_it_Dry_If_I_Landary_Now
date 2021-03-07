const calculate = require('../../util/Calculate');
const getHumidity = require('../../util/GetHumidity');
const getLocation = require('../../util/GetLocation');
const getTemperature = require('../../util/GetTemperature');
const getWeatherAPI = require('../../util/GetWeatherAPI');

exports.whenDry = async(ctx) => {
    try {
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

        ctx.body = calResult;

    }   catch(e) {
        return ctx.throw(500, e);   
    }
};