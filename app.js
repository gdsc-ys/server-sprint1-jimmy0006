const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const dotenv = require('dotenv');
const path = require('path')
const mysql = require('mysql');

dotenv.config();//.env를 환경변수로 사용
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const app = express();
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    //password:process.env.PASSWORD,
    database:process.env.DATABASE
});
connection.connect();

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
app.use(session({
    resave:false, //세션에 수정사항이 없더라도 다시 저장
    saveUninitialized:false, //세션에 저장할 내역이 없더라도 처음부터 세션 설정
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false, //https가 아니어도 허용
    },
    name:'session-cookie'
}))

app.use((req,res,next)=>{
    console.log('모든 요청에 실행됨');
    next();
});

app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/test',(req,res)=>{

})

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname, '/templates/index.html'));
    console.log('GET / 요청에만 실행됨');
    next();
});

app.post('/',(req,res,next)=>{
    res.send('Hello, Express');
    next()
});

app.put('/',(req,res,next)=>{
    res.send('Hello, Express');
    next()
});

app.delete('/',(req,res,next)=>{
    res.send('Hello, Express');
    next()
});

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.use((req,res)=>{
    console.log('다 받아주기~')
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중')
})