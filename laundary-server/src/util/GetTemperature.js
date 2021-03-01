const request = require('request');

exports.getTemperatureNow = async function() {
    const { date, hours } = getNowTime();
    const result = await getAPI("getVilageFcst", date, hours);

    const { item } = result.response.body.items;

    return item;
}

exports.getTemperatureInADay = async function() {
    const { date, hours } = getNowTime();
}

/**
 * @param {*} URL 
 * @초단기실황조회 : getUltraSrtNcst
 * @초단기예보조회 : getUltraSrtFcst
 * @동네예보조회 : getVilageFcst
 */ 
const getAPI = function(URL, date, hours) {
    const { SERVICE_KEY } = process.env;

    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/' + URL;
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + SERVICE_KEY;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(date);
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours);
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('62');
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('120');

    return new Promise((resolve) => {
        request({ 
            url : url + queryParams,
            method : 'GET'
        }, function(error, response, body) {
            resolve(JSON.parse(body));
        })
    });
}

const getNowTime = function() {
    const nowDate = new Date();

    const year = String(nowDate.getFullYear());
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDay();
    let hours = nowDate.getHours();

    let date = year;

    if(month < 10)
        month = '0' + String(month);
    
    if(day < 10) 
        day = '0' + String(day);

    if(hours < 10)
        hours = '0' + String(hours)

    date += String(month) + String(day);
    hours += '00';

    return {
        date,
        hours
    };
}