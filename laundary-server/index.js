const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./src/api');

require('dotenv').config();

const app = new Koa();
const router = new Router();

const { SERVER_PORT } = process.env;

app.use(bodyParser());
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
    console.log("Connected to Port " + SERVER_PORT);
});

