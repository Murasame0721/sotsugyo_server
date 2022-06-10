# sotsugyo_server

## 名称含义

卒業(so tsu gyo)
同学录服务端

## 功能

作为同学录的服务器端

## 同学录内容

必填项：

+ 姓名
+ 性别
+ 任意一种联系方式（这里由前端实现）

具体来说，联系方式可以有：

+ 手机号
+ QQ
+ 微信
+ Telegram
+ 邮箱

选填项：

+ 预期分数
+ 预期大学
+ 寄语

## 请求


### 请求格式

#### get请求

get请求只会用于请求用户在数据库中的信息

参数应为userName=xxx

#### post请求

post请求只会发送用户填写的表单

以json请求，以下是一个样例
```
{
    "name": "小明",
    "gender": 0,
    "phoneNumner": 1234567890,
    "qqNumber": 12345678,
    "weChatId": "xxx",
    "telegramId": "xxx",
    "email": "xxx@example.com",
    "exceptedMark": 400,
    "exceptedUniversity": "新疆大学",
    "comment": "希望每一天都能遇到更好的自己"
}
```

### 请求的处理方法

#### get请求

参见代码

#### post请求

首先，根据name判断是否之前已经填写过