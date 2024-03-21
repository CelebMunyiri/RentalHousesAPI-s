const dotenv=require('dotenv');
module.exports={
    port: process.env.port || 3003, jwtSecret : "myjwtsecretIsAsecretthatialoneknows",
    db:{
        url:"mongodb://127.0.0.1:27017/houseRental"
    },
}