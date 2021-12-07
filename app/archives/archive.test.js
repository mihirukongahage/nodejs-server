const request = require('supertest')
const router = require('../index')

describe('PATCH /api/archive-note', () => {
    test('given a note_id', async () => {
        const response = await request(router).patch("/api/archive-note").send({
            note_id: "0003"
        })
        expect(response.statusCode).toBe(201)
    })
})

describe('PATCH /api/unarchive-note', () => {
    test('given a note_id', async () => {
        const response = await request(router).patch("/api/unarchive-note").send({
            note_id: "0003"
        })
        expect(response.statusCode).toBe(201)
    })
})

describe('GET /api/list-unarchived-note', () => {
    test('given a note_id', async () => {
        const response = await request(router).get("/api/list-unarchived-note")
        expect(response.statusCode).toBe(201)
    })
})

describe('GET /api/list-archived-note', () => {
    test('given a note_id', async () => {
        const response = await request(router).get("/api/list-archived-note")
        expect(response.statusCode).toBe(201)
    })
})