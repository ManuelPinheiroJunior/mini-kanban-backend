import request from "supertest";
import { app } from "../../src/app";

describe("Boards Integration", () => {
  it("POST /boards should create a board", async () => {
    const response = await request(app).post("/boards").send({ name: "Board Integração" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: "Board Integração"
    });
    expect(response.body.id).toBeDefined();
  });
});
