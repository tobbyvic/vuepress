1. 单行文本溢出

```css
.wrapper {
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3; // 行数
	overflow: hidden;
}
```

2. 多行文本溢出

```css
p{
	max-width: 100px;
	position: relative;
	line-height: 1.4em;
	height: 4.2em;
	overflow: hidden;
}

p::after{
	content: "...";
	position: absolute;
	bottom: 0;
	right: 0;
	padding-left: 40px;
	background: -webkit-linear-gradient(left, transparent, #fff 55%);
	background: -o-linear-gradient(right, transparent, #fff 55%);
	background: -moz-linear-gradient(right, transparent, #fff 55%);
	background: linear-gradient(to right, transparent, #fff 55%);
}
```