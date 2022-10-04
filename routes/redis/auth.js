const express=require('express');
const client = require('../../databaseConnector/localRedisConnector');
const router = express.Router();


router.post('/login',async (req,res)=>{
    if(req.body.id && req.body.password){
        // await client.connect();
        const result = await client.sendCommand(['HGET','user',req.body.id])
        if(!result) throw new Error('no id');
        if(result===req.body.password){
            req.session.authenticate=true;
            req.session.save(()=>{
                res.send('success!');
            })
        }else{
            //비밀번호가 일치하지 않을 경우
            res.status(400).send('no id and password match')
        }
    }else{
        //body에 id나 password가 없을 경우
        res.status(400).send('no id and password sended!')
    }
})


router.post('/',(req,res,next)=>{
    if(req.body.id && req.body.password){
        // await client.connect();
        const result = client.sendCommand(['HGET','user',req.body.id])
        console.log(result);
        res.send('temp!')
        if(result){
            throw new Error('error')
        }else{
            client.sendCommand(['HSET','user',req.body.id,req.body.password])
            res.send("success!");
        }
        
        // client.quit();
    }else{
        res.status(400).send("fail");
    }
});

module.exports = router;