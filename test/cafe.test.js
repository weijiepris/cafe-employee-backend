// cafeRoute.test.js
const request = require('supertest');
const express = require('express');

const app = express();
const cafeRoutes = require('../routes/cafeRoute');
const CafeCreateController = require("../controllers/cafe/create");

app.use('/', cafeRoutes);

describe('Cafe Routes', () => {
    it('should respond with GET /', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        // Add more assertions as needed
    });

    it('should respond with GET /name/:name', async () => {
        const response = await request(app).get('/name/TestCafe');

        expect(response.status).toBe(200);
        // Add more assertions as needed
    });

    it('should respond with GET /location/:location', async () => {
        const response = await request(app).get('/location/TestLocation');

        expect(response.status).toBe(200);
        // Add more assertions as needed
    });

    it('should respond with POST /', async () => {

        const mockCreate = jest.spyOn(CafeCreateController, "create");
        const mockRequestBody = {
            name: 'Mock Cafe',
            location: 'Mock Location',
        };
        const response = await request(app)
            .post('/')
            .send(mockRequestBody);

        expect(CafeCreateController.create()).toHaveBeenCalledTimes(1);
        mockCreate.mockRestore();

    });


    it('should respond with PUT /', async () => {
        const response = await request(app).put('/');

        expect(response.status).toBe(200);
        // Add more assertions as needed
    });

    it('should respond with DELETE /:id', async () => {
        const response = await request(app).delete('/123');

        expect(response.status).toBe(200);
        // Add more assertions as needed
    });
});
