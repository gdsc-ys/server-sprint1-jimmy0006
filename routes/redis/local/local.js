const express=require('express');
const redis = require('redis');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config();//.env를 환경변수로 사용

const client = redis.createClient({
    url:`redis://127.0.0.1:6379`,
});
const router = express.Router();

router.delete('/all',async (req,res)=>{
    await client.connect();
    await client.sendCommand(['FLUSHALL']);
    client.quit();
    res.send('deleted all');
})

router.post('/',async (req,res,next)=>{
    await client.connect();
    try{
        if(req.body.id && req.body.password){
            const result = await client.sendCommand(['HGET','user',req.body.id])
            if(result) throw new Error('error')
            await client.sendCommand(['HSET','user',req.body.id,req.body.password])
            res.send("success!");
        }else{
            res.send("fail");
            const error = new Error(`Invalid id or password`);
            error.status = 404;
        }
    }catch(error){
        res.status(500).send("Error occur!");
    }
    client.quit();
});

router.post('/login',async (req,res)=>{
    await client.connect();
    try{
        const result = await client.sendCommand(['HGET','user',req.body.id])
        if(!result) throw new Error('no id');
        if(result===req.body.password){
            res.cookie('id',req.body.id,{
                expires:new Date(Date.now()+86400000),
                httpOnly:true,
                secure:true,
                signed:true,
            });
        }
        res.send("success!");
    }catch(error){
        res.status(500).send("Error occur!");
    }
    client.quit();
})

module.exports = router;