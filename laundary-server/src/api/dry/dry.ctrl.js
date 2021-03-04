const calculate = require('../../util/Calculate');
const getHumidity = require('../../util/GetHumidity');
const getLocation = require('../../util/GetLocation');
const getTemperature = require('../../util/GetTemperature');

exports.whenDry = async(ctx) => {
    try {
        //현재 위치의 nx, ny 값
        const Object = ctx.request.body;

        //현재 조회하는 시간의 기온 가져옴
        /*
        *   temperatureNow : 현재 기온
        *   temperatureForecastSrt : 오늘의 각 시간별 기온
        *   temperatureForecastVilage : 이틀 뒤까지의 각 3시간별 기온
        */
        const temperatureNow = await getTemperature.getTemperatureNow(Object);
        const temperatureForecastSrt = await getTemperature.getTemperatureForecastSrt(Object);
        const temperatureForecastVilage = await getTemperature.getTemperatureForecastVilage(Object);

        ctx.body = {
            'SrtNcst' : temperatureNow,
            'SrtFcst' : temperatureForecastSrt,
            'VilageFcst' : temperatureForecastVilage
        };

    }   catch(e) {
        return ctx.throw(500, e);   
    }
};