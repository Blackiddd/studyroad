const fs = require("fs");
function readquanxue() {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/劝学.md", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
function readbailan() {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/摆烂.md", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
function readtuixue() {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/退学.md", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
async function read() {
  let quanxue = await readquanxue();
  let bailan = await readbailan();
  let tuixue = await readtuixue();
  console.log(quanxue.toString());
  console.log(bailan.toString());
  console.log(tuixue.toString());
}
read();
