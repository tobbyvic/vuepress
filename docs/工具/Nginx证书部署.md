证书部署可以直接参考腾讯云官方文档

https://cloud.tencent.com/document/product/400/35244

### nginx 快速查看配置文件路径的方法

1. 查看nginx的服务路径

```shell
ps aux|grep nginx
```

![[Pasted image 20221130134617.png]]

nginx的路径为：/usr/sbin/nginx

### 查看nginx配置文件路径

使用nginx的 `-t` 参数进行配置检查，即可知道实际调用的配置文件路径及是否调用有效。

```shell
/usr/sbin/nginx -t
```

![[Pasted image 20221130134756.png]]

可以看到nginx.conf的路径在

```
/etx/nginx/nginx.conf
```

nginx 的配置很灵活,支持include配置文件,如果配置内容过多， 这个文件就会比较乱, 也影响管理和阅读.所以直接拆分出来,分成不同的配置文件；怎么实现呢 ？直接include：

```
include /etx/nginx/conf.d/*.conf;
include /etc/nginx/sites/pstest.conf;
```

### PS

未防止搞得混乱，101.43.113.93 服务器上的配置文件在

```
/etc/nginx/sites-enabled/default
```

所有的https和http配置都放在这个里面。

* 一些常用的nginx命令

```
sudo systemctl restart nginx 重启
sudo systemctl start nginx 启动
sudo systemctl stop nginx 停止
```




