import { QueryResult } from 'pg';
import connection from '../database/postgres-config';
import { Customer } from '../database/types';
import { CustomerDTO } from './types/types';

export class CustomerRepository {
  async createCustomer(data: CustomerDTO): Promise<any> {
    console.log(data);
    const result = await connection.query(
      'INSERT INTO customers (name,email,phone) VALUES ($1, $2, $3);',
      [data.name, data.email, data.phone],
    );
    console.log(result.rows);
  }
}
