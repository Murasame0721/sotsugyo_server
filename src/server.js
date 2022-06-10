/*
 * 这个组件用于管理数据库
 * 功能包括：查询记录数、得到所有记录、得到所有用户的名字、创建和修改记录
*/

const { Record } = require('../module.js')
//导入mongoose接口

const records = {};

records.amount = async function () {
    //查询records的条数
    const allRecords = await Record.find();
    let amount = allRecords.length;
    amount++
    return amount
}

records.all = async function(){
    //查询所有records
    return await Record.find();
}

records.allName = async function(){
    //查询现有所有用户
    const allName = [];
    const all = await records.all();
    all.forEach(element => {
        allName.push(element.name)
    });
    return allName
}

records.newOne = async function(information){
    //创建记录

    if (!information.name)  throw 'information error: no user name';
    if (!information.gender) throw 'information error: no user gender';
    let condition = false;
    for (const iterator of information) {
        condition = condition || iterator
    }
    if(!condition) throw 'information error: no contact details' 
    //防止空信息

    const sended = {}
    const contactDetails = ['weChatId','qqNumber','phoneNumber','telegramId','email'];
    const fetureMessage = ['exceptedMark','exceptedUniversity','comment']
    contactDetails.forEach(element => {
        if (information[element]) {
            sended[element] = information[element]
        }
    });
    fetureMessage.forEach(element => {
        if (information[element]) {
            sended[element] = information[element]
        }
    });
    //整理信息

    const record = await Record.create(sended);
    return record
}

records.findOne = async function(name){
    return Record.findOne({
        name: name
    })
}

records.edit = async function(name,information){
    //更改记录

    if(!await records.findOne(name)) throw 'program error: try to edit a record which does not exist ';
    //防止奇葩错误

    let result = undefined;
    result = await Record.updateOne({name:name},information);
    return result
}