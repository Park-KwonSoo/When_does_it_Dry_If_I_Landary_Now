const axios = require('axios');
const { query } = require('express');
const Time = require('../lib/Time');

/**
 * @param {*} URL 
 * @초단기실황조회 : getUltraSrtNcst
 * @초단기예보조회 : getUltraSrtFcst
 * @동네예보조회 : getVilageFcst
 */ 
exports.getAPI = async function(URL, nx, ny) {
    const { SERVICE_KEY } = process.env;
    let time;

    if(URL === 'getUltraSrtNcst')
        time = Time.getTimesNcst();
    else if(URL === 'getUltraSrtFcst')
        time = Time.getTimesSrtFcst();
    else
        time = Time.getTimesVilageFcst();

    const { baseDate, baseTime } = time;

    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/' + URL;
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + SERVICE_KEY;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(300);
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(baseDate);
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(baseTime);
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(nx)
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(ny);

    const result = await axios.get(url + queryParams);

    return result.data;
}