import { QueryResult } from 'pg';
import connection from '../database/postgres-config';
export type LocalizationModel = {
  x: number;
  y: number;
  routePosition: number;
  customerId: number;
};
export class LocalizationRepository {
  async createLocalization(data: LocalizationModel): Promise<void> {
    await connection.query(
      'INSERT INTO localizations (x,y,"routePosition","customerId") VALUES ($1, $2, $3, $4)',
      [data.x, data.y, data.routePosition, data.customerId],
    );
  }
  async getAllLocalizations(): Promise<LocalizationModel[]> {
    const result: QueryResult<LocalizationModel> = await connection.query(
      'SELECT * FROM localizations',
    );
    return result.rows;
  }
  async getLocalizationsOrderedByThePositionORoute(): Promise<
    LocalizationModel[]
  > {
    const result: QueryResult<LocalizationModel> = await connection.query(
      'SELECT c.id,c.name,c.email,l."routePosition" FROM localizations AS l JOIN customers AS c ON l."customerId"=c.id ORDER BY "routePosition"',
    );
    return result.rows;
  }
  async updateLocalization(offset: number): Promise<void> {
    await connection.query(
      'UPDATE localizations SET "routePosition" = "routePosition"+1 WHERE "routePosition" >= $1',
      [offset],
    );
  }
}
