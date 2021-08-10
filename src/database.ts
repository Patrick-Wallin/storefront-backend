import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
  ACTIVE_ORDER,
  COMPLETED_ORDER,
} = process.env;

// Reduced line of codes and easier to read
/*
let client: Pool = new Pool();

if (process.env.ENV?.trim() === 'dev') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}

if (process.env.ENV?.trim() === 'test') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}
*/

const client = new Pool({
  host: process.env.POSTGRES_HOST,
  database:
    process.env.ENV?.trim() === 'dev'
      ? process.env.POSTGRES_DB
      : process.env.POSTGRES_TEST_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default client;
