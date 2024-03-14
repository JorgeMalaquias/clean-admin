import { Pool } from 'pg';
import { config } from 'dotenv';
config();

const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = Number(process.env.POST);
const database = process.env.DATABASE;
const user = 'user';

const connection = new Pool({
  user,
  password,
  host,
  port,
  database,
});

export default connection;
