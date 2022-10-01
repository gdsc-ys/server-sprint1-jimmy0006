const express=require('express');
const connection = require('../mysqlConnector');
const router = express.Router();

router.post('/',(req,res)=>{
    connection.query(`INSERT INTO normal2.user (userId, name, zip, city, address) VALUES (${req.body.userid},'${req.body.name}',${req.body.zip},'${req.body.city}',${req.body.address});`);
    res.send('success!');
});

// router.get('/getdata',(req,res)=>{
//     connection.query('SELECT * FROM abnormal.table1',(error,rows,fields)=>{
//         if(error) throw error;
//         console.log('User info is: ',rows);
//         res.send(rows);
//     });
// });

// router.get('/deletedata',(req,res)=>{
//     connection.query('DELETE FROM abnormal.table1 WHERE userId=1;',(error,rows,fields)=>{
//         if(error) throw error;
//         res.send(rows);
//     });
// });

module.exports = router;