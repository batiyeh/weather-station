const request = require('supertest');
const app = require('../../../app.js');

describe('Testing stations endpoints', () => {
    test('Getting all stations should return success', async () => {
        const response = await request(app).get("/api/stations");
        expect(response.statusCode).toBe(200);
    });
})