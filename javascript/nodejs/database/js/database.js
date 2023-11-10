/**********************************************
 * 连接数据库
 * 数据库相关信息在mysql_info中配置
 * 主机(host):      主机名，一般为localhost
 * 端口(port):      端口号
 * 用户(user):      用户对象名称
 * 密码(password):  用户密码
 * 库名(database):  数据库名称
 **********************************************/
const mysql = require('mysql');
const database_table = require('./database_table');

const mysql_info = {
    host: 'localhost',
    // port: 3306,
    user: 'root',
    password: '123456',
    database: 'temp', // 你的数据库名   test    project
}

const connection = mysql.createConnection(mysql_info);
connection.connect((err) => {
    if (err) {
        console.log(`数据库 ${mysql_info.database} 连接失败`);
        console.log(`[连接错误] ${err.message}`);
        return
    }
    console.log(`数据库 \x1b[33m${mysql_info.database}\x1b[0m 连接成功`);

    database_table.createUploadsTable(connection, mysql_info.database)
        .then((message) => {
            console.log(message);
        })
        .catch((error) => {
            console.error(error);
        });

    database_table.createUserinfoTable(connection, mysql_info.database)
        .then((message) => {
            console.log(message);
        })
        .catch((error) => {
            console.error(error);
        });

})


module.exports = connection;
