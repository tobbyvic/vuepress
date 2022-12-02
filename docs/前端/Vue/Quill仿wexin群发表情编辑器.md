```vue
<template>
  <div>
    <div id="editor" class="editor-wrapper">
      <p>Hello World!</p>
      <p><br /></p>
    </div>
    <el-button @click="addEmotion">添加表情</el-button>
    <el-button @click="send">生成内容</el-button>
    <el-button @click="initContent">初始化内容</el-button>
  </div>
</template>
<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
const urlArray = [
  "[https://res.wx.qq.com/mpres/htmledition/images/icon/common/emotion_panel/smiley/smiley_546c7e6.png](https://res.wx.qq.com/mpres/htmledition/images/icon/common/emotion_panel/smiley/smiley_546c7e6.png)",

  "[https://res.wx.qq.com/mpres/htmledition/images/icon/common/emotion_panel/smiley/smiley_046c7e6.png](https://res.wx.qq.com/mpres/htmledition/images/icon/common/emotion_panel/smiley/smiley_046c7e6.png)",

  "[https://res.wx.qq.com/mpres/htmledition/images/icon/common/emotion_panel/smiley/smiley_1346c7e6.png](https://res.wx.qq.com/mpres/htmledition/images/icon/common/emotion_panel/smiley/smiley_1346c7e6.png)",
];
const altArray = ["流泪", "微笑", "呲牙"];
export default {
  name: "QuillEditor",
  mounted() {
    this.initQuill();
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },
  methods: {
    initQuill() {
      const toolbarOptions = [];
      const quill = new Quill("#editor", {
        modules: {
          toolbar: toolbarOptions,
        },
      });
      this.quill = quill;
      this.quill.on("text-change", this.textChange);
    },
    /* 文本改变的回调 */
    textChange(delta, oldDelta, source) {
      console.log(this.quill.root.innerHTML);
      // 将其中的image过滤掉
      console.log(this.quill.getText());
    },
    /* 拿到数据库的内容后初始化一下 */
    initContent() {
      this.quill.setText(
        "sfdsdf\n" + "dsfgdfg\n" + "nbvn\n" + "[微笑]\n" + "[呲牙]\n" + "fff"
      );
      const htmlStr = this.quill.root.innerHTML;
      this.textToImg(htmlStr);
    },
    /* 递归将text节点替换成img */
    textToImg(htmlStr) {
      // if (rootNode.hasChildNodes()) {
      // [...rootNode.childNodes].forEach((node) => {
      // // 如果子节点中有img节点，用[]替换img节点
      // console.log(node.textContent);
      // node.textContent = node.textContent.replace(/\[(.+?)\]/g, (...args) => {
      // const index = altArray.indexOf(args[1]);
      // return `<img src="${urlArray[index]}" />`;
      // });
      // });
      // }
      this.quill.root.innerHTML = htmlStr.replace(/\[(.+?)\]/g, (...args) => {
        const index = altArray.indexOf(args[1]);
        return `<img src="${urlArray[index]}" width="20px"/>`;
      });
    },
    /* 添加表情 */
    addEmotion() {
      const range = this.quill.getSelection();
      if (range) {
        let index = range.index;
        // this.quill.insertEmbed(index, 'image', {emotion_id: 0}, '/static/wx/0.png');
        this.insertEmotion(index, 0);
      } else {
        // 编辑器未focus
        let index = this.quill.getLength() - 1;
        // this.quill.insertEmbed(index, 'image', {emotion_id: 0}, '/static/wx/0.png');
        this.insertEmotion(index, 0);
      }
    },
    /* 插入表情 */
    insertEmotion(index, id) {
      // this.quill.insertEmbed(index, 'image', {
      // src: `/static/wx/${id}.png` // any url
      // }, 'api');
      this.quill.insertEmbed(index, "image", `/static/wx/微笑.png`);
    },
    /* 点击按钮的回调 */
    send() {
      // if (this.quill.hasFocus()) {
      // const range = this.quill.getSelection();
      // console.log(range);
      // } else {
      // console.log('未获取焦点');
      // }
      // const range = this.quill.getSelection();
      // if (range) {
      // let index = range.index;
      // // this.quill.insertEmbed(index, 'image', {emotion_id: 0}, '/static/wx/0.png');
      // this.insertEmotion(index, 0);
      // } else {
      // // 编辑器未focus
      // let index = this.quill.getLength() - 1;
      // // this.quill.insertEmbed(index, 'image', {emotion_id: 0}, '/static/wx/0.png');
      // this.insertEmotion(index, 0);
      // }
      // this.quill.root.innerHTML = '<p><br></p>';
      // this.quill.setText('sfdsdf\n' +
      // 'dsfgdfg\n' +
      // 'nbvn\n' +
      // '[色][撇嘴][微笑]\n' +
      // 'fff');
      const rootNode = this.quill.root;
      this.imgToText(rootNode);
    },
    /* 递归将img节点替换成text */
    imgToText(rootNode) {
      if (rootNode.hasChildNodes()) {
        [...rootNode.childNodes].forEach((node) => {
          // 如果子节点中有img节点，用[]替换img节点
          if (node.nodeName === "IMG") {
            const text = altArray[urlArray.indexOf(node.src)];
            const tNode = document.createTextNode(`[${text}]`);
            rootNode.replaceChild(tNode, node);
          }
          this.imgToText(node);
        });
      }
    },
  },
};

</script>

<style lang="stylus">
.editor-wrapper {
	border 1px solid #cccccc
}
</style>
```