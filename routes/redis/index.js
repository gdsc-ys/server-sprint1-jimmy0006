const express=require('express');
const router = express.Router();
const local = require('./local/local')
const localjoin = require('./auth');
const server = require('./server/server');
const testData=require('./testData');
const dotenv = require('dotenv');
dotenv.config();//.env를 환경변수로 사용

router.use('/member',localjoin);
router.use('/local',local);
router.use('/server',server);
router.use('/testdata',testData);

module.exports = router;