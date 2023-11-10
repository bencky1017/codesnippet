document.addEventListener('DOMContentLoaded', function () {
    var temp_json = {
        size_width: 600,
        size_height: 400,
        backcolor: '000000',
        forecolor: 'ffffff',
        type: 'png',
        type_check: true,
        text: 'dynamic Picture',
        text_check: true,
    }
    var bk_randpic_config = JSON.parse(window.localStorage.getItem('bk_randpic_config')) || temp_json;
    console.log(bk_randpic_config);

    // 图片宽高
    const picture_width = document.getElementById('picture_width');
    const picture_height = document.getElementById('picture_height');
    // 背景颜色选择器
    const backcolor_piker = document.getElementById('backcolor_piker');
    const backcolor_value = document.getElementById('backcolor_value');
    // 前景颜色选择器
    const forecolor_piker = document.getElementById('forecolor_piker');
    const forecolor_value = document.getElementById('forecolor_value');
    // 复选框操作
    const show_pic = document.getElementById('show_pic');
    const show_text = document.getElementById('show_text');
    // 选项信息
    const type_png = document.getElementById('format_type_png');
    const type_jpg = document.getElementById('format_type_jpg');
    // 显示文字
    const text_value = document.getElementById('text_value');

    // ************************* 初始化赋值 *************************
    // 宽高赋值
    picture_width.value = bk_randpic_config.size_width;
    picture_height.value = bk_randpic_config.size_height;
    // 背景颜色选择器
    backcolor_piker.value = '#' + bk_randpic_config.backcolor;
    backcolor_value.value = bk_randpic_config.backcolor;
    // 前景颜色选择器
    forecolor_piker.value = '#' + bk_randpic_config.forecolor;
    forecolor_value.value = bk_randpic_config.forecolor;
    // 显示图片格式
    show_pic.checked = bk_randpic_config.type_check;
    type_png.disabled = !bk_randpic_config.type_check;
    type_jpg.disabled = !bk_randpic_config.type_check;
    // 图片格式
    type_png.checked = bk_randpic_config.type == 'png' ? true : false;
    type_jpg.checked = bk_randpic_config.type == 'jpg' ? true : false;
    // 显示文字
    show_text.checked = bk_randpic_config.text_check;
    text_value.disabled = !bk_randpic_config.text_check;
    text_value.value = bk_randpic_config.text;
    text_value.style.backgroundColor = !bk_randpic_config.text_check ? '#eee' : '#ecf5ff';
    // ************************* 初始化赋值 *************************

    // 宽高赋值
    picture_width.addEventListener('wheel', function (event) {
        event.preventDefault();
        var currentValue = parseInt(this.value);
        // 获取滚轮事件的delta值
        var delta = Math.sign(event.deltaY);
        this.value = currentValue - delta;
        bk_randpic_config.size_width = parseInt(this.value);
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });
    picture_width.addEventListener('input', function () {
        var currentValue = parseInt(this.value);
        bk_randpic_config.size_width = parseInt(currentValue);
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });
    picture_height.addEventListener('wheel', function (event) {
        event.preventDefault();
        var currentValue = parseInt(this.value);
        // 获取滚轮事件的delta值
        var delta = Math.sign(event.deltaY);
        this.value = currentValue - delta;
        bk_randpic_config.size_height = parseInt(this.value);
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });
    picture_height.addEventListener('input', function () {
        var currentValue = parseInt(this.value);
        bk_randpic_config.size_height = parseInt(currentValue);
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });

    // 背景颜色赋值
    backcolor_piker.addEventListener('input', function () {
        var selectedColor = backcolor_piker.value.replace('#', '');
        backcolor_value.value = selectedColor;
        bk_randpic_config.backcolor = selectedColor;
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });

    backcolor_value.addEventListener('input', function () {
        var inputedColor = backcolor_value.value;
        backcolor_piker.value = '#' + inputedColor;
        bk_randpic_config.backcolor = inputedColor;
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });
    // 前景颜色赋值
    forecolor_piker.addEventListener('input', function () {
        var selectedColor = forecolor_piker.value.replace('#', '');
        forecolor_value.value = selectedColor;
        bk_randpic_config.forecolor = selectedColor;
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });

    forecolor_value.addEventListener('input', function () {
        var inputedColor = forecolor_value.value;
        forecolor_piker.value = '#' + inputedColor;
        bk_randpic_config.forecolor = inputedColor;
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });

    // 图片格式复选框
    show_pic.addEventListener('click', function () {
        if (this.checked == false) {
            type_png.disabled = true;
            type_jpg.disabled = true;
            bk_randpic_config.type_check = false;
        } else {
            type_png.disabled = false;
            type_jpg.disabled = false;
            bk_randpic_config.type_check = true;
        }
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });

    // 图片格式
    type_png.addEventListener('click', function () {
        if (this.checked == true) {
            bk_randpic_config.type = this.value;
            window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
        }
    });
    type_jpg.addEventListener('click', function () {
        if (this.checked == true) {
            bk_randpic_config.type = this.value;
            window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
        }
    });

    // 显示文字复选框
    show_text.addEventListener('click', function () {
        if (this.checked == false) {
            text_value.disabled = true;
            text_value.style.backgroundColor = '#eee';
            bk_randpic_config.text_check = false;
        } else {
            text_value.removeAttribute('disabled');
            text_value.style.backgroundColor = '#ecf5ff';
            bk_randpic_config.text_check = true;
        }
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });

    // 文字内容
    text_value.addEventListener('input', function () {
        bk_randpic_config.text = this.value;
        window.localStorage.setItem('bk_randpic_config', JSON.stringify(bk_randpic_config));
    });

});

function generatePicture() {
    var pic_width = document.getElementById("picture_width").value;
    var pic_height = document.getElementById("picture_height").value;
    var size = `${pic_width}x${pic_height}`;
    var backcolor = document.getElementById("backcolor_value").value;
    var forecolor = document.getElementById("forecolor_value").value;
    // var format_type_png = document.getElementById("format_type_png");
    // var format_type_jpg = document.getElementById("format_type_jpg");
    var show_pic = document.getElementById("show_pic").checked;
    var format = format_type_png.checked ? format_type_png.value : format_type_jpg.value;
    var type = show_pic ? '.' + format : '';

    var show_text = document.getElementById("show_text").checked;
    var pic_text = show_text ? (document.getElementById("text_value").value) : '';
    var text = show_text ? `?text=` + pic_text : '';

    var host = 'localhost'
    var port = 3000

    var relative_url = `${size}/${backcolor}/${forecolor}${type}${text}`;
    // window.open(`http://${host}:${port}/${relative_url}`)
    console.log(relative_url);
    generateImage(size, backcolor, forecolor, format, pic_text);

    // fetch(`http://${host}:${port}/${relative_url}`, {
    //     method: 'get'
    // })
    //     // .then(response => response.json())
    //     .then(response => response.blob())
    //     .then(data => {
    //         if (data.status != 200) {
    //             var res_json = {
    //                 code: data.status,
    //                 message: "操作失败",
    //                 data: '图片尺寸过大'
    //             };
    //         } else {
    //             var res_json = {
    //                 code: data.status,
    //                 message: "操作成功",
    //                 data: `http://${host}:${port}/${relative_url}`
    //             };
    //         }
    //         console.log('生成成功', res_json);
    //     })
    //     .catch(error => {
    //         console.error('生成失败', error);
    //     });
}
