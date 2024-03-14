import { QueryResult } from 'pg';
import { Customer } from 'src/database/types';
import connection from '../database/postgres-config';
import { CustomerDTO } from './types/types';

export class CustomerRepository {
  async createCustomer(data: CustomerDTO): Promise<void> {
    await connection.query(
      'INSERT INTO customers (name,email,phone) VALUES ($1, $2, $3)',
      [data.name, data.email, data.phone],
    );
  }
  async getCustomersByEmail(email:string): Promise<Customer[]> {
    const result =  await connection.query(
      'SELECT * FROM customers WHERE email = $1',[email]
    ) as QueryResult<Customer>;
    return result.rows;
  }
  async getCustomers(): Promise<Customer[]> {
    const result =  await connection.query(
      'SELECT * FROM customers'
    ) as QueryResult<Customer>;
    return result.rows;
  }
  async getCustomersByName(name:string): Promise<Customer[]> {
    const result =  await connection.query(
      'SELECT * FROM customers WHERE name = $1',[name]
    ) as QueryResult<Customer>;
    return result.rows;
  }
}
