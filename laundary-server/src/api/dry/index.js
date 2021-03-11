const Router = require('koa-router');

const dry = new Router();
const dryCtrl = require('./dry.ctrl');

dry.post('/whendry', dryCtrl.whenDry);
dry.post('/candry', dryCtrl.canDry);

module.exports = dry;