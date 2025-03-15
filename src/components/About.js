import React from 'react'
import { useContext } from 'react';

import NoteContext from '../context/Notes/NoteContext';
const About = () => {
  const a = useContext(NoteContext)
  return (
    <div>
      This is about {a.name}
    </div>
  )
}

export default About
