/**
 * 这个组件用于连接数据库、并完成一系列基本操作
 */

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/sotsugyo',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const RecordSchama = new mongoose.Schema({
    userName:{
        type:String,
        unique:true
    },
    gender: {
        type: Number
    },
    exceptedMark: {
        type: Number,
    },
    exceptedUniversity:{
        type: String
    },
    phoneNumber: {
        type:Number,
        unique:true
    },
    qqNumber: {
        type:Number,
        unique:true
    },
    weChatId:{
        type:String,
        unique:true
    },
    telegramId:{
        type:String,
        unique: true
    },
    email:{
        type:String,
        unique:true
    },
    comment:{
        type:String
    }
})

const Record = mongoose.model('Record', RecordSchama);

module.exports = {
    Record
}