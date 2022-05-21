const request = require("supertest");
const router = require("../index");

describe("POST /api/add-note", () => {
  test("given a user_id and note", async () => {
    const response = await request(router).post("/api/add-note").send({
      user_id: "0001",
      note: "note",
    });
    expect(response.statusCode).toBe(201);
  });
});

describe("PATCH /api/update-note", () => {
  test("given a note_id", async () => {
    const response = await request(router).patch("/api/update-note").send({
      note_id: "0005",
      note: "note test",
    });
    expect(response.statusCode).toBe(201);
  });
});

describe("DELETE /api/delete-note", () => {
  test("given a user_id and note", async () => {
    const response = await request(router).delete("/api/delete-note").send({
      note_id: "0005",
    });
    expect(response.statusCode).toBe(201);
  });
});
