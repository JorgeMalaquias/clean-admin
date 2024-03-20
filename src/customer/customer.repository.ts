import { QueryResult } from 'pg';
import { Customer } from 'src/database/types';
import connection from '../database/postgres-config';
import { CustomerDTO } from './types/types';

export class CustomerRepository {
  async createCustomer(data: CustomerDTO): Promise<QueryResult> {
    return await connection.query(
      'INSERT INTO customers (name,email,phone) VALUES ($1, $2, $3) RETURNING id',
      [data.name, data.email, data.phone],
    );
  }
  async getCustomers(): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT c.*,l.x,l.y FROM customers AS c JOIN localizations AS l ON c.id=l."customerId"',
    )) as QueryResult<Customer>;
    return result.rows;
  }
  async getCustomersByEmail(email: string): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT c.*,l.x,l.y FROM customers AS c JOIN localizations AS l ON c.id=l."customerId" WHERE c.email = $1',
      [email],
    )) as QueryResult<Customer>;
    return result.rows;
  }
  async getCustomersByName(name: string): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT c.*,l.x,l.y FROM customers AS c JOIN localizations AS l ON c.id=l."customerId" WHERE c.name = $1',
      [name],
    )) as QueryResult<Customer>;
    return result.rows;
  }
  async getCustomersByPhone(phone: number): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT c.*,l.x,l.y FROM customers AS c JOIN localizations AS l ON c.id=l."customerId" WHERE c.phone = $1',
      [phone],
    )) as QueryResult<Customer>;
    return result.rows;
  }
}
