const express=require('express');
const connection = require('../../../databaseConnector/mysqlConnector');
const router = express.Router();

router.post('/',(req,res)=>{
    connection.query(`INSERT INTO normal3.user (userId, name, zip) VALUES (${req.body.userid},'${req.body.name}',${req.body.zip});`,(err,rows,fields)=>{
        if(err) throw err;
        console.log('success!');
        res.send('success!');
    });
});

// router.get('/',(req,res)=>{
//     let params = new URLSearchParams(req.query);
//     let qs = ''
//     if(Object.keys(req.query).length>0){
//         params.forEach((value,key) => {
//             qs+=`${key} = ${value} AND `;
//         });
//         qs=qs.slice(0,-5);
//         connection.query(`SELECT * FROM normal3.user WHERE ${qs}`,(error,rows,fields)=>{
//             if(error) throw error;
//             console.log(`someone select : ${qs}`);
//             res.send(rows);
//         });
//     }
//     else{
//         res.send("no query exist");
//     }
// });

router.delete('/',(req,res)=>{
    let qs = ''
    if(req.query.userId){
        qs+=`userId = ${req.query.userId} AND `
    }
    if(req.query.name){
        qs+=`name = "${req.query.name}" AND `
    }
    if(req.query.zip){
        qs+=`zip = ${req.query.zip} AND `
    }
    if(Object.keys(req.query).length>0){
        qs=qs.slice(0,-5);
        connection.query(`DELETE FROM normal3.user WHERE ${qs}`,(error,rows,fields)=>{
            if(error) throw error;
            console.log(`someone delete : ${qs}`);
            res.send(rows);
        });
    }
    else{
        res.send("no query exist");
    }
});

// router.get('/deletedata',(req,res)=>{
//     connection.query('DELETE FROM abnormal.table1 WHERE userId=1;',(error,rows,fields)=>{
//         if(error) throw error;
//         res.send(rows);
//     });
// });

module.exports = router;