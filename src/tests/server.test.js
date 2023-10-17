import request from 'supertest';
import app from '../app.js';

describe('Server initialization', () => {
  let server;

  beforeAll(() => {
    server = app.listen(8000);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('should start the server without errors', () => {
    expect(server).toBeDefined();
  });

  test('should listen on the specified port', async () => {
    const response = await request(app).get('/ping').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(2);
  });
});