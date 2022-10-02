const express=require('express');
const connection = require('../mysqlConnector');
const router = express.Router();
const querystring = require('querystring');

/**
 * @api {get} /user/:id Request User information
 *
 * @apiVersion        1.0.0
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/',(req,res)=>{
    connection.query(`INSERT INTO abnormal.table1 (userId, blogId, name,zip, city,address, comment) VALUES (${req.body.userid},${req.body.blogid},'${req.body.name}',${req.body.zip},'${req.body.city}','${req.body.address}','${req.body.comment}');`,(err,rows,fields)=>{
        if(err) throw err;
        console.log('success!');
        res.send('success!');
    });
});

router.get('/',(req,res)=>{
    let params = new URLSearchParams(req.query);
    let qs = ''
    if(Object.keys(req.query).length>0){
        params.forEach((value,key) => {
            qs+=`${key} = ${value} AND `;
        });
        qs=qs.slice(0,-5);
        connection.query(`SELECT * FROM abnormal.table1 WHERE ${qs}`,(error,rows,fields)=>{
            if(error) throw error;
            console.log(`someone select : ${qs}`);
            res.send(rows);
        });
    }
    else{
        res.send("no query exist");
    }
});

router.delete('/',(req,res)=>{
    let qs = ''
    if(req.query.userId){
        qs+=`userId = ${req.query.userId} AND `
    }
    if(req.query.blogId){
        qs+=`blogId = ${req.query.blogId} AND `
    }
    if(req.query.name){
        qs+=`name = "${req.query.name}" AND `
    }
    if(req.query.zip){
        qs+=`zip = ${req.query.zip} AND `
    }
    if(req.query.comment){
        qs+=`comment = "${req.query.comment}" AND `
    }
    if(req.query.city){
        qs+=`city = "${req.query.city}" AND `
    }
    if(req.query.address){
        qs+=`address = "${req.query.address}" AND `
    }
    if(Object.keys(req.query).length>0){
        qs=qs.slice(0,-5);
        connection.query(`DELETE FROM abnormal.table1 WHERE ${qs}`,(error,rows,fields)=>{
            if(error) throw error;
            console.log(`someone delete : ${qs}`);
            res.send(rows);
        });
    }
    else{
        res.send("no query exist");
    }
});


module.exports = router;