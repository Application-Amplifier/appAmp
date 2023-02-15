import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { setCookie, getCookies } from 'cookies-next';
import query from '../../db';
import Users from '@/interfaces/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const session = await getServerSession(req, res, authOptions);

  if (!session){
    return res.status(401).json({message: "You must be logged in."});
  }
  setCookie('userId', 'user 1', {req});
  const userId = getCookies({req});
  console.log('userId: ', userId);
  const { _id, name, email, image }: Users = req.body;
  const [firstName, lastName] = name.split(' ');

try{
  if (req.method === 'GET'){
    const { rows } = await query('SELECT * FROM users WHERE _id = $1;', [
      userId,
    ]);
    return res.status(200).json(rows);
  }
  else if(req.method === 'POST'){
    const { rows } = await query('SELECT * FROM users WHERE email = $1;', [email]);
    if (rows.length){
      return res.status(200).send('Logged in!');
    }
    const resultPost = await query(
      'INSERT INTO users (firstName, lastName, email, picture) VALUES ($1, $2, $3, $4);',
      [firstName, lastName, email, image]
    );
    return res.status(200).json(resultPost);
  }
  else if(req.method === 'DELETE'){
      const resultDelete = await query('DELETE FROM users WHERE _id = $1', [
        userId,
      ]);
      return res.status(201).send('DELETE');
    }

  else if(req.method === 'PUT') {
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
catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: `Error with ${req.method} request: ${error.message}` });
  }
}
