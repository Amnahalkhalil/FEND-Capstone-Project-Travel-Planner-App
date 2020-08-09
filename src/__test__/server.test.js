
const request = require('supertest');

describe('The app should be running', () => {
  test('The app resonse successfully.', async () => {
    const response = await request('http://localhost:8081').get('/');
    expect(response.statusCode).toBe(200);
  });
});