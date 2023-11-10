/**********************************************
 * 请求接口设计
 **********************************************/
const express = require('express');
const router = express.Router();
const connection = require('./database');
const mock = require('mockjs').mock;
const { get_req } = require('./utils');

/**********************************************
 * 预处理模块
 **********************************************/
console.log(`测试mock随机输出：\x1b[34m%s\x1b[0m`, mock('@string(3,10)'))
var temp_userinfo = {
    username: mock(`@first()`),
    password: mock(`@string(lower,6, 10)`),
    phone: '1' + mock(`@string('0123456789',10)`),
    email: mock(`@email()`),
    nickname: mock(`@cname(2,4)`),
    create_time: mock(`@now('yyyy-MM-dd HH:mm:ss')`),
}
console.log(temp_userinfo);

// 数据表名称
const user_table = `api_test_userinfo`
const file_table = `uploads`

// 初始化
router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // *表示都可以跨域访问
    res.send('接口程序运行中');
    console.log('根节点GET请求');
})

// 创建
router.post('/create', (req, res) => {
    // TODO 其他状态提示
    console.log(`创建时间：`, new Date(), `创建记录：`, req.body)
    const { name, age, phone, address, create_time } = req.body; // 假设你的表中有名为 name 和 age 的字段
    const sql = `INSERT INTO ${user_table} (name,age,phone,address,create_time,update_time) VALUES (?,?,?,?,?,?)`;
    console.log(name + age == '')
    if (name == '') {
        var res_json = {
            "code": 500,
            "msg": "操作失败",
        }
        return res.send(res_json);
    }
    connection.query(sql, [name, age, phone, address, create_time, null], (error, result) => {// 几个问号就有几个参数
        if (error) {//throw error;
            var res_json = {
                "code": 500,
                "msg": "操作失败",
                "data": {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState,
                    index: error.index,
                    sql: error.sql,
                }
            }
            res.json(res_json);
        } else {
            var res_json = {
                "code": res.statusCode,
                "msg": "操作成功",
                "data": req.body
            }
            res.json(res_json);

        }
    });
});

// 读取
router.get('/read/:id', (req, res) => {
    var res_json = {
        "code": res.statusCode,
        "msg": "查询成功",
        "data": {},
    }
    const id = req.params.id;
    const sql = `SELECT * FROM ${user_table} WHERE id = ?`;
    connection.query(sql, [id], (error, result) => {
        console.log(`查询id：`, parseInt(id));
        if (error) {// throw error;
            res_json.msg = '查询失败'
            res.json(res_json);
        }

        res_json.data = result
        res.json(res_json);
    });
});

// 更新
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, phone, address } = req.body;
    const sql = `UPDATE ${user_table} SET name = ?, age = ?, phone = ?, address = ? WHERE id = ?`;
    connection.query(sql, [name, age, phone, address, id], (error, result) => {
        if (error) { // throw error;
            var res_json = {
                "code": res.statusCode,
                "msg": "更新失败",
                "data": {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState,
                    index: error.index,
                    sql: error.sql,
                },
            }
            res.send(res_json);
        } else {
            var res_json = {
                "code": res.statusCode,
                "msg": "更新成功",
            }
            res.send(res_json);
            console.log(`更新数据id：`, parseInt(id), `更新内容：`, req.body);
        }
    });
});

// 删除
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM ${user_table} WHERE id = ?`;
    connection.query(sql, [id], (error, result) => {
        if (error) {// throw error;
            var res_json = {
                "code": res.statusCode,
                "msg": "删除失败",
                "data": {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState,
                    index: error.index,
                    sql: error.sql,
                },
            }
            res.send(res_json)
        } else {
            var res_json = {
                "code": res.statusCode,
                "msg": "删除成功",
            }
            res.send(res_json);
            console.log('删除记录id：', parseInt(id));
        }
    });
});

// 显示数据
router.get('/get_data', (req, res) => {
    const sql = `SELECT id,name,age,phone,address,create_time,update_time FROM ${user_table} ` + ` order by id desc`;
    connection.query(sql, (error, result) => {
        if (error) {// throw error;
            var res_json = {
                "code": res.statusCode,
                "msg": "查询失败",
                "data": {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState,
                    index: error.index,
                    sql: error.sql,
                },
            }
            res.json(res_json);
        } else {
            var res_json = {
                "code": res.statusCode,
                "msg": "查询成功",
                "data": result,
            }
            res.json(res_json);
            console.log(`用户刷新列表`, new Date().toLocaleString().split('├')[0]);
        }
    });
});

// 显示文件
router.get('/get_file', (req, res) => {
    const sql = `SELECT * FROM ${file_table}`
    connection.query(sql, (error, result) => {
        if (error) {
            return res.sendStatus(400).json({
                'code': res.statusCode,
                'msg': '查询失败',
                'data': {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState,
                    index: error.index,
                    sql: error.sql,
                },
            })
        } else {
            return res.json({
                'code': res.statusCode,
                'msg': '查询成功',
                'data': result,
            })
        }
    })
})


// 添加其他路由...

module.exports = router;
