window.addEventListener("load", function () {
  var focus = this.document.querySelector(".focus");
  var ul = focus.children[0];
  var ol = focus.children[1];
  var w = focus.offsetWidth;
  var index = 0;
  var translatex = 0;
  //自动轮播
  var timer = this.setInterval(function () {
    index++;
    translatex = -index * w;
    ul.style.transition = "all 0.5s";
    ul.style.transform = "translateX(" + translatex + "px)";
  }, 2000);
  //判断过渡（滚动动画 ）结束
  ul.addEventListener("transitionend", function () {
    if (index > 3) {
      index = 0;
      translatex = -index * w;
      //去掉过渡效果
      ul.style.transition = "none";
      ul.style.transform = "translateX(" + translatex + "px)";
    } else if (index < 0) {
      index = 3;
      var translatex = -index * w;
      ul.style.transition = "none";
      ul.style.transform = "translateX(" + translatex + "px)";
    }
    //小圆点跟随变化
    ol.querySelector(".current").classList.remove("current"); //移除现在类名是current的li
    ol.children[index].classList.add("current");
  });
  //手指拖动
  var startX = 0;
  var moveX = 0;
  var flag = false;
  ul.addEventListener("touchstart", function (e) {
    clearInterval(timer);
    startX = e.targetTouches[0].pageX;
  });
  ul.addEventListener("touchmove", function (e) {
    moveX = e.targetTouches[0].pageX - startX;
    translatex = -index * w + moveX;
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + translatex + "px)";
    flag = true; //手指移动过再判断
    e.preventDefault(); //组织页面滚动
  });
  ul.addEventListener("touchend", function (e) {
    if (flag) {
      if (Math.abs(moveX) > 100) {
        if (moveX > 0) {
          index--;
        } else {
          index++;
        }
        translatex = -index * w;
        ul.style.transition = "all 0.5s";
        ul.style.transform = "translateX(" + translatex + "px)";
      } else {
        translatex = -index * w;
        ul.style.transition = "all 0.5s";
        ul.style.transform = "translateX(" + translatex + "px)";
      }
      clearInterval(timer);
      timer = setInterval(function () {
        index++;
        translatex = -index * w;
        ul.style.transition = "all 0.5s";
        ul.style.transform = "translateX(" + translatex + "px)";
      }, 2000);
    }
  });
  //goback
  var goBack = this.document.querySelector(".goback");
  var nav = this.document.querySelector("nav");
  window.addEventListener("scroll", function () {
    console.log(window.pageYOffset, nav.offsetTop);
    if (window.pageYOffset >= nav.offsetTop) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
  });
  goBack.addEventListener("click", function () {
    window.scroll(0, 0);
  });
});
