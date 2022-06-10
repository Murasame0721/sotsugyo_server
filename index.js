const express = require('express')
const app = express()
const port = 3000
//导入express

const qs = require('qs');

const { records } = require('./src/server')

app.use(express.json());
//使得响应为json

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "*/*;charset=utf-8");
    next();
});
//跨域

app.get('/records/:userName', (req, res) => {
    res.send(records.readOne(req.params.userName))
})

app.get('/hello', () => console.log('Hello World!'))

app.post('/', function (req, res) {
    const respons = {};
    try {

        res.send('POST request to the homepage')
    } catch (error) {
        respons.success = false;
        respons.reason = error;
        res.sendStatus(404).send(respons)
    }
})

app.listen(port, () => console.log(`Server starts on port:${port} ${port}!`))