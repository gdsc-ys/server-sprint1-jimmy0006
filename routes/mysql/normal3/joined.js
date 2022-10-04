const express=require('express');
const connection = require('../../../databaseConnector/mysqlConnector');
const router = express.Router();

router.get('/',(req,res)=>{
    let qs = ''
    if(req.query.userId){
        qs+=`c.userId = ${req.query.userId} AND `
    }
    if(req.query.blogId){
        qs+=`c.blogId = ${req.query.blogId} AND `
    }
    if(req.query.comment){
        qs+=`c.comment = "${req.query.comment}" AND `
    }
    if(req.query.name){
        qs+=`u.name = "${req.query.name}" AND `
    }
    if(req.query.zip){
        qs+=`u.zip = ${req.query.zip} AND `
    }
    if(req.query.city){
        qs+=`z.city = "${req.query.city}" AND `
    }
    if(req.query.address){
        qs+=`z.address = "${req.query.address}" AND `
    }
    if(Object.keys(req.query).length>0){
        qs=qs.slice(0,-5);
        connection.query(`SELECT c.userId, c.blogId, c.comment, u.name , u.zip,z.city,z.address
            FROM normal3.comment AS c
            JOIN normal3.user AS u
            ON c.userId=u.userId
            JOIN normal3.zip AS z
            ON u.zip=z.zip WHERE ${qs}`,(error,rows,fields)=>{
                if(error) throw error;
                console.log(`someone select : ${qs}`);
                res.send(rows);
            });
    }
    else{
        res.send("no query exist");
    }
});

module.exports = router;