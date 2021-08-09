import client from '../database';

export type Category = {
  id?: number;
  name: string;
};

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM categories';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get categories. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Category> {
    try {
      const sql = 'SELECT * FROM categories WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      if (result.rowCount == 0)
        throw new Error(`Could not find category ${id}`);
      else return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find category ${id}. Error: ${err}`);
    }
  }
}
