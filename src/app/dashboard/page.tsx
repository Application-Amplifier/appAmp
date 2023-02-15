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
    <>
      <Navbar />
      <div className='grid grid-cols-4 w-full h-full'>
        <div className={column}>
          <h1 className='text-center'>Contacted</h1>
          {contactedTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center'>Applied</h1>
          {appliedTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center'>Interviewed</h1>
          {interviewedTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center'>Offered</h1>
          {offeredTiles.map((item: SqlApplication, idx: number) => (
            <Tile key={idx} application={item} setApplicationsFetched={setApplicationsFetched} />
          ))}
        </div>
      </div>

    </>
  )
}

export default Dashboard