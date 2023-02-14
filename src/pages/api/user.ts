import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../db';
import Users from '@/interfaces/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  const { _id, firstName, lastName, email, picture }: Users = req.body;

  switch (req.method) {
    case 'GET':
      const { rows } = await query('SELECT * FROM users WHERE _id = $1;', [
        userId,
      ]);
      return res.status(200).json(rows);
    case 'POST':
      const resultPost = await query(
        'INSERT INTO users VALUES ($1, $2, $3, $4);',
        [firstName, lastName, email, picture]
      );
      return res.status(200).json(resultPost);

    case 'DELETE':
      const resultDelete = await query('DELETE FROM users WHERE _id = $1', [
        userId,
      ]);
      return res.status(201).send('DELETE');

    case 'PUT':
      let updates = Object.entries(req.body);
      for (let i = 0; i < updates.length; i++) {
        let resultUpdate = await query(
          `UPDATE users SET ${updates[i][0]} = ${updates[i][1]} WHERE _id = $1`,
          [userId]
        );
      }
      return res.status(201).send('UPDATED');
  }
}
