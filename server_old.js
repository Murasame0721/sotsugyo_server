const express = require('express');
const app = express();
const port = 3000;
const {
    Record
} = require('./module');


app.use(express.json());

//跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "*/*;charset=utf-8");
    next();
});

const recordIn = async function (type, content, sender) {
    //查询现有记录的条数
    const allRecord = await Record.find();
    let recordId = allRecord.length;
    recordId++;

    //记录信息
    const record = await Record.create({
        recordType: type,
        recordContent: String(content),
        recordId: recordId,
        sender: sender
    });
    return
}


app.get('/api', (req, res) => {
    res.send('Hello World!')
})


/**
 * 这里是一般用途的api，用于普通用户
 * 包括：
 * /api/login
 * /api/allRecord
 * /api/sendMessage
 */


app.post('/api/login', async (req, res) => {
    //登录程序，返回User对象
    const user = await User.findOne({
        key: req.body.key
    });
    if (!user) {
        return res.status(422).send({
            message: '密钥错误'
        })
    }
    res.send(user);
})



app.post('/api/sendMessage', async (req, res) => {
    //客户端发送信息
    const user = await User.findById(req.headers.authorization);
    if (!(user || (req.body.recordType != 'text'))) {
        return res.sendStatus(422).send('验证错误');
    }
    try {
        recordIn('text', req.body.message, user.name);
        return res.send('发送成功');
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

/**
 * 这是管理员用的api
 * 接口统一为/api/admin
 * 根据json中传的command参数决定
 * registerAdmin用于创建唯一的管理员账号
 * 为方便判断某个账号是否是管理员账号，定义函数isAdmin
 * registerUser用于创建普通用户账号
 * message用于发送信息
 *      管理员可以发送两种信息：
 *      1.普通的文本信息
 *      2.分支（如同galgame）
 * allUser用于查询所有用户
 */


app.post('/api/admin', async (req, res) => {
    //管理员接口

    if (req.body.command === 'registerAdmin') {
        //注册管理员
        if (await User.findOne({
                name: "admin"
            })) {
            //管理员已注册，报错
            return res.sendStatus(403);
        } else {
            //管理员未注册，创建账号
            const user = await User.create({
                key: "rsny4F5DA2",
                name: "admin"
            });
            return res.send(user);
        }
    }

    const isAdmin = async function (a) {
        //用于判断是否是管理员的函数
        if (await User.findById(a)) {
            return true
        } else {
            return false
        }
    };

    if (req.body.command === 'registerUser') {
        //注册普通用户
        try {
            if (!(await isAdmin(req.headers.authorization))) {
                throw '验证错误'
            }
            const user = await User.create({
                key: req.body.key,
                name: req.body.name
            });
            return res.send(user);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    if (req.body.command === 'message') {
        //管理员发送信息
        try {
            if (!isAdmin(req.header.authorization)) {
                return res.sendStatus(422).send('验证错误');
            }

            if (req.body.recordType === 'fork') {
                //记录一个分支
                recordIn('fork', JSON.stringify(req.body.message), 'admin');
                return res.send('记录分支成功');
            }

            if (req.body.recordType === 'text') {
                //记录一段文本
                recordIn('text', req.body.message, 'admin');
                return res.send('记录文本成功')
            }

            res.sendStatus(500).send('错误，未知的命令类型')
        } catch (error) {
            res.sendStatus(500).send(error)
        }
    }

    if (req.body.command === "allUser") {
        try {
            if (!(await isAdmin(req.headers.authorization))) {
                throw '验证错误'
            }
            return res.send(await User.find())
        } catch (error) {
            return res.sendStatus(500).send(error);
        }

    }

    res.sendStatus(500);
})

app.listen(port, () => {
    console.log(`Server starts on port:${port}
Now, it is time for enjoying the time of love XD`)
})