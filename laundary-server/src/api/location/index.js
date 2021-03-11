const Router = require('koa-router');

const location = new Router();
const locationCtrl = require('./location.ctrl');

location.post('/getmylocate', locationCtrl.getMyLocate);

module.exports = location;