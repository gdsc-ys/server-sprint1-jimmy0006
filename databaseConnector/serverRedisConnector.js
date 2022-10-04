const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();//.env를 환경변수로 사용

//connect redis
const client = redis.createClient({
    socket:{
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    },
    password:process.env.REDIS_PASSWORD
});

module.exports = client;