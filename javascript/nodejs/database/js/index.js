/*****************************************
 * 配置信息
 * 主机：localhost
 * 端口：port
 ***************************************** */
const host = 'localhost'
// const host = '192.168.0.102'
const port = 3000
/***************************************** */

function escapeHtml(str) {
    // 转换方法，防止被渲染为html
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

function get_data() {
    // 获取表格的引用
    var table = document.querySelectorAll('#dataTable tbody')[0];
    table.innerHTML = '';

    // 使用 fetch API 请求接口数据
    fetch(`http://${host}:${port}/api/get_data`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#dataTable tbody');

            data.data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name != null ? escapeHtml(item.name) : ""}</td>
                    <td>${item.age != null ? escapeHtml(item.age) : ""}</td>
                    <td>${item.phone != null ? escapeHtml(item.phone) : ""}</td>
                    <td>${item.address != null ? escapeHtml(item.address) : ""}</td>
                    <td>${item.create_time != null ? new Date(item.create_time).toLocaleString() : ""}</td>
                    <td>${item.update_time != null ? new Date(item.update_time).toLocaleString() : ""}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// document.addEventListener('DOMContentLoaded', get_data());

function get_file() {
    // 获取表格的引用
    var table = document.querySelectorAll('#fileTable tbody')[0];
    table.innerHTML = '';

    // 使用 fetch API 请求接口数据
    fetch(`http://${host}:${port}/api/get_file`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#fileTable tbody');

            data.data.forEach(item => {
                const row = document.createElement('tr');
                item.file_path = item.file_path.replace('assets', 'uploads')
                // < a href = "http://192.168.0.102:3000/" ></ >

                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.file_name != null ? escapeHtml(item.file_name) : ""}</td>
                    <td><a href="http://${host}:${port}/${item.file_path != null ? escapeHtml(item.file_path) : ""}" target="_blank">${item.file_name != null ? escapeHtml(item.file_name) : ""}</a></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', get_data(), get_file());


/*********************************************************************************************** */
function readtext(content) {
    var readtext = document.getElementById('readtext');
    readtext.value = content
}

function tojson() {
    var jsonString = document.getElementById('readtext').value;
    var jsonObj = jsonString != '' ? JSON.parse(jsonString) : { msg: "读取记录后再进行操作" };
    document.getElementById('preId').innerHTML = escapeHtml(JSON.stringify(jsonObj, null, 4));
}

function totext() {
    var jsonString = document.getElementById('readtext').value;
    var jsonObj = jsonString != '' ? JSON.parse(jsonString) : { msg: "读取记录后再进行操作" };
    document.getElementById('preId').innerHTML = escapeHtml(JSON.stringify(jsonObj));
}

// *********************************** CRUD操作 ***********************************

function makeRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

function createRecord() {
    // var name = prompt("Enter Name:");
    // var age = prompt("Enter Age:");
    var id = document.getElementById('createId') != null ? document.getElementById('createId').value : '';
    var name = document.getElementById('createName').value;
    var age = document.getElementById('createAge').value;
    var phone = document.getElementById('createPhone').value;
    var address = document.getElementById('createAddress').value;
    var data = {
        id: id,
        name: name,
        age: age,
        phone: phone,
        address: address,
        create_time: new Date().toLocaleString()
    }
    fetch(`http://${host}:${port}/api/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(new Date().toLocaleString(), data);
            get_data();
        }).catch(error => console.error(`创建记录出错`));
}

function readRecord() {
    var id = document.getElementById('readId').value;
    fetch(`http://${host}:${port}/api/read/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.data.forEach(item => {
                item.create_time = item.create_time != '' && item.create_time != null ? new Date(item.create_time).toLocaleString() : '';
                item.update_time = item.update_time != '' && item.update_time != null ? new Date(item.update_time).toLocaleString() : '';
            });
            readtext(JSON.stringify(data));
            tojson();

        }).catch(error => console.error(`读取记录出错`, error));
}

function updateRecord() {
    var id = document.getElementById('updateId').value;
    var name = document.getElementById('updateName').value;
    var age = document.getElementById('updateAge').value;
    var phone = document.getElementById('updatePhone').value;
    var address = document.getElementById('updateAddress').value;
    var data = {
        id: id,
        name: name,
        age: age,
        phone: phone,
        address: address
    }
    fetch(`http://${host}:${port}/api/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            get_data();
        }).catch(error => console.error(`更新记录出错`))
}

function deleteRecord() {
    var id = document.getElementById('deleteId').value;
    fetch(`http://${host}:${port}/api/delete/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            get_data()
        })
        .catch(error => console.error(`删除记录出错`));
}

function upload_file() {
    // document.getElementById('uploadButton').addEventListener('click', function (event) {
    // event.preventDefault();

    var formData = new FormData();
    var fileInput = document.getElementById('fileInput');
    formData.append('file', fileInput.files[0]);

    fetch(`http://${host}:${port}/api/upload`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(); ('上传成功', data);
            fileInput.value = '';
            get_file();
        })
        .catch(error => {
            console.log(666);
            console.error('上传失败', error);
        });
    // });
}

