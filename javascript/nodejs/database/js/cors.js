/**********************************************
 * 允许跨域
 **********************************************/
const express = require('express');
const app = express();

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET");
    //让options尝试请求快速结束
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);
    else
        next();//进入下一个中间件
})

module.exports = app