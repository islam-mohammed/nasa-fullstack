const request = require("supertest");
const app = require("../app");
const { loadSpaceXData } = require("../models/launches.model");
const { loadPlanetData } = require("../models/planets.model");
const { dbConnect, dbDisconnect } = require("../services/mongo");
describe("Launches API", () => {
  beforeAll(async () => {
    await dbConnect();
    await loadPlanetData();
    await loadSpaceXData();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/api/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
  describe("Test POST /launches", () => {
    test("it should respond with 201 success", async () => {
      await request(app)
        .post("/api/launches")
        .send({
          launchDate: new Date("2022-09-30T00:00:00.000Z"),
          mission: "Mission",
          rocket: "Explorer IS1",
          target: "Kepler-1652 b",
        })
        .expect(201)
        .expect("Content-Type", /json/);
    });
    test("it should catch invalid launch date", async () => {
      const response = await request(app)
        .post("/api/launches")
        .send({
          launchDate: new Date("54545554"),
          mission: "",
          rocket: "Explorer IS1",
          target: "Kepler-1652 b",
        })
        .expect(422)
        .expect("Content-Type", /json/);
      expect(response.body.errors["launchDate"]).toBeTruthy();
    });
    test("it should catch missing launch date", async () => {
      const response = await request(app)
        .post("/api/launches")
        .send({
          launchDate: new Date(""),
          mission: "Any Mission",
          rocket: "Explorer IS1",
          target: "Kepler-1652 b",
        })
        .expect(422)
        .expect("Content-Type", /json/);
      expect(response.body.errors["launchDate"]).toBeTruthy();
    });
    test("it should catch missing mission", async () => {
      const response = await request(app)
        .post("/api/launches")
        .send({
          launchDate: new Date("2022-09-30T00:00:00.000Z"),
          mission: "",
          rocket: "Explorer IS1",
          target: "Kepler-1652 b",
        })
        .expect(422)
        .expect("Content-Type", /json/);
      expect(response.body.errors["mission"]).toBeTruthy();
    });
    test("it should catch missing rocket", async () => {
      const response = await request(app)
        .post("/api/launches")
        .send({
          launchDate: new Date("2022-09-30T00:00:00.000Z"),
          mission: "Mission",
          rocket: "",
          target: "Kepler-1652 b",
        })
        .expect(422)
        .expect("Content-Type", /json/);
      expect(response.body.errors["rocket"]).toBeTruthy();
    });
    test("it should catch missing target", async () => {
      const response = await request(app)
        .post("/api/launches")
        .send({
          launchDate: new Date("2022-09-30T00:00:00.000Z"),
          mission: "Mission",
          rocket: "Rocket",
          target: "",
        })
        .expect(422)
        .expect("Content-Type", /json/);
      expect(response.body.errors["target"]).toBeTruthy();
    });
  });
  describe("Test DELETE /launches", () => {
    test("it should return 200 sucess", async () => {
      await request(app).delete("/api/launches/103").expect(200);
    });
    test("it should catch invalid flight nomber", async () => {
      await request(app).delete("/api/launches/999999999999999").expect(404);
    });
    test("it should return error message if there is error", async () => {
      const response = await request(app).delete(
        "/api/launches/999999999999999"
      );
      expect(response.body.error).toBeTruthy();
    });
  });
});
