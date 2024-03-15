import { QueryResult } from 'pg';
import { Customer } from 'src/database/types';
import connection from '../database/postgres-config';
type localizationWithPosition = {
  x: number;
  y: number;
  routePosition: number;
  customerId: number;
};
export class LocalizationRepository {
  async createLocalization(data: localizationWithPosition): Promise<void> {
    await connection.query(
      'INSERT INTO localizations (x,y,routePosition,customerId) VALUES ($1, $2, $3)',
      [data.x, data.y, data.routePosition, data.customerId],
    );
  }
  async getCustomers(): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT * FROM customers',
    )) as QueryResult<Customer>;
    return result.rows;
  }
  async getLocalizationByCustomerId(email: string): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT * FROM customers WHERE email = $1',
      [email],
    )) as QueryResult<Customer>;
    return result.rows;
  }
  async getCustomersByName(name: string): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT * FROM customers WHERE name = $1',
      [name],
    )) as QueryResult<Customer>;
    return result.rows;
  }
  async getCustomersByPhone(phone: number): Promise<Customer[]> {
    const result = (await connection.query(
      'SELECT * FROM customers WHERE phone = $1',
      [phone],
    )) as QueryResult<Customer>;
    return result.rows;
  }
}
