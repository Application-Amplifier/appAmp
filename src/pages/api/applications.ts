import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../db';
import Application from '@/interfaces/application';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
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

  switch (req.method) {
    case 'GET':
      const { rows } = await query(
        'SELECT * FROM applications WHERE userID = $1',
        [userId]
      );
      return res.status(200).json(rows);
    case 'POST':
      const result = await query(
        `
        INSERT INTO applications 
          (userId, companyName, positionTitle, positionLocation, jobPostingLink, resumeLink, applied, typeOfApplied, status, pointOfContact, followUpEmail, tailoredResume, coverLetter, referral, notes)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
      return res.status(200).json(result);
    case 'PUT':
      return res.status(200).send('PUT');
    case 'DELETE':
      return res.status(201).send('DELETE');
  }
}
