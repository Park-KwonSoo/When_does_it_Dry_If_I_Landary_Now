const calculate = require('../../util/Calculate');
const getHumidity = require('../../util/GetHumidity');
const getLocation = require('../../util/GetLocation');
const getTemperature = require('../../util/GetTemperature');

exports.whenDry = async(ctx) => {
    try {

        const result = await getTemperature.getTemperatureNow();
        ctx.body = result;

    }   catch(e) {
        return ctx.throw(500, e);   
    }
};