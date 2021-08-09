import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category_id: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();

      let result = await conn.query(sql, [id]);

      conn.release();

      if (result.rowCount == 0) throw new Error(`Could not find product ${id}`);
      else {
        result.rows[0].price = Number(result.rows[0].price);
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<number> {
    try {
      const sql =
        'INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING id';
      const conn = await client.connect();

      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category_id,
      ]);

      conn.release();

      if (result.rowCount > 0) {
        return result.rows[0].id;
      } else {
        throw new Error(`Could not add new product ${product.name}. `);
      }
    } catch (err) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${err}`
      );
    }
  }

  async showTopFivePopular(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM products INNER JOIN orders ON products.id = orders.product_id ORDER BY orders.quantity DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async showByCategory(category_id: number): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE category_id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [category_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find product ${category_id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  async deleteAll(): Promise<number> {
    try {
      const sql = 'DELETE FROM products';
      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete any product. Error: ${err}`);
    }
  }
}
