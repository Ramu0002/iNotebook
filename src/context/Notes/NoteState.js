import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [
    
  ];
  const [notes, setNotes] = useState(notesinitial);
  
  //fetch all notes
  const fetchNote = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: "GET",
     headers: {
      "Content-Type": "application/json",
       
       "auth-token":
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjODY1ZmU4Nzk2NDZhYTlkNmMwOTExIn0sImlhdCI6MTc0MTMyNDg3MX0._p3YHp87NjSg1a5RHA650BEggeEbt7qqNL6Whla3IAI",
     }
    
   });
   const json = await response.json()
   console.log(json)
   setNotes(json)
 };


  //Add note
  const addNote = async (title, description, tag) => {
     //API call
     const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjODY1ZmU4Nzk2NDZhYTlkNmMwOTExIn0sImlhdCI6MTc0MTMyNDg3MX0._p3YHp87NjSg1a5RHA650BEggeEbt7qqNL6Whla3IAI",
      },
      body: JSON.stringify({title,description,tag}),
      // ...
    });
    
    const note = await response.json();
    setNotes(notes.concat(note));
   
  };

  //delete note
  const deleteNote = async (id,title,description,tag) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
       "Content-Type": "application/json",
        
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjODY1ZmU4Nzk2NDZhYTlkNmMwOTExIn0sImlhdCI6MTc0MTMyNDg3MX0._p3YHp87NjSg1a5RHA650BEggeEbt7qqNL6Whla3IAI",
      },
      body: JSON.stringify({title,description,tag}),

     
    });
    const json = await response.json()
    console.log(json)

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    console.log("note deleted" + id);
  };

  //edit note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjODY1ZmU4Nzk2NDZhYTlkNmMwOTExIn0sImlhdCI6MTc0MTMyNDg3MX0._p3YHp87NjSg1a5RHA650BEggeEbt7qqNL6Whla3IAI",
      },
      body: JSON.stringify({title,description,tag}),
      // ...
    });
    const json = await response.json();
    console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes))
    //logic to edit
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
      break;

      }
    }
    console.log(newNote)
    setNotes(newNote)
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,fetchNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
