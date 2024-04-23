const mongoose=require('mongoose');
const request=require('supertest');
const dotenv=require('dotenv');

const {house}=require('../Models/house');
const app=require('../server')
dotenv.config();


beforeEach(async ()=>{
    await mongoose.connect(process.env.MONGODB_URI);
})

afterEach(async ()=>{
    await mongoose.connection.close();
})

describe("GET /house/allhouses",()=>{
    it("should return all houses",async()=>{
        const res=await request(app).get('/house/allhouses'); 
        expect(res.statusCode).toBe(200);
        //expect(res.body.length).toBeGreaterThan(1);
    })
})
