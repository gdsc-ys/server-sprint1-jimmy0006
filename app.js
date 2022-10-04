const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();//.env를 환경변수로 사용
const path = require('path');



const mysqltest = require('./routes/mysql/index');
const redistest = require('./routes/redis/index');
const testData = require('./routes/mysql/testData');

const app = express();

app.set('port',process.env.PORT||3000);

//morgan 설정
app.use(morgan('dev'));//로그 보기

//static 설정
app.use('/',express.static(path.join(__dirname,'template')));//정적인 파일들을 제공하는 라우터. /template안에 있는 폴더에 외부에서 쉽게 접근할 수 있다.

//body-parser 설정
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//cookie-parser 설정
app.use(cookieParser(process.env.COOKIE_SECRET));

//express-session 설정
const session = require('express-session');
const MySQLStore=require('express-mysql-session')(session);
const redis = require('redis');
const client = redis.createClient({
    url:`redis://127.0.0.1:6379`,
    legecyMode: true
});
client.on("error", console.error)
const serverRedis=require('./databaseConnector/serverRedisConnector');
const RedisStore = require('connect-redis')(session);
app.use('/',async (req,res,next)=>{
    await client.connect().catch(error=>{});
    next();
})
app.use(session({
secret:process.env.COOKIE_SECRET,
resave:false,
saveUninitialized:true,
store: new MySQLStore({
    host:process.env.HOST,
    post:3306,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:'session'
})
// store: new RedisStore({
//     host: "127.0.0.1",
//     port: 6379,
//     client: client,
//     prefix : "session:",
//     db : 0
// })
}));

app.use('/mysql',mysqltest);
app.use('/redis',redistest);
app.use('/testdata',testData);

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중')
})
