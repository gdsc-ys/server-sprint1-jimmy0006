const express=require('express');
const connection = require('../../../databaseConnector/mysqlConnector');
const router = express.Router();

router.post('/',(req,res)=>{
    connection.query(`INSERT INTO normal3.zip (zip, city, address) VALUES (${req.body.zip},'${req.body.city}','${req.body.address}');`,(err,rows,fields)=>{
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
//         connection.query(`SELECT * FROM normal3.zip WHERE ${qs}`,(error,rows,fields)=>{
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
    if(req.query.zip){
        qs+=`zip = ${req.query.zip} AND `
    }
    if(req.query.city){
        qs+=`city = "${req.query.city}" AND `
    }
    if(req.query.address){
        qs+=`address = "${req.query.address}" AND `
    }
    if(Object.keys(req.query).length>0){
        qs=qs.slice(0,-5);
        connection.query(`DELETE FROM normal3.zip WHERE ${qs}`,(error,rows,fields)=>{
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