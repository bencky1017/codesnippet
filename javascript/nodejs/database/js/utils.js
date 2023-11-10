// 获取请求数据
function get_req(req) {
    console.log('方式：\t', (req.method) || '无')
    console.log('原始：\t', (req.originalUrl) || '无')
    console.log('参数：\t', (req.params) || '无')
    console.log('内容：\t', (req.body) || '无')
    console.log('路径：\t', (req.path) || '无')
    console.log('协议：\t', (req.protocol) || '无')
    console.log('查询：\t', (req.query) || '无')
    console.log('基础URL：\t', (req.baseurl) || '无')
    console.log('URL：\t', (req.url) || '无')
    console.log('文件：\t', (req.file) || '无')
    console.log('状态码：\t', (req.statusCode) || '无')
    console.log('状态信息：\t', (req.statusMessage) || '无')
    console.log('状态信息：\t', (req.statusMessage) || '无')
}

// 转换方法，防止被渲染为html
function escapeHtml(str) {
    var escape_list = ['&', '<', '>', '"', "'"]
    var replace_list = ['&amp;', '&lt;', '&gt;', '&quot;', '&#39;']
    return str.replace(/[&<"']/g, function (match) {
        return replace_list[escape_list.indexOf(match)]
        // switch (match) {
        //     case '&':
        //         return '&amp;';
        //     case '<':
        //         return '&lt;';
        //     case '>':
        //         return '&gt;';
        //     case '"':
        //         return '&quot;';
        //     case "'":
        //         return '&#39;';
        //     default:
        //         return match;
        // }
    });
}

module.exports = {
    get_req,
    escapeHtml
};
