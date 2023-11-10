const { createCanvas, loadImage } = require('canvas');
const express = require('express');
const app = express();

// 获取请求数据
function get_req(req) {
    console.log('方式：\t', (req.method) || '无')
    console.log('原始：\t', (req.originalUrl) || '无')
    console.log('参数：\t', (req.params) || '无')
    console.log('内容：\t', (req.body) || '无')
    console.log('路径：\t', (req.path) || '无')
    console.log('协议：\t', (req.protocol) || '无')
    console.log('查询：\t', (req.query) || '无')
    console.log('基础URL\t', (req.baseurl) || '无')
    console.log('URL：\t', (req.url) || '无')
    console.log('文件：\t', (req.file) || '无')
    console.log('状态码：\t', (req.statusCode) || '无')
    console.log('状态信息：\t', (req.statusMessage) || '无')
    console.log('状态信息：\t', (req.statusMessage) || '无')
}

/**********************************************
 * 允许跨域
 **********************************************/
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



/**********************************************
 * 生成接口
 **********************************************/
app.get('/:size/:bgColor/:fgColor.:format?', async (req, res) => {
    console.log(`生成图片地址：http://${host}:${port}${req.url}`);
    const { size, bgColor, fgColor, format } = req.params;
    let text = req.query.text || `${size}`;
    
    // 将尺寸中的 'x' 替换为 ' × '
    const [width, height] = size.split('x').map(Number);
    text = text.replace(`${width}x${height}`, `${width} × ${height}`);

    // 检查图片尺寸是否过大
    if (width * height > 33554432) {
        var res_json = {
            code: 500,
            message: "操作失败",
            data: '图片尺寸过大'
        };
        console.log(res_json);
        res.status(500).json(res_json);
        return;
    }

    // 创建画布
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 设置背景色
    ctx.fillStyle = `#${bgColor}`;
    ctx.fillRect(0, 0, width, height);

    // 设置前景色
    ctx.fillStyle = `#${fgColor}`;

    // 根据文本长度动态调整理想字体大小
    // let fontSize = Math.min(width, height) / 5;
    let dynamic_factor = 0.5; // 根据需要调整此因子
    let fontSize = Math.min(width, height) / (text.length * dynamic_factor);
    fontSize = Math.max(fontSize, 10); // 确保字体大小不会太小
    ctx.font = `bold ${fontSize}px 华文行楷`;

    // 调整文字显示位置
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 如果宽比高小，那么文字显示宽度不能超过图片宽度，反之亦然
    if (width < height) {
        while (ctx.measureText(text).width > width - 20) {
            fontSize--;
            ctx.font = `bold ${fontSize}px Arial`;
        }
    } else {
        while (fontSize > height - 20) {
            fontSize--;
            ctx.font = `bold ${fontSize}px Arial`;
        }
    }

    // 绘制文字
    ctx.fillText(text, width / 2, height / 2);

    // 根据文件格式返回不同类型的图片
    switch (format) {
        case 'jpg':
            res.contentType('image/jpeg');
            canvas.createJPEGStream().pipe(res);
            break;
        case 'gif':
            res.contentType('image/gif');
            canvas.createGIFStream().pipe(res);
            break;
        default:
            res.contentType('image/png');
            canvas.createPNGStream().pipe(res);
            break;
    }

});


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
    // var port = server.address().port
    console.log(`服务已运行于：http://${host}:${port}`);
})