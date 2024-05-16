const dotenv=require('dotenv');
dotenv.config();
module.exports={
    port: process.env.port,
    db:{
        url:process.env.MONGO_URL

    },
}