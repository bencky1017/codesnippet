/**********************************************
 * 上传文件
 * 静态文件路径是 static_path
 * 客户端访问文件在 static_request_path 下
 * 存储路径和请求路径可以不一致
 **********************************************/
const express = require('express');
const router = express.Router();
const connection = require('./database');
const upload_config = require('./upload_config');

// 数据表名称
const file_table = `uploads`
const static_request_path = require('./global').static_request_path
const static_path = require('./global').static_path

// 静态文件路径 static_path
router.use(static_request_path, express.static(static_path));

// 上传文件
router.post('/api/upload', upload_config.single('file'), (req, res) => {
    const file = req.file;
    console.log(`上传文件：`,file);
    if (!file) {
        console.log('文件不存在');
        const error = new Error('请选择要上传的文件！');
        return res.status(400).json({ message: error.message });
    }
    // const file_name = path.basename(file.originalname, path.extname(file.originalname));
    const file_name = file.originalname;
    const file_path = file.path;
    console.log(`文件信息：`,{
        originalname: file_name,
        path: file_path
    });

    // 存储文件信息到数据库
    const sql = `INSERT INTO ${file_table} (file_name, file_path,create_time) VALUES (?, ?,?)`
    const key_list = [file_name, file_path, null]
    connection.query(sql, key_list, (error, result) => {
        if (error) {
            var res_json = ({
                "code": 500,
                "msg": "文件上传失败！",
                "data": error,
            })
            return res.json(res_json)
        } else {
            var res_json = ({
                "code": res.statusCode,
                "msg": "文件上传成功！",
                "data": result,
            })
            return res.json(res_json)
        }
    })
    // res.json({ message: '文件上传成功！', filename: file.originalname });
});

module.exports = router, static_path;
