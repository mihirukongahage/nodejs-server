const request = require("supertest");
const router = require("../index");
require("dotenv").config();

const TEST_USER_ID = process.env.TEST_USER_ID || "test_user";
const TEST_NOTE_ID = process.env.TEST_NOTE_ID || "test_note";

describe("POST /api/add-note", () => {
  test("given a user_id and note", async () => {
    const response = await request(router).post("/api/add-note").send({
      user_id: TEST_USER_ID,
      note: "note",
    });
    expect(response.statusCode).toBe(201);
  });
});

describe("PATCH /api/update-note", () => {
  test("given a note_id", async () => {
    const response = await request(router).patch("/api/update-note").send({
      note_id: TEST_NOTE_ID,
      note: "note test",
    });
    expect(response.statusCode).toBe(201);
  });
});

describe("DELETE /api/delete-note", () => {
  test("given a user_id and note", async () => {
    const response = await request(router).delete("/api/delete-note").send({
      note_id: TEST_NOTE_ID,
    });
    expect(response.statusCode).toBe(201);
  });
});
