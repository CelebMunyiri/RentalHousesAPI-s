const request = require('supertest');
const { app, server } = require('../server')
const dotenv= require('dotenv');
dotenv.config();

// Test createHouse endpoint
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
describe('POST /house/newHouse', () => {
  it('should create a new house', async () => {
    const newHouseData = {
      name: 'Test House',
      cost: 100000,
      description: 'Test house description',
      images: ['image1.jpg', 'image2.jpg'],
      location: 'Test Location',
    };

    const res = await request(app)
      .post('/house/newHouse')
      .send(newHouseData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('House Added succesfully');
    expect(res.body.house).toBeDefined(); 
  });

  // Add more test cases as needed for validation, error handling, etc.
});

// Test updateHouse endpoint
describe('PUT /house/updateHouse/:houseId', () => {
  it('should update an existing house', async () => {
    const houseIdToUpdate = '65fab06ff34cb55eb2bc2edd'; 
    const updatedHouseData = {
      name: 'Updated Test House',
      cost: 150000,
      description: 'Updated house description',
      images: ['updated_image1.jpg', 'updated_image2.jpg'],
      location: 'Updated Location',
    };

    const res = await request(app)
      .put(`/house/updateHouse/${houseIdToUpdate}`)
      .send(updatedHouseData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('House details updated successfully');
    expect(res.body.updatedHouse).toBeDefined(); 
  });

  
});


afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // Wait for pending requests to resolve
    server.close();
  });
