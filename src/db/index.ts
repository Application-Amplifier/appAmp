import { Pool, PoolConfig } from 'pg';

const config: PoolConfig = {
  host: process.env.PGHOST,
  user: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
};

const db: Pool = new Pool(config);

export default async function query(
  text: string,
  params?: unknown[]
): Promise<any> {
  try {
    const response = await db.query(text, params);
    console.log('executing query: ', { text, rows: response.rowCount });
    return response;
  } catch (err) {
    console.log(err);
  }
}
