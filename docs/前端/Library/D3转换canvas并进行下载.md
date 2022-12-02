### 废话不多说，直接上代码。

```js
// 下载svg

    downloadpng() {

      // var $svg = d3.select("#" + "phasechart" + id); // 获取到d3图

      let rootNode = document.getElementById(`${this.phaseId}`);

      console.log("rootNode", rootNode);

      var serializer = new XMLSerializer();

      var source =

        '<?xml version="1.0" standalone="no"?>\r\n' +

        serializer.serializeToString(rootNode);

  

      var image = new Image();

      image.src =

        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

  

      image.onload = () => {

        var canvas = document.createElement("canvas");

        canvas.width = 575;

        canvas.height = 500;

        var context = canvas.getContext("2d");

        // context.fillStyle = "#fff"; // 设置保存后的PNG 是白色的

        // context.fillRect(0, 0, 575, 500);

        context.drawImage(image, 0, 0, 575, 500, 0, 0, 575, 500);

        var url = canvas.toDataURL("image/png"); // 这就是得到的base64编码

        var pngName = `${this.phaseId}`;

        var a = document.createElement("a");

        a.download = pngName + ".png";

        a.href = url;

        a.click();

      };

    }

```

注意这里要获取根节点，而不是`g`标签。
因为`serializer.serializeToString(rootNode);`中的传参要是原生获取的dom根节点。