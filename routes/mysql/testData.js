const express=require('express');
const connection = require('./mysqlConnector');
const router = express.Router();

router.get('/',(req,res)=>{
    connection.query(`DELETE FROM abnormal.table1;`)
    connection.query(`DELETE FROM normal2.comment;`)
    connection.query(`DELETE FROM normal2.user;`)
    connection.query(`DELETE FROM normal3.comment;`)
    connection.query(`DELETE FROM normal3.user;`)
    connection.query(`DELETE FROM normal3.zip;`)
    for(let i=1;i<101;i++){
        connection.query(`INSERT INTO normal2.user (userId, name, zip, city, address) VALUES (${i},'testname',${i},'Seoul','apartment');`);
        connection.query(`INSERT INTO normal3.zip (zip, city, address) VALUES (${i},'Seoul','apartment');`);
        connection.query(`INSERT INTO normal3.user (userId, name, zip) VALUES (${i},'testname',${i});`);
        for(let j=1;j<101;j++){
            connection.query(`INSERT INTO abnormal.table1 (userId, blogId, name,zip, city,address, comment) VALUES (${i},${j},'testname',${i},'Seoul','apartment','test comment');`);
            connection.query(`INSERT INTO normal2.comment (userId, blogId, comment) VALUES (${i},${j},'test comment');`);
            connection.query(`INSERT INTO normal3.comment (userId, blogId, comment) VALUES (${i},${j},'test comment');`);
        }
    }
    res.send('success!');
});

module.exports = router;