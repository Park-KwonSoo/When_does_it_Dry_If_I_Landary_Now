const Router = require('koa-router');
const api = new Router();

const dry = require('./dry');

api.use('/dry', dry.routes());

module.exports = api;