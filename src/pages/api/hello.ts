// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { status: string }[]

const apps = [
  { status: 'contact', companyName: 'Josh Co', positionTitle: 'Worker', date: 'today' },
  { status: 'contact', companyName: 'Josh 2', positionTitle: 'Worker', date: 'tomorrow' },
  { status: 'applied', companyName: 'Daniel Inc', positionTitle: 'Consigliere', date: 'last year' },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(apps)
}
