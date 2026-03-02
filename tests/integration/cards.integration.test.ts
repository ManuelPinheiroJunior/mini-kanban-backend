import request from "supertest";
import { app } from "../../src/app";

describe("Cards Integration", () => {
  it("POST /columns/:id/cards should create a card", async () => {
    const boardRes = await request(app).post("/boards").send({ name: "Board A" });
    const columnRes = await request(app)
      .post(`/boards/${boardRes.body.id}/columns`)
      .send({ name: "To Do", order: 0 });

    const cardRes = await request(app)
      .post(`/columns/${columnRes.body.id}/cards`)
      .send({ title: "Implementar endpoint", description: "Criar endpoint de card" });

    expect(cardRes.status).toBe(201);
    expect(cardRes.body).toMatchObject({
      title: "Implementar endpoint",
      description: "Criar endpoint de card",
      columnId: columnRes.body.id
    });
    expect(cardRes.body.id).toBeDefined();
  });

  it("PATCH /cards/:id/move should move card to another column in same board", async () => {
    const boardRes = await request(app).post("/boards").send({ name: "Board Principal" });
    const todoColumnRes = await request(app)
      .post(`/boards/${boardRes.body.id}/columns`)
      .send({ name: "To Do", order: 0 });
    const doingColumnRes = await request(app)
      .post(`/boards/${boardRes.body.id}/columns`)
      .send({ name: "Doing", order: 1 });

    const cardRes = await request(app)
      .post(`/columns/${todoColumnRes.body.id}/cards`)
      .send({ title: "Mover card", description: null });

    const moveRes = await request(app)
      .patch(`/cards/${cardRes.body.id}/move`)
      .send({ newColumnId: doingColumnRes.body.id });

    expect(moveRes.status).toBe(200);
    expect(moveRes.body.columnId).toBe(doingColumnRes.body.id);
  });

  it("PATCH /cards/:id/move should fail when destination column is from another board", async () => {
    const boardA = await request(app).post("/boards").send({ name: "Board A" });
    const boardB = await request(app).post("/boards").send({ name: "Board B" });

    const columnA = await request(app)
      .post(`/boards/${boardA.body.id}/columns`)
      .send({ name: "To Do", order: 0 });
    const columnB = await request(app)
      .post(`/boards/${boardB.body.id}/columns`)
      .send({ name: "Done", order: 0 });

    const card = await request(app)
      .post(`/columns/${columnA.body.id}/cards`)
      .send({ title: "Card inválido", description: null });

    const moveRes = await request(app)
      .patch(`/cards/${card.body.id}/move`)
      .send({ newColumnId: columnB.body.id });

    expect(moveRes.status).toBe(422);
    expect(moveRes.body.message).toContain("same board");
  });
});
