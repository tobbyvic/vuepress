##### 一、问题简介

监控目录下所有文件，只要有文件更新就立刻重启。

##### 二、解决方案

###### 1、`--watch`

-   监控项目目录下所有文件，任意文件有改动，就自动重启 node.js 项目。

```js
# 1、安装 pm2
npm install pm2 @latest -g
# or
yarn global add pm2

# 2、转到 node.js 项目根目录下
cd < 项目根目录 >

# 3、用 pm2 启动 node.js 项目，项目目录下有文件改动就重启
pm2 start app.js--watch

# 现在就可以正常访问 node.js 项目了，且可以查看项目状态
pm2 list
pm2 log
```

###### 2、`--ignore-watch`

-   可以去除一些不需要监控的目录或文件。

```js
# 监控除了  node_modules 目录以外文件
pm2 start app.js --watch --ignore-watch="node_modules"
```

###### 3、配置文件中设置监控的方法

-   情况1：监控和忽略具体文件

```js
module.exports = {
    script: "app.js",
    // 监控这两个文件夹
    watch: ["server", "client"],
    // 监控时间间隔
    watch_delay: 1000,
    // 忽略这两个文件夹
    ignore_watch: ["node_modules", "client/img"],
}
```

-   情况2：监控项目目录下所有文件

```js
module.exports = {
    script: "app.js",
    watch: true
}
```

##### 三、restart 与 reload 区别

-   restart 会杀掉现有进程 并 启动新进程，服务会中断；
-   reload 不会杀掉现有进程，在现有进程重新加载，服务不会中断；

```js
# 只有 app_name 这个应用被reload
pm2 reload <app_name>

# 配置文件中所有应用都被reload
pm2 reload process.json

# 只有配置文件中的api应用被reload
pm2 reload process.json --only api
```

##### 四、参考文档

-   [PM2用监控模式实时更新Node.js项目！](https://learn-anything.cn/pm2-node-js-change-restart)