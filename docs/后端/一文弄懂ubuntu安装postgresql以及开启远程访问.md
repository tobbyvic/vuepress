### 0. linux安装postgresql

#### Step 1 — Installing PostgreSQL

To install PostgreSQL, first refresh your server’s local package index:

```bash
sudo apt update
```

```bash
sudo apt install postgresql postgresql-contrib
```

Copy

Run

Ensure that the service is started:

```bash
sudo systemctl start postgresql.service
```

#### Step 2 — Using PostgreSQL Roles and Databases

```bash
sudo -i -u postgres
```

```bash
psql
```

```bash
\q
```

```bash
exit
```

```bash
sudo -u postgres psql
```

```bash
\q
```

#### Step 3 — Creating a New Role

If you are logged in as the **postgres** account, you can create a new role by running the following command:

```bash
createuser --interactive
```

```bash
sudo -u postgres createuser --interactive
```

```
OutputEnter name of role to add: sammy
Shall the new role be a superuser? (y/n) y
```

#### Step 4 — Creating a New Database

Another assumption that the Postgres authentication system makes by default is that for any role used to log in, that role will have a database with the same name which it can access.

This means that if the user you created in the last section is called **sammy**, that role will attempt to connect to a database which is also called “sammy” by default. You can create the appropriate database with the `createdb` command.

If you are logged in as the **postgres** account, you would type something like the following:

```bash
createdb sammy
```

If, instead, you prefer to use `sudo` for each command without switching from your normal account, you would run:

```bash
sudo -u postgres createdb sammy
```

#### Step 5 — Opening a Postgres Prompt with the New Role

To log in with `ident` based authentication, you’ll need a Linux user with the same name as your Postgres role and database.

If you don’t have a matching Linux user available, you can create one with the `adduser` command. You will have to do this from your non-**root** account with `sudo` privileges (meaning, not logged in as the **postgres** user):

```bash
sudo adduser sammy
```

Once this new account is available, you can either switch over and connect to the database by running the following:

```bash
sudo -i -u sammy
psql
```

Or, you can do this inline:

```bash
sudo -u sammy psql
```

This command will log you in automatically, assuming that all of the components have been properly configured.

If you want your user to connect to a different database, you can do so by specifying the database like the following:

```bash
psql -d postgres
```

Once logged in, you can get check your current connection information by running:

```bash
\conninfo
```

```
OutputYou are connected to database "sammy" as user "sammy" via socket in "/var/run/postgresql" at port "5432".
```



### 1. 修改PostgreSQL数据库默认用户postgres的密码

PostgreSQL数据库创建一个postgres用户作为数据库的管理员，密码随机，所以需要修改密码，方式如下：

步骤一：登录PostgreSQL

```
sudo -u postgres psql
```

步骤二：修改登录PostgreSQL密码

```
ALTER USER postgres WITH PASSWORD 'postgres';
```

**注：**

- 密码postgres要用引号引起来
- 命令最后有分号

步骤三：退出PostgreSQL客户端

```
\q
```

### 2. 修改linux系统postgres用户的密码

PostgreSQL会创建一个默认的linux用户postgres，修改该用户密码的方法如下：

步骤一：删除用户postgres的密码

```
sudo passwd -d postgres
```

步骤二：设置用户postgres的密码

```
sudo -u postgres passwd
```

系统提示输入新的密码

```
Enter new UNIX password:``Retype new UNIX password:``passwd``: password updated successfully
```

### 3. 设置外网访问：

查找文件位置

```
sudo find / -name pg_hba.conf
```

修改配置文件 [postgresql](https://so.csdn.net/so/search?q=postgresql&spm=1001.2101.3001.7020).conf

```java
listen_addresses = '*'
1
```

修改pg_hba.conf 在原来的host下面新加一行

```java
host all all 0.0.0.0/0 password
1
```

最后重启Postgres服务

```
sudo systemctl restart postgresql.service
```

