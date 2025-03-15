import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
//import NoteContext from "./context/Notes/NoteContext";
import NoteState from "./context/Notes/NoteState";

function App() {
  return (
    
    <>
    <NoteState>
    <Router>
    
    <Navbar/>
    
    <Routes>
    <Route path="/" element={<Home/>}/>

    <Route exact path="/about" element={<About/>}/>



    </Routes>
     


    </Router>
    </NoteState>
    </>
  );
}

export default App;
