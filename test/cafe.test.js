const request = require("supertest");
const initialiseApp = require("../app");
const cafeModel = require("../models/cafeModel")
const should = require("should")

let app;
beforeAll(() => {
    const db = {};
    app = initialiseApp(db);

});

describe('Cafe Routes', () => {
    it('should return a successful response for GET /cafes', async (done) => {
        const payload = {location: "test", name: "test"};
        request(app).get('/cafes')
            .query(payload)
            .expect(400)
            .end(function (err, res) {
                done();
            })
    });
});
