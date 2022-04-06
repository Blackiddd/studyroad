// import * as m1 from "./hello.js";  静态导入
const btn = document.querySelector("button");

btn.addEventListener("click", function () {
  import("./hello.js").then((module) => {
    module.hello();
  });
});
