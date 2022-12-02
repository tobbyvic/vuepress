## 创建vue-cli项目

```
mkdir demo
vue create .
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a8be11acee442babc894cd2715ee597~tplv-k3u1fbpfcp-watermark.image?)

一般开发组件的话，不需要添加vue-router和vuex.
所以这里只勾选了babel和scss.

## 修改文件夹

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33c496830f9b43db8db72a5361105b18~tplv-k3u1fbpfcp-watermark.image?)

首先需要创建一个 **packages** 目录，用来存放组件
然后将 src 目录改为 **examples** 用作示例

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be5375a3878f46d9bb4687113f06f073~tplv-k3u1fbpfcp-watermark.image?)

## 添加vue.config.js

启动项目的时候，默认入口文件是 src/main.js
将 src 目录改为 examples 之后，就需要重新配置入口文件
在根目录下创建一个 [vue.config.js](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fconfig%2F%23vue-config-js "https://cli.vuejs.org/zh/config/#vue-config-js") 文件

```js
// vue.config.js

module.exports = {
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  }
}
```

完成这一步之后就可以正常启动项目了

vue-cli 3.x  提供了[构建库](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fbuild-targets.html%23%25E5%25BA%2593 "https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93")的命令，所以这里**不需要再为 packages 目录配置 webpack**

## 开发组件

之前已经创建了一个 packages 目录，用来存放组件
该目录下存放每个组件单独的开发目录，和一个 index.js 整合所有组件，并对外导出
每个组件都应该归类于单独的目录下，包含其组件源码目录 src，和 index.js 便于外部引用
这里以 MyText 组件为例，完整的 packages 目录结构如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b4d2d0092234f5fadba88ac9d7b1e96~tplv-k3u1fbpfcp-watermark.image?)

组件内部导出组件本身

```vue
// MyText/src/main.vue
<template>
  <div
    style="
      width: 800px;
      height: 80px;
      margin-left: 60px;
      margin-top: 60px;
      background-color: black;
    "
  >This is a text</div>
</template>

<script>
export default {
  name: "my-text",
  mounted() {
    console.log("mounted!");
  },
};
</script>

```
```js
// MyText/index.js
// 导入组件，组件必须声明 name
import MyText from "./src/main.vue";

// 为组件添加 install 方法，用于按需引入
MyText.install = function (Vue) {
  Vue.component(MyText.name, MyText);
};

export default MyText;

```

## 整合导出所有组件

```js
// 导入单个组件
import MyText from "./MyText/index";

// 以数组的结构保存组件，便于遍历
const components = [MyText];

// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  // 遍历并注册全局组件
  components.map((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components,
};

```

现在组件就开发完毕了。
可以在 **examples/main.js** 中引入该组件

```js
import MyText from "../packages/index";
Vue.use(MyText);
```

这时候可以 npm run serve 启动项目，测试一下组件是否有 bug
启动前需要确保已经在 vue.config.js 中添加了新入口 examples/main.js

## 打包组件

vue-cli提供了一个[库文件打包命令](https://link.juejin.cn?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fbuild-targets.html%23%25E5%25BA%2593 "https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93")
主要需要四个参数：
1.  **target**: 默认为构建应用，改为 **lib** 即可启用构建库模式
2.  **name**: 输出文件名
3.  **dest**: 输出目录，默认为 dist，这里我们改为 **lib**
4.  **entry**: 入口文件路径，默认为 src/App.vue，这里改为 **packages/index.js**

基于此，在 package.json 里的 scripts 添加一个 **lib** 命令

```json
{
  "scripts": {
    "lib": "vue-cli-service build --target lib --name my-text --dest lib packages/index.js"
  }
}
```

然后执行 **npm run lib** 命令，编译组件。

## 准备发布

首先需要在 **package.json** 添加组件信息
**name:** 包名，该名不能和已有的名称冲突；
**version:** 版本号，不能和历史版本号相同；
**description:** 简介；
**main:** 入口文件，应指向编译后的包文件；
**keyword：** 关键字，以空格分割；
**author：** 作者；
**private：** 是否私有，需要修改为 false 才能发布到 npm；
**license：** 开源协议。

```json
  "name": "vue-yyd-cut",
  "version": "0.1.3",
  "description": "my-text",
  "main": "lib/my-text.umd.min.js",
  "keyword": "vue directive short cut focus",
  "author": "yyd2021",
  "private": false,
  "license": "MIT",
```

然后创建   **.npmignore** 文件，设置忽略文件
该文件的语法和 .gitignore 的语法一样，设置发布到 npm 时忽略哪些目录或文件，不设置的话会直接采用.gitignore规则。

```
//.gitignore
.DS_Store
node_modules
/dist
/lib
/src
/packages
/public
vue.config.js
babel.config.js
*.map
*.html

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## 最后，发布

```
npm config set registry https://registry.npmjs.org
```

如果没有 npm 账户，可以通过 **npm adduser** 命令创建一个账户，或者到 [npm 官网](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com "https://www.npmjs.com")注册
如果在官网注册的账户，或者以前就有账户，就使用 **npm login** 命令登录
具体流程可以参考[官方文档](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.cn%2Fgetting-started%2Fpublishing-npm-packages%2F "https://www.npmjs.cn/getting-started/publishing-npm-packages/")

**在发布之前，一定要确保组件已经编译完毕，而且 package.json 中的入口文件（main）的路径正确**

一切就绪，发布组件：

```
npm publish
```

发布后，就可以通过以下方式引入到自己的项目中了。

```
npm install --save vue-yyd-cut
```

```
import MyText from "vue-yyd-cut";
Vue.use(MyText);
```





















