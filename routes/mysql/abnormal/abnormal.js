const express=require('express');
const connection = require('../mysqlConnector');
const router = express.Router();

router.post('/',(req,res)=>{
    connection.query(`INSERT INTO abnormal.table1 (userId, blogId, name,zip, city,address, comment) VALUES (${req.body.userid},${req.body.blogid},'${req.body.name}',${req.body.zip},'${req.body.city}','${req.body.address}','${req.body.comment}');`);
    res.send('success!');
});

router.get('/getdata',(req,res)=>{
    connection.query('SELECT * FROM abnormal.table1',(error,rows,fields)=>{
        if(error) throw error;
        console.log('User info is: ',rows);
        res.send(rows);
    });
});

router.get('/deletedata',(req,res)=>{
    connection.query('DELETE FROM abnormal.table1 WHERE userId=1;',(error,rows,fields)=>{
        if(error) throw error;
        res.send(rows);
    });
});


module.exports = router;