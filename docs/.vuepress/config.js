// .vuepress/config.js
// import sidebarData from "./sidebar.json"
// 这里能执行是因为config.js是在node环境，有fs等模块。而要打包的文件则是浏览器环境。

// let sidebarArray = [];
// glob.sync(resolve(__dirname, '../', '**/*.md')) // 遍历所有md文件
//   .forEach(async (file) => {
//     var extension = extname(file); //  获取后缀名
//     var fileName = basename(file, extension); // 获取没有后缀的文件名
//     // console.log(extension, fileName)
//     if(!(fileName.includes("README"))) {
//         sidebarArray.push(`/${fileName}`)
//     }
//   })

const fs = require('fs') // 文件模块
const path = require('path') // 路径模块
const docsRoot = path.join(__dirname, '..') //∂ docs文件路径
const chalk = require('chalk') // 命令行打印美化
const log = console.log;

console.log("docsRoot", docsRoot)

function ReadFile(dir = docsRoot, filesList = [], fpath = '') {
  let files = fs.readdirSync(dir)
  // 10 1排序错误
  if (Array.isArray(files)) {
    files.sort((item1, item2) => {
      let c1 = item1.split('.')[0]
      let c2 = item2.split('.')[0]
      return c1 - c2
    })
  }
  files.forEach((item, index) => {
    let filePath = path.join(dir, item)
    const stat = fs.statSync(filePath)
    // log('isDirectory-------------------', stat.isDirectory(), item)
    // isDirectory 返回是否文件夹, 4.file.md dir:/Users/xx/reg-rules-js-site/docs/regular
    const fileNameArr = path.basename(filePath).split('.')


    if (stat.isDirectory() && item !== '.vuepress') {
      // 生成目录名
      let title = fileNameArr.length > 1 ? fileNameArr[1] : fileNameArr[0]
      if (!title) {
        log(chalk.yellow(`warning: 该文件夹 "${filePath}" 没有按照约定命名，将忽略生成相应数据。`))
        return
      }
      filesList.push({
        title,
        collapsable: false,
        children: [],
      })
      // log('递归读取文件夹的文件', path.join(dir, item), filesList[index].children, item)
      // 递归读取文件夹的文件 /Users/another/Documents/self-study/reg-rules-js-site/docs/test/test2 [] test2
      ReadFile(path.join(dir, item), filesList[index].children, item)
    } else {
      // 生成文件名数组
      let name = null
      title = null
      typeFile = null
      pathName = null

      let cloneArr = [...fileNameArr]

      typeFile = cloneArr[cloneArr.length - 1]

      if (fileNameArr.length > 1) {
        cloneArr.pop()
        name = cloneArr.join('.')
        pathName = fpath ? `${fpath}/${name}` : name
        title = cloneArr.length > 1 ? cloneArr[1] : cloneArr[0]
      } else {
        log(chalk.yellow(`warning: 该文件 "${filePath}" 没有按照约定命名，将忽略生成相应数据。`))
        return
      }

      log('name', name, pathName, typeFile, title)
      if (name === 'README') {

      }
      // 过滤非md文件
      if (typeFile === 'md') {
        if (name === 'README') return filesList.unshift('')
        filesList.push([pathName, title])
      }
    }
  })
  return filesList
}

function dirReader(dir = docsRoot, filesList = [], currPath = "") {
  let files = fs.readdirSync(dir)
  if (Array.isArray(files)) {
    files.sort((item1, item2) => {
      let c1 = item1.split('.')[0]
      let c2 = item2.split('.')[0]
      return c1 - c2
    })
  }
  console.log("排序后的", files);
  files.forEach((file, index) => {
    let filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    // 如果是文件夹
    if (stat.isDirectory()) {
      if (!file.includes(".")) {
        console.log("其中的文件夹", file)
        const dirObject = {
          title: path.basename(filePath),
          collapsable: false,
          children: []
        }
        filesList.push(dirObject)
        dirReader(filePath, dirObject.children, `${currPath}/${file}`)
      }
    } else {
      if (!file.includes("README") && !file.includes("DS_Store")) {
        const title = file.split(".")[0]

        const fileObject = [`${currPath}/${title}`, title]
        filesList.push(fileObject)
      }
    }
  })
}

const list = [];
dirReader(docsRoot, list, '');
console.log("=======Result", JSON.stringify(list));

module.exports = {
  themeConfig: {
    displayAllHeaders: true, // Default: false
    // logo: '/assets/img/logo.png',
    nav: [
      { text: '主页', link: '/' },
      { text: 'github', link: 'https://github.com/tobbyvic' }
    ],
    sidebar: list
  },
}