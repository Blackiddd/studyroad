//1.引入fs模块
const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

// fs.readFile("./resources/劝学.md", (err, data1) => {
//   fs.readFile("./resources/摆烂.md", (err, data2) => {
//     fs.readFile("./resources/退学.md", (err, data3) => {
//       let result = data1 + data2 + data3;
//       console.log(result);
//     });
//   });
// });

//使用promise实现
const p = new Promise((resolve, reject) => {
  fs.readFile("./resources/劝学.md", (err, data) => {
    resolve(data);
  });
});
p.then((value) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/摆烂.md", (err, data) => {
      resolve([value, data]);
    });
  });
})
  .then((value) => {
    return new Promise((resolve, reject) => {
      fs.readFile("./resources/退学.md", (err, data) => {
        value.push(data);
        resolve(value);
      });
    });
  })
  .then((value) => {
    console.log(value.toString());
  });
