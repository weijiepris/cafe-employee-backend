const request = require("supertest");
const app = require("../index");

app.address = jest.fn().mockReturnValue({ port: 3000 });

describe("GET /", () => {
  describe("hitting the root endpoint", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response._body.message).toBe("connected successfully");
    });
  });
});

describe("GET /cafe", () => {
  describe("able to hit /cafe endpoint ", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/cafes");
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /employee", () => {
  describe("able to hit /employee endpoint", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/employees");
      expect(response.statusCode).toBe(200);
    });
    test("content type should contain json", async () => {
      const response = await request(app).post("/employees").send({
        id: "1234",
        name: "test",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});

