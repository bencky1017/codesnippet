function generateImage(size, bgColor, fgColor, format, pic_text) {
    // 创建画布
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    var text = pic_text != '' ? pic_text : size;

    // 将尺寸中的 'x' 替换为 ' × '
    var [width, height] = size.split('x').map(Number);
    canvas.width = width;
    canvas.height = height;

    text = text.replace(`${width}x${height}`, `${width} × ${height}`);

    // 检查图片尺寸是否过大
    if (width * height > 33554432) {
        var res_json = {
            code: 500,
            message: "操作失败",
            data: '图片尺寸过大'
        };
        console.log(res_json);
        return;
    }

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
    ctx.font = `bold ${fontSize}px Arial,华文行楷`;

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

    const generateImage = new Image();
    generateImage.src = canvas.toDataURL(`image/${format == 'jpg' ? 'jpeg' : format}`);
    // var show_canvas = document.getElementById('show_canvas');
    // show_canvas.innerHTML = '';
    // show_canvas.appendChild(generateImage);
    window.open('./randomPicture.html')

    var bk_randpic_data = {
        title: generateImage.src.split('/').slice(-1)[0] + ` (${width}×${height})`,
        data: generateImage.src,
    }

    window.localStorage.setItem('bk_randpic_data', JSON.stringify(bk_randpic_data));
}