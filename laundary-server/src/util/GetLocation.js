const axios = require('axios');
/**
 *  네이버 Map API를 통해 좌표를 실제 주소로 변환
 */
exports.getRealLocation = async function(object) {
    const { lon, lat } = object;

    const { CLIENT_ID, CLIENT_SECRET } = process.env;

    let url = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?";
    const coords = "coords=" + lon + "," + lat;
    const output = "output=json";

    const config = {
        headers : {
            "X-NCP-APIGW-API-KEY-ID" : CLIENT_ID,
            "X-NCP-APIGW-API-KEY" : CLIENT_SECRET
        }
    };
    
    url += coords + '&' + output;
    
    const result = await axios.get(url, config);

    return result.data;
}

exports.translateLocation = function(object) {
    const { lon, lat } = object;

    return transform(lon, lat);
}


/*
*   lon : 경도
*   lat : 위도
*   lon, lat -> nx, ny
*/
const transform = function(lon, lat) {
    const mapRe = 6371.00877;   //지도반경
    const mapGrid = 5.0;    //격자간격
    const mapSlat1 = 30.0;  //표준위도 1
    const mapSlat2 = 60.0;  //표준위도 2
    const mapOlon = 126.0;  //기준점 경도
    const mapOlat = 38.0;   //기준점 위도

    const mapXo = 210 / mapGrid;    //기준점 X좌표
    const mapYo = 675 / mapGrid;    //기준점 Y좌표

    const PI = Math.asin(1.0) * 2.0;  //Pi
    const Degrad = PI / 180.0;

    const re = mapRe / mapGrid;
    const slat1 = mapSlat1 * Degrad;
    const slat2 = mapSlat2 * Degrad;
    const olon = mapOlon * Degrad;
    const olat  = mapOlat * Degrad;

    let sn = Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    let ro = Math.tan(PI * 0.25 + olat * 0.5);
    ro = re * sf  / Math.pow(ro, sn);

    
    let ra = Math.tan(PI * 0.25 + lat * Degrad * 0.5);
    ra = re * sf / Math.pow(ra, sn);

    let theta = lon * Degrad - olon;
    if(theta > PI)  theta -= 2.0 * PI;
    if(theta < -PI) theta += 2.0 * PI;
    theta = theta * sn;


    let nx = parseFloat(ra * Math.sin(theta))  + mapXo;
    let ny = parseFloat(ro - ra * Math.cos(theta)) + mapYo;

    nx = parseInt(nx + 1.5);
    ny = parseInt(ny + 1.5);

    return {
        nx,
        ny
    };
}