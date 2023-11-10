/**********************************************
 * 创建数据表
 * 根据需要创建相关的数据表，提供给database连接
 * 主机(host):      主机名，一般为localhost
 * 端口(port):      端口号
 * 用户(user):      用户对象名称
 * 密码(password):  用户密码
 * 库名(database):  数据库名称
 **********************************************/
// 数据表名称
const file_table = `uploads`
const userinfo_table = `userinfo`

// 创建上传文件数据表
function createUploadsTable(connection, database) {
    const create_uploads = `
        CREATE TABLE IF NOT EXISTS \`${database}\`.\`${file_table}\`  (
            id int AUTO_INCREMENT NOT NULL,
            file_name varchar(255) NULL COMMENT '文件名',
            file_path varchar(255) NULL COMMENT '文件路径',
            create_time datetime NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
            PRIMARY KEY (id)
        );
    `;

    return new Promise((resolve, reject) => {
        connection.query(create_uploads, (error, results) => {
            if (error) {
                reject(`数据表 ${file_table} 创建失败: \x1b[41m${error.message}\x1b[0m`);
                console.error(`[创建错误] 数据表 ${file_table} \x1b[41m创建错误\x1b[0m`, {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState,
                    index: error.index,
                    // sql: error.sql,
                });
            } else {
                resolve(`数据表 ${file_table} \x1b[42m创建成功\x1b[0m`);
            }
        });
    });
}

// 创建用户信息数据表
function createUserinfoTable(connection, database) {
    const create_userinfo = `
        CREATE TABLE IF NOT EXISTS \`${database}\`.\`${userinfo_table}\`  (
            id int AUTO_INCREMENT NOT NULL,
            username varchar(255) NOT NULL COMMENT '用户名：登录账号，通常为数字+字母',
            password varchar(255) NOT NULL COMMENT '密码：登录密码',
            phone varchar(255) NULL COMMENT '手机号',
            email varchar(255) NULL COMMENT '邮箱',
            nickname varchar(255) NULL COMMENT '用户昵称：可以自行设置，不做唯一限制',
            create_time datetime NULL COMMENT '创建时间',
            update_time datetime NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：修改后自动更新时间',
            PRIMARY KEY (id)
        );
    `;

    return new Promise((resolve, reject) => {
        connection.query(create_userinfo, (error, results) => {
            if (error) {
                reject(`数据表 ${userinfo_table} 创建失败: \x1b[41m${error.message}\x1b[0m`);
                console.error(`[创建错误] 数据表 ${userinfo_table} \x1b[41m创建错误\x1b[0m`, {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState,
                    index: error.index,
                    // sql: error.sql,
                });
            } else {
                resolve(`数据表 ${userinfo_table} \x1b[42m创建成功\x1b[0m`);
            }
        });
        // 关闭新的数据库连接
        // connection.end();
    });

}

module.exports = {
    createUploadsTable,
    createUserinfoTable
};