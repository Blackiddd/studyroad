//功能需求：
//   1.鼠标经过时显示左右按钮，离开时隐藏
//   2.点击小圆圈切换图片
//   3.图片播放时小圆圈跟随切换
//   4.点击按钮切换图片
//   5.鼠标不经过时，自动轮播图片，鼠标经过时，轮换停止
window.addEventListener("load", function () {
  var focus = this.document.querySelector(".focus");
  var arrow_l = this.document.querySelector(".arrow-l");
  var arrow_r = this.document.querySelector(".arrow-r");
  var focusWidth = focus.offsetWidth;

  //功能1.鼠标经过时显示左右按钮，离开时隐藏
  focus.addEventListener("mouseover", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener("mouseout", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer = setInterval(function () {
      arrow_r.click(); //手动点击事件
    }, 2000);
  });

  //动态生成小圆圈
  var ul = focus.querySelector("ul");
  var ol = this.document.querySelector("ol");
  for (var i = 0; i < ul.children.length; i++) {
    var li = this.document.createElement("li");
    //给li添加索引号
    li.setAttribute("index", i);
    ol.appendChild(li);
    //功能2 点击按钮切换图片
    li.addEventListener("click", function () {
      //排它思想小圆圈样式
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";
      //切换图片：小圆圈索引号✖图片宽度
      var index = this.getAttribute("index");
      //要把index给num 和 curcle
      num = index;
      circle = index;
      animate(ul, -index * focusWidth);
    });
  }
  ol.children[0].className = "current";
  //克隆第一张图片，放到最后（保证小圆圈不多）
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //功能4 点击按钮切换图片
  var num = 0;
  var circle = 0; //控制小圆圈
  var flag = true; //节流阀，防止点击过快，图片过快
  //右侧按钮
  arrow_r.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //功能3 图片切换时小圆圈跟随
      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      //排它
      circleChange();
    }
  });

  //左侧按钮
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        ul.style.left = -(ul.children.length - 1) * focusWidth + "px";
        num = ul.children.length - 1;
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  });

  //小圆圈变换函数
  function circleChange() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    ol.children[circle].className = "current";
  }

  //功能5 鼠标不经过时，自动轮播图片，鼠标经过时，轮换停止
  var timer = this.setInterval(function () {
    arrow_r.click(); //手动点击事件
  }, 2000);
});
