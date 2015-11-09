var $ = function(el){
    return document.querySelector(el);
};

var result = $('#img-preview'),
    preview = $('#showImage'),
    cropOption = {
        aspectRatio: 1 / 1,
        guides: false,
        cropBoxResizable: false,
        cropBoxMovable: false,
        dragCrop: false,
        minContainerWidth: 200,
        minContainerHeight: 200
    },
    cropper = null;

// 预览
$('#input').onchange = function (e) {
    var file = this.files[0];
    lrz(file,{width: 600})
        .then(function (rst) {
            preview.style.display = 'block';
            preview.onload = function () {
                cropper = new Cropper(preview,cropOption);
            };
            preview.src = rst.base64;
        })
        .catch(function (err) {

        })
        .always(function () {

        });
};


// 裁剪
$('#crop').onclick = function(){
    var img = new Image();
    img.onload = function () {
        $('body').appendChild(img);
        // 销毁
        cropper.destroy();
        preview.style.display = 'none';
    };
    img.src = cropper
        .getCroppedCanvas(cropOption, {
            width: 200,
            height: 200
        })
        .toDataURL("image/jpeg", 0.9);
};
