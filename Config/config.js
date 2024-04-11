const dotenv=require('dotenv');
dotenv.config();
module.exports={
    port: process.env.port,
    db:{
        url:"mongodb://127.0.0.1:27017/houseRental"
    },
}