const express=require('express');
const router = express.Router();
const abnormal = require('./abnormal/abnormal')
const nor2com = require('./normal2/comment')
const nor2user = require('./normal2/user')
const nor2get = require('./normal2/joined')
const nor3com = require('./normal3/comment')
const nor3user = require('./normal3/user')
const nor3zip = require('./normal3/zip')
const nor3get = require('./normal3/joined')

router.use('/abnormal',abnormal);

router.use('/normal2/comment',nor2com);
router.use('/normal2/user',nor2user);
router.use('/normal2',nor2get);

router.use('/normal3/comment',nor3com);
router.use('/normal3/user',nor3user);
router.use('/normal3/zip',nor3zip);
router.use('/normal3',nor3get);


module.exports = router;