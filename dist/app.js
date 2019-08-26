"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();
app.use(bodyParser());
router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
