1.  flex布局

```css
div.parent {
	display: flex;
	justify-content: center;
	align-items: center;
}
```

2.  子元素absolute

```css
div.parent {
	position: relative;
}

div.child {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
```

3.  grid布局

```css
div.parent {
	display: grid;
}

div.child {
	justify-self: center;
	align-self: center;
}
```

4.  table-cell

```css
div.parent {
	display: table;
}

div.child {
	display: table-cell
	vertical-align: middle;
	text-align: center;
}
```

5.  flex + auto

```css
div.parent{
	display:flex;
}

div.child{
	margin:auto;
}
```