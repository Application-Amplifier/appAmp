import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import query from '../../db';
import Application from '@/interfaces/application';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session){
    return res.status(401).json({message: "You must be logged in."});
  }

  const { userId, appId } = req.query;
  const appUpdates: Application = req.body;
  const {
    companyName,
    positionTitle,
    positionLocation,
    jobPostingLink,
    resumeLink,
    applied,
    typeOfApplied,
    status,
    pointOfContact,
    followUpEmail,
    tailoredResume,
    coverLetter,
    referral,
    notes,
  }: Application = req.body;
  try {
    switch (req.method) {
      // GET ENDPOINT
      case 'GET':
        // Get all applications for the user with matching userId
        const { rows } = await query(
          'SELECT * FROM applications WHERE userID = $1;',
          [userId]
        );
        return res.status(200).json(rows);

      // POST ENDPOINT
      case 'POST':
        // Create a new application with the data from the request body
        const resultPost = await query(
          `
        INSERT INTO applications
          (userId, companyName, positionTitle, positionLocation, jobPostingLink, resumeLink, applied, typeOfApplied, status, pointOfContact, followUpEmail, tailoredResume, coverLetter, referral, notes)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
        `,
          [
            userId,
            companyName,
            positionTitle,
            positionLocation,
            jobPostingLink,
            resumeLink,
            applied,
            typeOfApplied,
            status,
            pointOfContact,
            followUpEmail,
            tailoredResume,
            coverLetter,
            referral,
            notes,
          ]
        );
        return res.status(200).json(resultPost);

      // PUT ENDPOINT
      case 'PUT':
        // Convert the updates object into an array of entries
        const updates = Object.entries(appUpdates);
        // Generate a string of the updates to be used in the query
        let string = '';
        for (let i = 0; i < updates.length; i++) {
          if (i === updates.length - 1)
            string += `${updates[i][0]} = '${updates[i][1]}' `;
          else string += `${updates[i][0]} = '${updates[i][1]}', `;
        }
        // Generate the query string
        const queryString: string = `UPDATE applications SET ${string} WHERE _id = ${appId}`;
        // Execute the update query
        const resultPut: any = await query(queryString);
        // Return the updated application
        return res.status(200).json(resultPut);

      // DELETE ENDPOINT
      case 'DELETE':
        // Delete application with matching appId
        const resultDelete = await query(
          'DELETE FROM applications WHERE _id = $1',
          [appId]
        );
        return res.status(201).send('DELETE');
    }
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: `Error with ${req.method} request: ${error.message}` });
  }
}
