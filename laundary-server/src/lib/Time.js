//초단기실황
exports.getTimesNcst = function() {
    const nowDate = new Date();

    const year = String(nowDate.getFullYear());
    let month = nowDate.getMonth() + 1;
    let date = nowDate.getDate();
    let hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();

    if(minutes < 40)
        hours -= 1;

    let baseDate = year;
    let baseTime = null;

    if(month < 10)
        month = '0' + String(month);
    
    if(date < 10) 
        date = '0' + String(date);

    if(hours < 10)
        hours = '0' + String(hours)

    baseDate += String(month) + String(date);
    baseTime =  hours + '00';

    return {
        baseDate,
        baseTime
    };
}

//초단기예보
exports.getTimesSrtFcst = function() {
    const nowDate = new Date();

    const year = String(nowDate.getFullYear());
    let month = nowDate.getMonth() + 1;
    let date = nowDate.getDate();
    let hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();
    
    //45분 전에는 현재 시각으로 갱신 안되고, 1시간 전의 시간으로 갱신해야함
    if(minutes < 45)
        hours -= 1;

    let baseDate = year;
    let baseTime = null;

    if(month < 10)
        month = '0' + String(month);
  
    
    if(date < 10) 
        date = '0' + String(date);

    if(hours < 10)
        hours = '0' + String(hours)

    baseDate += String(month) + String(date);
    baseTime =  hours + '30';

    return {
        baseDate,
        baseTime
    };
}

//동네 예보
exports.getTimesVilageFcst = function() {
    let nowDate = new Date();

    const year = String(nowDate.getFullYear());
    let month = nowDate.getMonth() + 1;
    let date = nowDate.getDate();
    let hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();
    
    let baseDate = year;
    let baseTime = null;
    
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

    if(baseTime === '0000') {
        nowDate.setHours(nowDate.getHours() - 3);
        month = nowDate.getMonth() + 1;
        date = nowDate.getDate();
        baseTime = '2300';
    }
        
    if(month < 10)
        month = '0' + String(month);

    if(date < 10)
        date = '0' + String(date);

    baseDate += String(month) + String(date);

    return {
        baseDate,
        baseTime
    };
}