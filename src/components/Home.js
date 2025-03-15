import React, { useEffect } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/Notes/NoteContext';

const Home = () => {
  const a = useContext(NoteContext)
  useEffect(()=>{
    a.updatestate();
    // eslint-disable-next-line
  },[])
  return (
    <div>
      This is home of {a.state.name}
    </div>
  )
}

export default Home
