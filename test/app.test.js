const request = require("supertest");
const initialiseApp = require("../app");
const should = require("should");

let appTest;

const db = {};
const cafeService = {};
const employeeService = {};
appTest = initialiseApp(db, cafeService, employeeService);

describe('App Tests', () => {
    it('should return a successful response for GET /', (done) => {
        request(appTest)
            .get('/')
            .expect(200)
            .expect((res) => {
                should.exist(res.body);
                res.body.message.should.be.equal("connected successfully");
            })
            .end(done);
    });

    it('should return a successful response for GET /', (done) => {
        request(appTest)
            .get('/test')
            .expect(400)
            .expect((res) => {
                res.text.should.be.equal("Invalid route");
            })
            .end(done);
    });


    afterAll(() => {
        appTest = null;
    });
});
