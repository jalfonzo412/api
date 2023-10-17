import { pool } from '../db.js';

describe('Database Connection', () => {
  test('should connect to the database successfully', async () => {
    const connection = await pool.getConnection();
    expect(connection).toBeDefined();
    connection.release();
  });
});