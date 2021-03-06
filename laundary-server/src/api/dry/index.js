const Router = require('koa-router');

const dry = new Router();
const dryCtrl = require('./dry.ctrl');

dry.get('/whendry', dryCtrl.whenDry);

module.exports = dry;