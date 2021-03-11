const Router = require('koa-router');
const api = new Router();

const dry = require('./dry');
const location = require('./location');

api.use('/dry', dry.routes());
api.use('/location', location.routes());

module.exports = api;