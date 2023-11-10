const express = require('express');
const app = express();
const cors = require('./cors')
const bodyParser = require('body-parser');
const upload = require('./upload');
const router = require('./routes');

// 使用bodyParser
app.use(bodyParser.json());

// 允许跨域
app.use(cors)

// 上传文件
app.use(upload)

// 使用路由，指定根节点：版本信息、附加信息等，一般不要修改
const api_info = '/api'
// 默认路由，当没有匹配到任何路由时，会执行以下中间件
app.use(api_info, router,(req, res, next) => {
    res.status(404).send('Not Found'); // 返回指定的错误信息
    next()
});

// 启动服务器
/**********************************************************
 *  运行端口监听
 *  app.listen(3000, () => {
 *      console.log('Server is running on http://localhost:3000');
 *  });
 ********************************************************** */
const host = 'localhost'
// const host = '192.168.0.102'
const port = process.env.PORT || 3000;
var server = app.listen(port, host, () => {
    // var host = server.address().address
    var port = server.address().port
    console.log(`服务已运行于：http://${host}:${port}${api_info}`);
})