> JavaScript 模块化规范，包括原生规范 [ES6](https://so.csdn.net/so/search?q=ES6&spm=1001.2101.3001.7020) 模块、Node.js 采用的 CommonJS，以及开源社区早期为浏览器提供的规范 AMD，具有 CommonJS 特性和 AMD 特性的 CMD，让 CommonJS 和 AMD 模块跨端运行的 UMD。

## Common JS

> nodejs中使用的规范

CommonJS规范规定: 每个js文件就是一个模块，有自己的作用域。  
在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。  
如果要暴露给其他程序，需要以`module.exports`导出接口，以`require`引入模块。

### 举例：

```js
//test.js
const name = 'pjy';
const age = 19;

function sayHello(name) {
  console.log("hello " + name);
}
module.exports = {
  name,
  age,
  sayHello
}

//main.js
const a = require('./test');
console.log(a.age);//19
console.log(a.sayHello);//[Function: sayHello]
```

### 模块的加载过程

结论一：模块在被第一次引入时，模块中的js代码会被运行一次

结论二：模块被多次引入时，会缓存，最终只加载（运行）一次
为什么只会加载运行一次呢？
这是因为每个模块对象module都有一个属性：loaded。
为false表示还没有加载，为true表示已经加载；

结论三：如果有循环引入，那么加载顺序是什么？
如果出现下图模块的引用关系，那么加载顺序是什么呢？
这个其实是一种数据结构：图结构；
图结构在遍历的过程中，有深度优先搜索（DFS, depth first search）和广度优先搜索（BFS, breadth first search）；
Node采用的是深度优先算法：main -> aaa -> ccc -> ddd -> eee ->bbb

![[Pasted image 20221017172752.png]]

## AMD和CMD规范

> AMD规范和CMD规范都是应用于浏览器的模块规范，且都是用 **定义和引用** 的语法规则，因不太常见，这里就不再赘述了。比较常见的浏览器端的是**ES6原生规范**，node端的是**CommonJS规范**

## ES6 Module(或者 ES Module)

ES Module和CommonJS的模块化有一些不同之处：

一方面它使用了import和export关键字；
另一方面它采用编译期的静态分析，并且也加入了动态引用的方式；

ES Module模块采用export和import关键字来实现模块化：

export负责将模块内的内容导出；
import负责从其他模块导入内容；

**采用ES Module将自动采用严格模式：use strict**

* 虽然大部分主流浏览器支持 ES6 模块，但是和引入普通 JS 的方式略有不同，需要在对应 script 标签中将属性 type 值设置为“module”才能被正确地解析为 ES6 模块

```html
<script src="./main.js" type="module"></script>
```

* 在 Node.js 下使用 ES6 模块则需要将文件名后缀改为“.mjs”，用来和 Node.js 默认使用的 CommonJS 规范模块作区分。

- ES6 模块对于引用声明有严格的要求，首先必须在文件的首部，不允许使用变量或表达式，不允许被嵌入到其他语句中。所以下面 3 种引用模块方式都会报错。

```js
// 必须首部声明
let a = 1
import { app } from './app';
// 不允许使用变量或表达式
import { 'a' + 'p' + 'p' } from './app';
// 不允许被嵌入语句逻辑
if (moduleName === 'app') {
  import { init } from './app';
} else {
  import { init } from './bpp';
}
```

### exports关键字导出

- 方式一：在语句声明的前面直接加上export关键字

```js
export const name = "pjy"; 
export const age = 19;
```

- 方式二：将所有需要导出的标识符，放到export后面的{}中
 - 注意：这里的{}里面不是ES6的对象字面量的增强写法，{}也不是表示一个对象的;  所以： export {name: name}，是错误的写法；

```js
const name = "pjy"; const age = 19; function foo() { console.log("foo function"); } export { name, age, foo }
```

- 方式三：导出时给标识符起一个别名

```js
const name = "pjy";
const age = 19;
function foo() {
  console.log("foo function");
}
export {
  name as fName,
  age as fAge,
  foo as fFoo
}

//此时导入时要用别名导入
import {fName,fAge} from "./foo.js"
```

### import关键字(导入)

- 方式一：import {标识符列表} from ‘模块’；注意：这里的{}也不是一个对象，里面只是存放导入的标识符列表内容；

```js
import {name,age} from "./foo.js"
```

- 方式二：导入时给标识符起别名

```js
import {name as fName,age as fAge} from "./foo.js"
```

- 方式三：通过* 将模块功能放到一个模块功能对象（a module object）上

```js
import * as foo from "./foo.js" //在使用时 console.log(foo.name); console.log(foo.age);
```

### export和import结合使用

这里是在当前js文件中导入math.js 和 format.js，然后统一将导入的模块以当前文件的形式导出

```js
import {add, sub} from './math.js'
import {timeFormat, priceFormat} from './format.js'

export {
  add,
  sub,
  timeFormat,
  priceFormat
}
```

### default用法

**在一个模块中，只能有一个默认导出（default export）**。

-   默认导出export时可以不需要指定名字；
-   在导入时不需要使用{}，并且可以自己来指定名字；

```js
//foo.js
const foo = "foo value";
export default foo;

//main.js
import pjy from "./foo.js"
console.log(pjy);//foo value
```

注：
部分内容为转载的文章内容。
原文链接：https://blog.csdn.net/weixin_52834435/article/details/123896045。