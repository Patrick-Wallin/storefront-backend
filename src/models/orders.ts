import client from '../database';

export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: number;
};

export class OrderStore {
  async create(order: Order): Promise<number> {
    try {
      const sql =
        'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [
        order.product_id,
        order.quantity,
        order.user_id,
        order.status,
      ]);

      conn.release();

      return result.rows[0].id;
    } catch (err) {
      throw new Error(
        `Could not add new order ${order.product_id}. Error: ${err}`
      );
    }
  }

  async showActiveOrdersByUser(user_id: number): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = ${process.env.ACTIVE_ORDER}`;
      const conn = await client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders ${user_id}. Error: ${err}`);
    }
  }
  async showCompletedOrdersByUser(user_id: number): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = ${process.env.COMPLETED_ORDER}`;
      const conn = await client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders ${user_id}. Error: ${err}`);
    }
  }

  async changeOrderToBeCompletedByOrder(id: number): Promise<number> {
    try {
      const sql = `UPDATE orders SET status = ${process.env.COMPLETED_ORDER} WHERE id=($1)`;
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not update order status ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
