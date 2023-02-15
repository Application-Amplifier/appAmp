'use client';
import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react';
import Navbar from './Navbar';
import Tile from './Tile';
import axios, { AxiosResponse } from 'axios'
import Application from '../../interfaces/application';

type Props = {}

const Dashboard = (props: Props) => {
  const [contactedTiles, setcontactedTiles] = useState<Application[]>([]);
  const [appliedTiles, setAppliedTiles] = useState<Application[]>([]);
  const [interviewedTiles, setInterviewedTiles] = useState<Application[]>([]);
  const [offeredTiles, setOfferedTiles] = useState<Application[]>([]);

  const { data: session } = useSession();
  console.log('current session is ', session);
  // useSession uses React Context


  useEffect(() => {
    axios.get('./api/hello')
      .then((res: AxiosResponse) => {

        console.log('res data ', res.data);

        const contacted: Application[] = [];
        const applied: Application[] = [];
        const interviewed: Application[] = [];
        const offered: Application[] = [];

        res.data.forEach((application: Application) => {
          if (application.status === 'contacted') contacted.push(application)
          if (application.status === 'applied') applied.push(application)
          if (application.status === 'interviewed') interviewed.push(application)
          if (application.status === 'offered') offered.push(application)
        });

        setcontactedTiles(contacted);
        setAppliedTiles(applied);
        setInterviewedTiles(interviewed);
        setOfferedTiles(offered);
      })
  }, []);

  // CSS variables
  const column = 'flex flex-col flex-grow gap-4 border-r-2 p-5'

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-4 w-full h-full'>
        <div className={column}>
          <h1 className='text-center'>Contacted</h1>
          {contactedTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center'>Applied</h1>
          {appliedTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center'>Interviewed</h1>
          {interviewedTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
        <div className={column}>
          <h1 className='text-center'>Offered</h1>
          {offeredTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
      </div>

    </>
  )
}

export default Dashboard