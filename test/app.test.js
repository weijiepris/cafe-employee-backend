const request = require("supertest");
const initialiseApp = require("../app");
const cafeRoute = require("../routes/cafeRoute")
const should = require("should")

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
        request(app).get('/').end((err, res) => {
            should.exist(res);
            res.status.should.be.equal(200);
            res.body.message.should.be.equal("connected successfully");
        })
    });

    it('should return a successful response for GET /cafes', async () => {
        const payload = {location: "test", name: "test"};
        request(app).get('/cafes')
            .query(payload)
            .end((err, res) => {
                res.status.should.be.equal(400);
            })
    });

    it('should return a successful response for GET /employees', async () => {
        const payload = {location: "test", name: "test"};
        request(app).get('/employees')
            .query(payload)
            .end((err, res) => {
                res.status.should.be.equal(400);
            })
    });

// Add more test cases for other routes and scenarios

    afterAll(() => {
        // Cleanup or close any resources used by the tests
        // For example, close database connections
    });
})
;