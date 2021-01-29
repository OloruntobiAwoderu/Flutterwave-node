const request = require("supertest");
const app = require("../routes/index");

describe("Post Endpoints", () => {
  it("should return error message", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "missions.count",
          condition: "gte",
        },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "condition_value is required.",
      status: "error",
      data: null,
    });
  });

  it("should return success validation", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "missions.count",
          condition: "gte",
          condition_value: 30,
        },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: "field missions.count successfully validated.",
      status: "success",
      data: {
        validation: {
          error: false,
          field: "missions.count",
          field_value: "gte",
          condition: 30,
        },
      },
    });
  });
  it("should return Failed validation", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "0",
          condition: "eq",
          condition_value: "a",
        },
        data: "damien-marley",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "field 0 failed validation.",
      status: "error",
      data: {
        validation: {
          error: true,
          field: "0",
          field_value: "eq",
          condition: "a",
        },
      },
    });
  });

  it("should return error validation message", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "5",
          condition: "contains",
          condition_value: "rocinante",
        },
        data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "field 5 is missing from data.",
      status: "error",
      data: null,
    });
  });

  it("should return rule error validation", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        rule: 8,
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "rule should be an object.",
      status: "error",
      data: null,
    });
  });

  it("should return data error validation", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "missions.count",
          condition: "gte",
          condition_value: 30,
        },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            successful: 44,
            failed: 1,
          },
        },
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "field count is missing from data.",
      status: "error",
      data: null,
    });
  });
  it("should return data field error validation", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "missions.count",
          condition: "gte",
          condition_value: 30,
        },
        data: 5,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message:
        "data field should be a valid JSON Object or valid Array or a String.",
      status: "error",
      data: null,
    });
  });
  it("should return rule required error validation", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "rule is required.",
      status: "error",
      data: null,
    });
  });

  it("should return rule required error validation", async () => {
    const res = await request(app)
      .post("/validate-rule")
      .send({
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "rule is required.",
      status: "error",
      data: null,
    });
  });
  it("should return rule required error validation", async () => {
    const res = await request(app).post("/validate-rule").send({
      rule: {},
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "data is required.",
      status: "error",
      data: null,
    });
  });
});

describe("Post Endpoints", () => {
  it("should return my details", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: "My Rule-Validation API",
      status: "success",
      data: {
        name: "Oloruntobi Ademola Awoderu",
        github: "@OloruntobiAwoderu",
        email: "awoderuoloruntobi@gmail.com",
        mobile: "08116607518",
        twitter: "@Oloruntoby_",
      },
    });
  });
});
