1、√
```html
<img src="./assets/images/01.jpg" alt=""> // √

// 编译后:

<img src="/img/01.f0cfc21d.jpg" alt="">
```

最常见的引入方式，路径是固定的字符串，图片会被webpack处理，文件若丢失会直接在编译时报错，生成的文件包含了哈希值。

1、×
```html
<img :src="'./assets/images/02.jpg'" alt=""> // ×

// 编译后:

<img src="./assets/images/02.jpg" alt="">
```

错误的引入方式，使用 :src 调用了 v-bind 指令处理其内容，相对路径不会被webpack的 file-loader 处理。

2、√
```vue
<img :src="require('./assets/images/03.jpg')" alt=""> // √

<img :src="require('./assets/images/'+ this.imgName +'.jpg')" alt=""> // √

<img :src="img3" alt=""> // √

<script>

export default:{

data(){

return {

imgName:'03.jpg',

img3:require('./assets/images/03.jpg'),

}

},

}

</script>

// 编译后:

<img src="/img/03.ea62525c.jpg" alt="">
```

当路径的文件名需要拼接变量的时候，可使用 require() 引入，在 template 的 :src 或者 script 的 data computed 中都可以进行 require 引入或拼接。

3、√
```vue
<img src="/images/04.jpg" alt=""> // -

// 编译后:

<img src="/images/04.jpg" alt="">
```

用绝对路径引入时，路径读取的是public文件夹中的资源，任何放置在 public 文件夹的静态资源都会被简单的复制到编译后的目录中，而不经过 webpack特殊处理，在index.html引入js时也可以将js文件放在public文件夹中进行引入。

注意：当你的应用被部署在一个域名的根路径上时，比如 [http://www.abc.com/](http://www.abc.com/) ，此时这种引入方式可以正常显示，但是如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀，publicPath 是部署应用包时的基本 URL，在 vue.config.js 中进行配置，详情参阅 [官方文档](https://cli.vuejs.org/zh/guide/)。

```vue
<img :src="this.publicPath + 'images/05.jpg'" alt=""> // √

// 编译后:

<img src="/foo/images/05.jpg" alt="">

<script>

export default:{

data(){

return {

publicPath: process.env.BASE_URL,

}

},

}

</script>
```

vue.config.js中

```js
//vue.config.js

module.exports = {

publicPath:'/foo/',

...

}
```

引入publicPath并且将其拼接在路径中，实现引入路径的动态变动。