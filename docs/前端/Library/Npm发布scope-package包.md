经常有看到`@xxx/yyy`类型的开源npm包，尝试修改`package.json`的name属性为`@xxx/yyy`，npm却提示发布报错，有点懵！按以下步骤走一遍.

## 一 注册npm账号

去npm上注册自己的账号。

## 二 进入我的账号

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f13ad1aafe441fd8dab754e0688e098~tplv-k3u1fbpfcp-watermark.image?) ![](https://juejin.cn/editor/drafts/7132759816509849631) ![](https://juejin.cn/editor/drafts/7132759816509849631)

发布public库免费且无限制，发布private库需要收费7$/mon，填写好自己的组织名称，如`abc`，这里不需要添加@符号

### npm包初始化

1.  先登录npm

```
npm login
复制代码
```

2.  初始化普通npm项目

```bash
cd project
npm init
复制代码
```

3.  初始化npm scope包项目

```ini
cd project
npm init --scope=andy
复制代码
```

### 发布npm包

发布普通npm包，需要确认未重名。

```
npm publish
复制代码
```

发布scoped package

修改包名

```json
// package.json 
"name": "@andy/xxx",  
"version": "1.0.0",
复制代码
```

发布，需要指定发布公有项目

```ini
npm publish --access=public
复制代码
```

发布结束

## 三 使用

和普通npm包一样先 npm install --save @andy/***

main.js

```javascript
import VueYydCut from "@andy/***";
Vue.use(VueYydCut); // 这里直接use一下主体就好，就像element-ui一样，直接就可以使用组件了。
```

组件里直接使用即可。