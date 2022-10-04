const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();//.env를 환경변수로 사용

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
});

module.exports = connection;