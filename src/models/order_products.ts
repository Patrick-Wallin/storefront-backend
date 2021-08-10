import client from '../database';

/*
export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: number;
};
*/
export type OrderProducts = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductsStore {
  async create(orderProduct: OrderProducts): Promise<number> {
    try {
      let orderProductsId: Number[] = new Array();

      const conn = await client.connect();

      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) returning id';

      const result = await conn.query(sql, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity,
      ]);

      conn.release();

      return result.rows[0].id;
    } catch (err) {
      throw new Error(
        `Could not add new product based on the order into order_products. Error: ${err}`
      );
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = 'DELETE FROM order_products WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete order_products ${id}. Error: ${err}`);
    }
  }
}
