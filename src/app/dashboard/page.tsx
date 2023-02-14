'use client';
import React, { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react';
import Navbar from './Navbar';
import Tile from './Tile';
import axios, { AxiosResponse } from 'axios'
import Application from '../../interfaces/application';

type Props = {}

const Dashboard = (props: Props) => {
  const [contactTiles, setContactTiles] = useState<Application[]>([]);
  const [appliedTiles, setAppliedTiles] = useState<Application[]>([]);
  const [interviewedTiles, setInterviewedTiles] = useState<Application[]>([]);
  const [offeredTiles, setOfferedTiles] = useState<Application[]>([]);


  useEffect(() => {
    axios.get('./api/hello')
      .then((res: AxiosResponse) => {

        console.log('res data ', res.data);

        const contact: Application[] = [];
        const applied: Application[] = [];
        const interviewed: Application[] = [];
        const offered: Application[] = [];

        res.data.forEach((application: Application) => {
          if (application.status === 'contact') contact.push(application)
          if (application.status === 'applied') applied.push(application)
          if (application.status === 'interviewed') interviewed.push(application)
          if (application.status === 'offered') offered.push(application)
        });

        setContactTiles(contact);
        setAppliedTiles(applied);
        setInterviewedTiles(interviewed);
        setOfferedTiles(offered);
      })
  }, []);

  // CSS variables
  const column = 'flex flex-col flex-grow mx-auto gap-y-4 border p-3'

  return (
    <>
      <Navbar />
      <div className='flex w-full h-full '>
        <div className={column}>
          <h1>Contacted</h1>
          {contactTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
        <div className={column}>
          <h1>Applied</h1>
          {appliedTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
        <div className={column}>
          <h1>Interviewed</h1>
          {interviewedTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
        <div className={column}>
          <h1>Offered</h1>
          {offeredTiles.map((item: Application, idx: number) => (
            <Tile key={idx} application={item} />
          ))}
        </div>
      </div>

    </>
  )
}

export default Dashboard