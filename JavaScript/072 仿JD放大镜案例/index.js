//先加载页面 再执行JS
window.addEventListener("load", function () {
  var preview_img = document.querySelector(".preview_img");
  var mask = document.querySelector(".mask");
  var big = document.querySelector(".big");
  //1 鼠标经过时 显示;
  preview_img.addEventListener("mouseover", function () {
    mask.style.display = "block";
    big.style.display = "block";
  });
  preview_img.addEventListener("mouseout", function () {
    mask.style.display = "none";
    big.style.display = "none";
  });
  //2 放大镜跟随鼠标
  preview_img.addEventListener("mousemove", function (e) {
    //2.1 鼠标在盒子内定位
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    //2.2 鼠标在中心-减去一半盒子长度
    var maskX = x - mask.offsetWidth / 2;
    var maskY = y - mask.offsetHeight / 2;
    var maskXMax = preview_img.offsetWidth - mask.offsetWidth;
    var maskYMax = preview_img.offsetHeight - mask.offsetHeight;
    //2.3 mask的移动距离 不能出preview_img
    if (maskX <= 0) {
      maskX = 0;
    } else if (maskX >= maskXMax) {
      maskX = maskXMax;
    }
    if (maskY <= 0) {
      maskY = 0;
    } else if (maskY >= maskYMax) {
      maskY = maskYMax;
    }
    mask.style.left = maskX + "px";
    mask.style.top = maskY + "px";
    //3 big图片跟随-比例
    //    mask移动距离/mask最大移动距离=big移动距离/big最大移动距离
    var bigIMG = document.querySelector(".bigIMG");
    var bigXMAX = bigIMG.offsetWidth - big.offsetWidth;
    var bigYMAX = bigIMG.offsetHeight - big.offsetHeight;
    var bigX = (maskX * bigXMAX) / maskXMax;
    var bigY = (maskY * bigYMAX) / maskYMax;
    bigIMG.style.left = -bigX + "px";
    bigIMG.style.top = -bigY + "px";
  });
});
