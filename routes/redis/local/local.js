const express=require('express');
const redis = require('redis');

const client = redis.createClient({
    url:'redis://127.0.0.1:6379'
});
const router = express.Router();


router.get('/postdata',(req,res)=>{
    client.connect();
    client.set("user","YMM");
    client.quit();
    res.send("success!");
});

router.get('/getdata',async function(req,res){
    client.connect();
    const value = await client.get("user");
    res.send(value);
    client.quit();
});

// router.get('/deletedata',(req,res)=>{
//     connection.query('DELETE FROM abnormal.table1 WHERE userId=1;',(error,rows,fields)=>{
//         if(error) throw error;
//         res.send(rows);
//     });
// });

module.exports = router;