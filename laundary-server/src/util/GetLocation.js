const CryptoJS = require('crypto-js');
const axios = require('axios');
const publicIP = require('public-ip');
/**
 *  GeoLocation
 *  네이버 클라우드 플랫폼을 통해 IP -> Location으로 변환
 */
exports.getLocation = async function() {
    const hostName = 'https://geolocation.apigw.ntruss.com';
    const requestUrl = '/geolocation/v2/geoLocation';

    const { ACCESS_KEY, SECRET_KEY  } = process.env;

    const timeStamp = Math.floor(+new Date).toString();

    const sortedSet = {};
    sortedSet["ip"] = await getMyIP();
    sortedSet["ext"] = "t";
    sortedSet["responseFormatType"] = "json";

    let queryString = Object.keys(sortedSet).reduce( (prev, curr)=>{
        return prev + curr + '=' + sortedSet[curr] + '&';
    }, "");

    queryString = queryString.substr(0, queryString.length -1 );

    const baseString = requestUrl + '?' + queryString;
    const signature = makeSignature(SECRET_KEY, 'GET', baseString, timeStamp, ACCESS_KEY);

    const config = { 
        headers: {
            'x-ncp-apigw-timestamp': timeStamp,
            'x-ncp-iam-access-key' : ACCESS_KEY,
            'x-ncp-apigw-signature-v2': signature
        }
    }

    const result = await axios.get(`${hostName}${baseString}`, config);
    console.log(result.data);

    const lon = result.data.geoLocation.long;
    const { lat } = result.data.geoLocation;

    return {
        lon,
        lat
    };
}

exports.translateLocation = function(Object) {
    const { lon, lat } = Object;

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

const makeSignature = function(secretKey, method, baseString, timeStamp, accessKey) {
    const space = ' ';
    const newLine = '\n';

    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(baseString);
    hmac.update(newLine);
    hmac.update(timeStamp);
    hmac.update(newLine);
    hmac.update(accessKey);
    
    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
}

/*
*   현재 접속중인 공인 IP를 받아옴
*/
const getMyIP = async function() {
    //IPv4 주소를 받아온다.
    const result = await publicIP.v4();

    return result;
}