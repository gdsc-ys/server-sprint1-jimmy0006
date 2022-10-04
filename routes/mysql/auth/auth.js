const express=require('express');
var session = require('express-session');
const connection = require('../../../databaseConnector/mysqlConnector');
const router = express.Router();



router.post('/login',async (req,res)=>{
    if(req.body.id && req.body.password){
        connection.query(`SELECT * FROM logins.login WHERE id="${req.body.id}"`,(err,rows)=>{
            if(err) throw err;
            if(rows.length){
                if(req.body.password===rows[0].password){
                    req.session.key="true";
                    // req.session.save();
                    res.send('success');
                }else{
                    //비밀번호가 일치하지 않을 경우
                    res.status(400).send('no id and password match')
                }
            }else{
                //해당하는 아이디가 없을 경우
                res.status(400).send('no id and password match')
            }
        });
    }else{
        //body에 id나 password가 없을 경우
        res.status(400).send('no id and password sended!')
    }
})


router.post('/',(req,res)=>{
    if(req.body.id && req.body.password){
        connection.query(`SELECT * FROM logins.login WHERE id="${req.body.id}"`,(err,rows)=>{
            if(rows.length){
                res.status(400).send('id already exist')
            }
        })
        connection.query(`INSERT INTO logins.login (id, password) VALUES ("${req.body.id}","${req.body.password}");`,(err,rows,fields)=>{
            if(err) throw err;
            res.send('success!');
        });
    }else{
        //body에 id나 password가 없을 경우
        res.status(400).send('no id and password sended!')
    }
});

router.delete('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.send('success!');
    })
})


module.exports = router;