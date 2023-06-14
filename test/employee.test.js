const request = require("supertest");
const initialiseApp = require("../app");
const should = require("should");

let appTest;
const db = {};

// mocking employeeService
const employeeService = {
    findAllEmployee: (req, res) => {
        res.status(200).json([
            {
                "id": "UI36b8a8d",
                "name": "wei jie",
                "email_address": "altxmare@hotmail.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "east cafe",
                "location": "north cafe",
                "days_worked": 0,
                "date_start": "2023-06-13T16:00:00.000Z",
                "date_end": null
            },
            {
                "id": "UI6ddc280",
                "name": "wei jie",
                "email_address": "altxmare@hotmail.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "east cafe",
                "location": "north cafe",
                "days_worked": 13,
                "date_start": "2023-05-31T16:00:00.000Z",
                "date_end": null
            },
            {
                "id": "UI7977907",
                "name": "wei jie",
                "email_address": "altxmare@hotmail.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "east cafe",
                "location": "north cafe",
                "days_worked": 119,
                "date_start": "2023-02-14T16:00:00.000Z",
                "date_end": null
            },
            {
                "id": "UI7deb7e6",
                "name": "wei jie",
                "email_address": "altxmare@hotmail.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "east cafe",
                "location": "north cafe",
                "days_worked": 401,
                "date_start": "2022-04-03T16:00:00.000Z",
                "date_end": "2023-05-09T16:00:00.000Z"
            },
            {
                "id": "UI9ea08ea",
                "name": "wei jie",
                "email_address": "altxmare@hotmail.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "east cafe",
                "location": "west cafe",
                "days_worked": 85,
                "date_start": "2023-01-09T16:00:00.000Z",
                "date_end": "2023-04-04T16:00:00.000Z"
            },
            {
                "id": "UIabf0730",
                "name": "chan wei",
                "email_address": "chan_weijie@outlook.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "north cafe",
                "location": "north cafe3",
                "days_worked": 0,
                "date_start": "2023-06-13T16:00:00.000Z",
                "date_end": null
            },
            {
                "id": "UIc18fd6b",
                "name": "wei jie",
                "email_address": "altxmare@hotmail.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "east cafe",
                "location": "west cafe",
                "days_worked": 2,
                "date_start": "2023-05-31T16:00:00.000Z",
                "date_end": "2023-06-02T16:00:00.000Z"
            },
            {
                "id": "UIf616612",
                "name": "wei jie",
                "email_address": "altxmare@hotmail.com",
                "phone_number": 96164636,
                "gender": "M",
                "cafe_name": "east cafe",
                "location": "west cafe",
                "days_worked": 1,
                "date_start": "2023-06-07T16:00:00.000Z",
                "date_end": "2023-06-08T16:00:00.000Z"
            }
        ]);
    }, findEmployeeByCafeNameAndLocation: (req, res) => {
        res.status(200).json([{name: "test", location: "test"}])
    }, findEmployeeByCafeName: (req, res) => {
        res.status(200).json([{name: "test", location: "test"}])
    }, findEmployeeByCafeLocation: (req, res) => {
        res.status(200).json([{name: "test", location: "test"}])
    }, createEmployee: (req, res) => {
        res.status(200).json({
            id: "UI36b8a8d",
            name: "wei jie",
            email_address: "altxmare@hotmail.com",
            phone_number: 96164636,
            gender: "M",
            cafe_name: "east cafe",
            location: "north cafe",
            days_worked: 0,
            date_start: "2023-06-13T16:00:00.000Z"
        })
    }, updateEmployee: (req, res) => {
        res.status(200).json({
            id: "UI36b8a8d",
            name: "wei jie",
            email_address: "altxmare@hotmail.com",
            phone_number: 96164636,
            gender: "M",
            cafe_name: "east cafe",
            location: "north cafe",
            days_worked: 0,
            date_start: "2023-06-13T16:00:00.000Z"
        })
    }, deleteEmployeeById: (req, res) => {
        res.send(200)
    },
};
const cafeService = {}
appTest = initialiseApp(db, cafeService, employeeService);

describe('Employee', () => {
    it('should return a 200 status code response and a list of cafes for GET /employees', async () => {
        const response = await request(appTest)
            .get('/employees')
            .expect(200);

        should.exist(response.body);
        response.body.length.should.be.equal(8);
        response.body.forEach(employee => {
            should.exist(employee.id)
            should.exist(employee.name)
            should.exist(employee.email_address)
            should.exist(employee.phone_number)
            should.exist(employee.gender)
            should.exist(employee.cafe_name)
            should.exist(employee.location)
            should.exist(employee.days_worked)
        })
    });

    it('should return a 200 status code response and a list of cafes sepcified in the params for GET /employees', async () => {
        const response = await request(appTest)
            .get('/employees/cafe/test/location/test')
            .expect(200);

        should.exist(response.body);
        response.body.length.should.be.equal(1);
        response.body.forEach(employee => {
            should.exist(employee.name)
            should.exist(employee.location)
        })
    });

    it('should return a 200 status code response and a list of cafes sepcified in the params for GET /employees', async () => {
        const response = await request(appTest)
            .get('/employees/cafe/test')
            .expect(200);

        should.exist(response.body);
        response.body.length.should.be.equal(1);
        response.body.forEach(employee => {
            should.exist(employee.name)
            should.exist(employee.location)
        })
    });

    it('should return a 200 status code response and a list of cafes sepcified in the params for GET /employees', async () => {
        const response = await request(appTest)
            .get('/employees/location/test')
            .expect(200);

        should.exist(response.body);
        response.body.length.should.be.equal(1);
        response.body.forEach(employee => {
            should.exist(employee.name)
            should.exist(employee.location)
        })
    });

    it('should return a 200 status code response and a list of cafes sepcified in the params for POST /employees', async () => {
        const payload = {
            name: "wei jie",
            email_address: "altxmare@hotmail.com",
            phone_number: 96164636,
            gender: "M",
            cafe_name: "east cafe",
            location: "north cafe",
            days_worked: 0,
            date_start: "2023-06-13T16:00:00.000Z"
        };
        const response = await request(appTest)
            .post('/employees')
            .send(payload)
            .expect(200);

        should.not.exist(payload.id)
        should.exist(response.body);
        should.exist(response.body.id)
        should.exist(response.body.name)
        should.exist(response.body.email_address)
        should.exist(response.body.phone_number)
        should.exist(response.body.gender)
        should.exist(response.body.cafe_name)
        should.exist(response.body.location)
        should.exist(response.body.days_worked)
    });

    it('should return a 200 status code response and a list of cafes sepcified in the params for PUT /employees', async () => {
        const payload = {
            id: "UI36b8a8d",
            name: "wei jie",
            email_address: "altxmare@hotmail.com",
            phone_number: 96164636,
            gender: "M",
            cafe_name: "east cafe",
            location: "north cafe",
            days_worked: 0,
            date_start: "2023-06-13T16:00:00.000Z"
        };
        const response = await request(appTest)
            .put('/employees')
            .send(payload)
            .expect(200);

        should.exist(response.body);
        should.exist(response.body.id)
        should.exist(response.body.name)
        should.exist(response.body.email_address)
        should.exist(response.body.phone_number)
        should.exist(response.body.gender)
        should.exist(response.body.cafe_name)
        should.exist(response.body.location)
        should.exist(response.body.days_worked)
    });

    it('should return a 200 status code response and a list of cafes sepcified in the params for DELETE /employees', async () => {
        const response = await request(appTest)
            .delete('/employees/1')
            .expect(200);
    });

    afterAll(() => {
        appTest = null;
    });
});
