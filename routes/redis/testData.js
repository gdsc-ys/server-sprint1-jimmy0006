const express=require('express');
const localRedis = require('../../databaseConnector/localRedisConnector');
const serverRedis = require('../../databaseConnector/serverRedisConnector');
const router = express.Router();

router.get('/',async (req,res)=>{
    await localRedis.connect().catch(error=>{});
    await serverRedis.connect().catch(error=>{});
    await localRedis.sendCommand(['FLUSHALL']);
    await serverRedis.sendCommand(['FLUSHALL']);
    for(let i=1;i<40000;i++){
        localRedis.sendCommand(['HSET','user',`user${i}`,"1234"])
        serverRedis.sendCommand(['HSET','user',`user${i}`,"1234"])
    }
    res.send('success!');
});

module.exports = router;