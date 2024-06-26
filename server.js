const express=require('express');
const mongoose=require('mongoose');
const redis=require('redis');
const helmet=require('helmet');
const bodyParser=require('body-parser');
const cors=require('cors');
const config = require('./Config/config');
const { houseRoute } = require('./Routes/houseRoutes');
const { router } = require('./Routes/authRoutes');
const { route } = require('./Routes/paymentRoute');
const { notificationRoute } = require('./Routes/notificationRoute')
const app=express();

// const client=redis.createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// client.connect(()=>{
// console.log("Redis connected successfully");
// });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public', { 'Content-Type': 'application/javascript' }));

app.use(helmet())

mongoose.connect(config.db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to database!");
});

mongoose.connection.on('error',(err)=>{
    console.error("There is an error:",err);
})

const PORT=config.port || 3005;



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/house',houseRoute);
app.use('/user',router);
app.use('/notification',notificationRoute);
//app.use('/payment',route)


const server=app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
});

module.exports={app,server};


