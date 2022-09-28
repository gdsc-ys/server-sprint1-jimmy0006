const express=require('express');
const router = express.Router();
const local = require('./local/local')
const server = require('./server/server')

router.use('/local',local);
router.use('/server',server);


module.exports = router;