// import { BaiduFanyiAPI } from 'baidu-fanyi-api';
const { BaiduFanyiAPI } = require('baidu-fanyi-api');
const { resolve, extname, basename } = require('path')
const fs = require('fs')
const glob = require('glob')

let sidebarArray = [];
glob.sync(resolve(__dirname, '../', '**/*.md')) // 遍历所有md文件
  .forEach(async (file) => {
    var extension = extname(file); //  获取后缀名
    var fileName = basename(file, extension); // 获取没有后缀的文件名
    // console.log(extension, fileName)
    sidebarArray.push(`/${fileName}`)
  })

try {
  fs.writeFileSync('sidebar.json', JSON.stringify(sidebarArray));
  console.log("JSON data is saved.");
} catch (error) {
  console.error(err);
}

// async function translate(str) {
//   await api.init();
//   const data = await api.translate(str, 'zh', 'en');
//   let res = new Date();
//   if (data.trans_result.data) {
//     res = data.trans_result.data[0].dst
//   }
//   console.log("===得到的结果", res)
//   return res;
// }

// // translate("js相关的生命周期");