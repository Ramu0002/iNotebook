import React, { useEffect, useRef ,useState} from 'react'
import { useContext } from 'react';
import NoteContext from '../context/Notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    

    const {notes, fetchNote,editNote } = context;
    useEffect(()=>{
      fetchNote()
    },[])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
          <AddNote/>
          <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input  type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required /> 
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input  type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input  type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
            </div>
           
            
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='row '>
      <h1>Your notes </h1>
      <div className="container mx-2">
      {notes.length === 0 && 'No Notes to display'}
      </div>
     
    {notes.map((note)=>{
      return <NoteItem key = {note._id} updateNote={updateNote} note = {note}/>;
    })}
    </div>
    </>
  )
}

export default Notes
