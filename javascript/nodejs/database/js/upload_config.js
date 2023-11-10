/**********************************************
 * 上传文件配置内容
 * 包含：
 * 1.文件上传的目的路径创建规则
 * 2.文件名称替换规则
 **********************************************/
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dateformat = require('date-fns').format;

// 基础存储路径
const base_upload_path = require('./global').static_path
const to_encode_type = 'utf-8'

// 配置Multer以确定上传文件的存储位置和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // TODO 保留，后续设置自定义内容
        // base_upload_path = base_upload_path + req.body.folder || '';

        // 获取当前日期，padStart保证两位数
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const uploadPath = path.join(base_upload_path, `/${year}/${month}/${day}`);

        // 指定上传文件的存储目录为
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // 修改文件编码方式，防止显示乱码
        file.originalname = Buffer.from(file.originalname, 'binary').toString(to_encode_type);
        // 获取文件后缀名
        const extname = path.extname(file.originalname);
        // 获取文件基础名，不包括后缀名
        const filename = path.basename(file.originalname, extname);
        // 生成唯一的文件名，包括时间戳和随机数
        // var date = new Date().toLocaleDateString().replace(/[\\/-]/g, '')
        var date = dateformat(new Date(), 'yyyyMMddHHmmss')
        const uniqueSuffix = date + '-' + Math.round(Math.random() * 1E8);
        cb(null, filename + uniqueSuffix + extname);
    }
});

// 创建一个 Multer 实例，使用之前定义的 storage 对象来配置文件的存储方式
const upload = multer({ storage: storage });

module.exports = upload;
