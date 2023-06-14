const request = require("supertest");
const initialiseApp = require("../app");
const should = require("should");
const path = require('path');
const fs = require('fs');

let appTest;
const db = {};

// mocking cafeService
const cafeService = {
    findAllCafe: (req, res) => {
        return res.status(200).json([
            {
                "id": "349c0cdd-8283-fdc4-f189-e0afd5e297e6",
                "name": "east cafe",
                "description": "east cafe",
                "location": "north cafe",
                "employees": 4
            },
            {
                "id": "4dd4c37e-2bc8-a891-28ef-0b5c1a6c14bc",
                "name": "east cafe",
                "description": "east cafe",
                "location": "west cafe",
                "employees": 3
            },
            {
                "id": "ea19e69a-1065-df02-c691-ea914e3e4749",
                "name": "north cafe",
                "description": "north cafe",
                "location": "north cafe3",
                "employees": 1
            },
            {
                "id": "6cb4073d-65ab-8fd1-dffe-42fbedfd3775",
                "name": "location",
                "description": "location",

                "location": "north cafe",
                "employees": 0
            },
            {
                "id": "89c8828e-e44c-cc55-8d84-d7641dda7661",
                "name": "testing",
                "description": "testing",
                "location": "testing",
                "employees": 0
            },
            {
                "id": "cb8564d2-958b-fbea-14e9-3af6182480c3",
                "name": "east cafe",
                "description": "east cafe",
                "location": "east cafe",
                "employees": 0
            },
            {
                "id": "d51044fc-0dfa-0e65-92bc-d73df8a2f5b5",
                "name": "east cafe",
                "description": "east cafe",
                "location": "south",
                "employees": 0
            },
            {
                "id": "e3dec5fb-692b-ef94-0fcb-8aa1cdf889f2",
                "name": "north cafe",
                "description": "north cafe",
                "location": "north cafe2",
                "employees": 0
            }
        ]);
    },
    create: (req, res) => {
        res.send(200)
    },
    findCafeLocationByName: (req, res) => {
        res.status(200).json([{name: "test", location: "test"}])
    },
    findCafeByLocation: (req, res) => {
        res.status(200).json([{name: "test", location: "test"}])
    },
    updateCafe: (req, res) => {
        res.status(200).json([{name: "name", description: "description", location: "location"}])
    },
    deleteCafeById: (req, res) => {
        res.send(200);
    }
};
const employeeService = {};


appTest = initialiseApp(db, cafeService, employeeService);

describe('Cafe', () => {
    it('should return a 200 status code response and a list of cafes for GET /cafes', async () => {
        const response = await request(appTest)
            .get('/cafes')
            .expect(200);

        should.exist(response.body);
        response.body.length.should.be.equal(8);
        response.body.forEach(cafe => {
            should.exist(cafe.id)
            should.exist(cafe.name)
            should.exist(cafe.description)
            should.exist(cafe.location)
        })
    });

    it('should return a 200 status code response and the result of entered param (name) should be passed back for GET /cafes', async () => {
        const response = await request(appTest)
            .get('/cafes/name/test')
            .expect(200);

        should.exist(response.body);
        response.body.length.should.be.equal(1);
        response.body.forEach(cafe => {
            should.equal(cafe.name, "test")
        })
    });

    it('should return a 200 status code response and the result of entered param (location) should be passed back for GET /cafes', async () => {
        const response = await request(appTest)
            .get('/cafes/location/test')
            .expect(200);

        should.exist(response.body);
        response.body.length.should.be.equal(1);
        response.body.forEach(cafe => {
            should.equal(cafe.location, "test")
        })
    });

    it('should return a 400 status code response when invalid logo is being passed in request for POST /cafes', async () => {
        const payload = {name: "name", description: "description", location: "location"};
        const response = await request(appTest)
            .post('/cafes')
            .send(payload)
            .expect(400);

        should.exist(response.body);
        response.body.should.be.equal("Invalid file format. Only JPG, JPEG, PNG, and GIF files are allowed.");
    });

    it('should return a 200 status code response and the result for PUT /cafes', async () => {
        const payload = {name: "name", description: "description", location: "location"};
        const response = await request(appTest)
            .put('/cafes')
            .send(payload)
            .expect(200);

        should.exist(response.body);
        should.equal(response.body[0].name, "name")
        should.equal(response.body[0].description, "description")
        should.equal(response.body[0].location, "location")
    });

    it('should return a 200 status code response for DELETE /cafes', async () => {
        const response = await request(appTest)
            .delete('/cafes/1')
            .expect(200);
    });

    // it('should return a 200 status code response when valid logo is being passed in request or POST /cafes', async () => {
    //     const payload = {name: "name", description: "description", location: "location"};
    //     const form = new FormData();
    //     const fileContent = fs.readFileSync(path.join(__dirname, 'image', 'test.jpg'));
    //     const blob = new Blob([fileContent], {
    //         type: 'image/jpeg' // Set the correct content type for your file
    //     });
    //
    //     form.append('name', payload.name);
    //     form.append('description', payload.description);
    //     form.append('nalocationme', payload.location);
    //     form.append('file', blob)
    //
    //     const response = await request(appTest)
    //         .post('/cafes')
    //         .set('Content-Type', 'multipart/form-data')
    //         .send(form)
    //         .expect(200);
    // });

    afterAll(() => {
        appTest = null;
    });
});
