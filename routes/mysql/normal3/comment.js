const express=require('express');
const connection = require('../mysqlConnector');
const router = express.Router();

// router.get('/postdata',(req,res)=>{
//     connection.query("INSERT INTO abnormal.table1 (userId, blogId, name,zip, city,address, comment) VALUES (1,1,'Youngman',446916,'Seoul','apartment','this is sample comment');");
//     res.send('success!');
// });

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