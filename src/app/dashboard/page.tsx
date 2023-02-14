'use client';
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Tile from './Tile';
import axios, { AxiosResponse } from 'axios'

type Props = {}

type Application = {
  status: string,
}

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
  const column = 'flex flex-col w-full h-full'

  return (
    <>
      <Navbar />
      <div>
        <div className={column}>{contactTiles.map((item: Application, idx: number) => (
          <Tile key={idx} application={item} />
        ))}</div>
        <div className={column}>{appliedTiles.map((item: Application, idx: number) => (
          <Tile key={idx} application={item} />
        ))}</div>
        <div className={column}>{interviewedTiles.map((item: Application, idx: number) => (
          <Tile key={idx} application={item} />
        ))}</div>
        <div className={column}>{offeredTiles.map((item: Application, idx: number) => (
          <Tile key={idx} application={item} />
        ))}</div>
      </div>

    </>
  )
}

export default Dashboard