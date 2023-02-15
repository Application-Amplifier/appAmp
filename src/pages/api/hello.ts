// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { status: string }[]

const apps = [
  {
    _id: 1,
    userId: 1,
    date: new Date(),
    companyName: 'Microsoft',
    positionTitle: 'Software Engineer',
    positionLocation: 'Remote',
    jobPostingLink: 'www.microsoft.com',
    resumeLink: 'www.resume.com',
    applied: true,
    typeOfApplied: 'Linked In',
    status: 'contacted',
    pointOfContact: 'Bill Gates',
    followUpEmail: false,
    tailoredResume: false,
    coverLetter: true,
    referral: 0,
    notes: '',
  },
  {
    _id: 1,
    userId: 1,
    date: new Date(),
    companyName: 'Capital One',
    positionTitle: 'Software Engineer',
    positionLocation: 'Remote',
    jobPostingLink: 'www.capitalOne.com',
    resumeLink: 'www.resume.com',
    applied: true,
    typeOfApplied: 'Linked In',
    status: 'contacted',
    pointOfContact: 'Bill Gates',
    followUpEmail: false,
    tailoredResume: false,
    coverLetter: true,
    referral: 0,
    notes: '',
  },
  {
    _id: 2,
    userId: 2,
    date: new Date(),
    companyName: 'Google',
    positionTitle: 'Software Engineer',
    positionLocation: 'Remote',
    jobPostingLink: 'www.google.com',
    resumeLink: 'www.resume.com',
    applied: true,
    typeOfApplied: 'Linked In',
    status: 'interviewed',
    pointOfContact: 'Bill Gates',
    followUpEmail: false,
    tailoredResume: false,
    coverLetter: true,
    referral: 0,
    notes: '',
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(apps)
}
