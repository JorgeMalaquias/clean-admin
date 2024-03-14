import { Pool }  from 'pg';

const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = Number(process.env.POST);
const database = process.env.DATABASE;


const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});

export default connection;