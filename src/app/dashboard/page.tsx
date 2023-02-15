'use client';
import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react';
import Navbar from './Navbar';
import Tile from './Tile';
import axios, { AxiosResponse } from 'axios'
import Application from '../../interfaces/application';
import SqlApplication from '../../interfaces/sqlApplication';

type Props = {}

const Dashboard = (props: Props) => {
  const [contactedTiles, setcontactedTiles] = useState<SqlApplication[]>([]);
  const [appliedTiles, setAppliedTiles] = useState<SqlApplication[]>([]);
  const [interviewedTiles, setInterviewedTiles] = useState<SqlApplication[]>([]);
  const [offeredTiles, setOfferedTiles] = useState<SqlApplication[]>([]);
  const [applicationsFetched, setApplicationsFetched] = useState(false);

  const { data: session } = useSession();
  console.log('current session is ', session);
  // useSession uses React Context


  useEffect(() => {
    if (!applicationsFetched) {
      axios.get('./api/applications')
        .then((res: AxiosResponse) => {
          const contacted: SqlApplication[] = [];
          const applied: SqlApplication[] = [];
          const interviewed: SqlApplication[] = [];
          const offered: SqlApplication[] = [];

          res.data.forEach((application: SqlApplication) => {
            if (application.status === 'contacted') contacted.push(application)
            if (application.status === 'applied') applied.push(application)
            if (application.status === 'interviewed') interviewed.push(application)
            if (application.status === 'offered') offered.push(application)
          });

          setcontactedTiles(contacted);
          setAppliedTiles(applied);
          setInterviewedTiles(interviewed);
          setOfferedTiles(offered);
          setApplicationsFetched(true);
        })
    }
  }, [applicationsFetched]);

  // CSS variables
  const column = 'flex flex-col flex-grow gap-4 border-r-2 p-5'


  return (
    <div className='isolate bg-white'>
      <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
        {/* Background shadow... */}
        <svg
          className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
          viewBox='0 0 1155 678'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
            fillOpacity='.3'
            d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
          />
          <defs>
            <linearGradient
              id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
              x1='1155.49'
              x2='-78.208'
              y1='.177'
              y2='474.645'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#9089FC' />
              <stop offset={1} stopColor='#FF80B5' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Navbar setApplicationsFetched={setApplicationsFetched} />
      <div className='grid grid-cols-4 w-full h-full px-24'>
        <div className={column}>
          <h1 className='text-center font-semibold text-lg border-b border-gray-300 pb-6 font-semibold text-lg'>{`Contacted - ${contactedTiles.length}`}</h1>
          {contactedTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center font-semibold text-lg border-b border-gray-300 pb-6 '>{`Applied - ${appliedTiles.length}`}</h1>
          {appliedTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center font-semibold text-lg border-b border-gray-300 pb-6 '>{`Interviewed - ${interviewedTiles.length}`}</h1>
          {interviewedTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
        <div className={`${column} border-r-0`}>
          <h1 className='text-center font-semibold text-lg border-b border-gray-300 pb-6 '>{`Offered - ${offeredTiles.length}`}</h1>
          {offeredTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard