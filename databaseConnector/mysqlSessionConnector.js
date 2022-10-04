const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const connection = require('./mysqlConnector');
const dotenv = require('dotenv');
dotenv.config();//.env를 환경변수로 사용

const options={
    host:process.env.HOST,
    post:3306,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:'',
    clearExpired:true,
    createDatabase:true,
    endConnectionOnClose:true,
    schema:{
        tableName:'sessions',
        columNames:{
            session_id:'session_id',
            expires:'expires',
            data:'data'
        }
    }
}

const sessionStore = new MySQLStore(options);

// const sessionStore = new MySQLStore({
//     clearExpired:true,
//     createDatabase:true,
//     endConnectionOnClose:true,
//     schema:{
//         tableName:'sessions',
//         columNames:{
//             session_id:'session_id',
//             expires:'expires',
//             data:'data'
//         }
//     }
// },connection);

module.exports = sessionStore;