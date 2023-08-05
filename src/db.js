import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '_karezooB3',
  port: 3306,
  database: 'centro_adopcion',
});
