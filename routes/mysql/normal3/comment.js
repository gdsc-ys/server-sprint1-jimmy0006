const express=require('express');
const connection = require('../mysqlConnector');
const router = express.Router();

router.post('/',(req,res)=>{
    connection.query(`INSERT INTO normal3.comment (userId, blogId, comment) VALUES (${req.body.userid},${req.body.blogid},'${req.body.comment}');`);
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