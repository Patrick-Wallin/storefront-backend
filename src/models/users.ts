import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, firstname, lastname FROM users';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT firstname, lastname FROM users WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rowCount == 0) throw new Error(`Could not find user ${id}`);
      else return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async getUserIdBasedOnNames(
    firstName: string,
    lastName: string
  ): Promise<number> {
    try {
      const sql = 'SELECT id FROM users WHERE firstname=($1) and lastname=($2)';
      const conn = await client.connect();

      const result = await conn.query(sql, [firstName, lastName]);
      conn.release();

      if (result.rowCount == 0) return 0;
      else return result.rows[0].id;
    } catch (err) {
      throw new Error(
        `Could not find user ${firstName} ${lastName}. Error: ${err}`
      );
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING id, firstname, lastname';

      const pepper: string = process.env.BCRYPT_PASSWORD!;
      const saltRounds: string = process.env.SALT_ROUNDS!;

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname}): ${err}`
      );
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async deleteAll(): Promise<number> {
    try {
      const sql = 'DELETE FROM users';
      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete any user. Error: ${err}`);
    }
  }
}
