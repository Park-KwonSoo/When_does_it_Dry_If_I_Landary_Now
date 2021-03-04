const request = require('request');

/**
 * @param {*} URL 
 * @초단기실황조회 : getUltraSrtNcst
 * @초단기예보조회 : getUltraSrtFcst
 * @동네예보조회 : getVilageFcst
 */ 
exports.getAPI = function(URL, nx, ny) {
    const { SERVICE_KEY } = process.env;
    let time;

    if(URL === 'getUltraSrtNcst')
        time = getHoursNcst();
    else if(URL === 'getUltraSrtFcst')
        time = getHoursSrtFcst();
    else
        time = getHoursVilageFcst();

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

    return new Promise((resolve) => {
        request({ 
            url : url + queryParams,
            method : 'GET'
        }, function(response, error, body) {
            resolve(JSON.parse(body));
        })
    });
}

//초단기실황
const getHoursNcst = function() {
    const nowDate = new Date();

    const year = String(nowDate.getFullYear());
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDay();
    let hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();

    if(minutes < 40)
        hours -= 1;

    let baseDate = year;
    let baseTime = null;

    if(month < 10)
        month = '0' + String(month);
    
    if(day < 10) 
        day = '0' + String(day);

    if(hours < 10)
        hours = '0' + String(hours)

    baseDate += String(month) + String(day);
    baseTime =  hours + '00';

    return {
        baseDate,
        baseTime
    };
}

//초단기예보
const getHoursSrtFcst = function() {
    const nowDate = new Date();

    const year = String(nowDate.getFullYear());
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDay();
    let hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();
    
    //45분 전에는 현재 시각으로 갱신 안되고, 1시간 전의 시간으로 갱신해야함
    if(minutes < 45)
        hours -= 1;

    let baseDate = year;
    let baseTime = null;

    if(month < 10)
        month = '0' + String(month);
  
    
    if(day < 10) 
        day = '0' + String(day);

    if(hours < 10)
        hours = '0' + String(hours)

    baseDate += String(month) + String(day);
    baseTime =  hours + '30';

    return {
        baseDate,
        baseTime
    };
}

//동네 예보
const getHoursVilageFcst = function() {
    const nowDate = new Date();

    const year = String(nowDate.getFullYear());
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDay();
    let hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();
    
    let baseDate = year;
    let baseTime = null;

    if(month < 10)
        month = '0' + String(month);
    
    if(day < 10)
        day = '0' + String(day);
    
    if(minutes >= 10)
        if(hours < 2)
            baseTime = '0000';
        else if(hours < 5)
            baseTime = '0200';
        else if(hours < 8)
            bassTime = '0500';
        else if(hours < 11)
            baseTime = '0800';
        else if(hours < 14)
            baseTime = '1100';
        else if(hours < 17)
            baseTime = '1400';
        else if(hours < 20)
            baseTime = '1700';
        else if(hours < 23)
            baseTime = '2000';
        else
            baseTime = '2300';
    else
        if(hours <= 2)
            baseTime = '0000';
        else if(hours <= 5)
            baseTime = '0200';
        else if(hours <= 8)
            bassTime = '0500';
        else if(hours <= 11)
            baseTime = '0800';
        else if(hours <= 14)
            baseTime = '1100';
        else if(hours <= 17)
            baseTime = '1400';
        else if(hours <= 20)
            baseTime = '1700';
        else
            baseTime = '2000';

    baseDate += String(month) + String(day);

    return {
        baseDate,
        baseTime
    };
}