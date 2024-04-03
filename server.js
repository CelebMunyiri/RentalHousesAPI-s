const express=require('express');
const mongoose=require('mongoose');
const redis=require('redis');
const config = require('./Config/config');
const { houseRoute } = require('./Routes/houseRoutes');
const { router } = require('./Routes/authRoutes');
const app=express();



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

const PORT=config.port ;
console.log(PORT);
app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/house',houseRoute);
app.use('/user',router);


