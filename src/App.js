import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
//import NoteContext from "./context/Notes/NoteContext";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    
    <>
    <NoteState>
    <Router>
    
    <Navbar/>
    <Alert message='this is alert' />
    <div className="container">
    <Routes>
    <Route path="/" element={<Home/>}/>

    <Route exact path="/about" element={<About/>}/>



    </Routes>
    </div>


    </Router>
    </NoteState>
    </>
  );
}

export default App;
