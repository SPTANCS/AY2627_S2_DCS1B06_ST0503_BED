import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../index.js";

describe("GET /todos", () => {
  test("returns a list of todos", async () => {
    const res = await request(app).get("/todos");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /todos/:id", () => {
  test("returns a single todo by id", async () => {
    const res = await request(app).get("/todos/1");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });
});

describe("POST /todos", () => {
  test("adds a new todo", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "Do the dishes", done: false });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Do the dishes");
  });
});

describe("GET /animes", () => {
  test("returns a list of animes", async () => {
    const res = await request(app).get("/animes");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /animes/:id", () => {
  test("returns a single anime by id", async () => {
    const res = await request(app).get("/animes/1");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });
});

describe("POST /animes", () => {
  test("adds a new anime", async () => {
    const res = await request(app)
      .post("/animes")
      .send({ title: "Death Note", episodes: 37 });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Death Note");
  });
});
