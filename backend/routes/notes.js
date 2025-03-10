const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Fetch all the notes using GET : /api/notes/fetchallnotes

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//ROUTE 2: Adding note using POST : /api/notes/addnote

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad req and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 3: Update note using POST : /api/notes/updatenote

router.put(
  "/updatenote/:id",
  fetchUser,
 
  async (req, res) => {
    const {title, description , tag} = req.body;

    try {
      //Adding newNOte
    const newNote   ={};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find the note to be update and update it
    let note  = await Note.findById(req.params.id)
    if(!note) {return res.status(404).send("NOt found")};
    if ( note.user.toString() !== req.user.id){
      return res.status(401).send("Not allowed")

    }

    note = await Note.findByIdAndUpdate(req.params.id , {$set :newNote} , {new:true})
    res.json({note});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  })


  //ROUTE 4: Delete note using DELETE : /api/notes/deletenote

router.delete(
  "/deletenote/:id",
  fetchUser,
 
  async (req, res) => {
    const {title, description , tag} = req.body;

    
   try {
     //Find the note to be deleted and delete it
     let note  = await Note.findById(req.params.id)
     if(!note) {return res.status(404).send("Note is not found")};
 
     //allow only if user owns this note
     if ( note.user.toString() !== req.user.id){
       return res.status(401).send("Not allowed")
 
     }
 
     note = await Note.findByIdAndDelete(req.params.id)
     res.json({"Success" : "Note has been deleted" , note:note});
   } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
    
   }
  })
module.exports = router;
