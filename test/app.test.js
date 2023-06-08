const request = require("supertest");
const initialiseApp = require("../app");
const cafeRoute = require("../routes/cafeRoute")

let app;
beforeAll(() => {
    const db = {};
    app = initialiseApp(db);

});

describe('App Tests', () => {
    let app;

    beforeAll(() => {
        const db = {};
        app = initialiseApp(db);
    });

    it('should return a successful response for GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('connected successfully');
    });

    it('should return a successful response for GET /cafes', async () => {

        const response = await request(app).get('/cafes');
        expect(response.statusCode).toBe(200);
        // Add more assertions as needed
    });

    it('should return a successful response for GET /employees', async () => {
        const response = await request(app).get('/employees');
        expect(response.statusCode).toBe(200);
        // Add more assertions as needed
    });

    // Add more test cases for other routes and scenarios

    afterAll(() => {
        // Cleanup or close any resources used by the tests
        // For example, close database connections
    });
});