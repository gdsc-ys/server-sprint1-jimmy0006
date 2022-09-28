const express=require('express');
const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();//.env를 환경변수로 사용

const client = redis.createClient({
    // url:`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    // password:process.env.REDIS_PASSWORD
    socket:{
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    },
    password:process.env.REDIS_PASSWORD
});
const router = express.Router();

router.use('/',(req,res,next)=>{
    client.connect();
    next();
})

router.get('/postdata',async (req,res,next)=>{
    const reply = await client.set('user1','YM1');
    res.send(reply);
    next();
});

router.get('/getdata',async function(req,res,next){
    const value = await client.get("user1");
    res.send(value);
    next();
});

router.use('/',(req,res)=>{
    client.quit();
})

// router.get('/deletedata',(req,res)=>{
//     connection.query('DELETE FROM abnormal.table1 WHERE userId=1;',(error,rows,fields)=>{
//         if(error) throw error;
//         res.send(rows);
//     });
// });

module.exports = router;