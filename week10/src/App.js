import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Signup from './Signup';
import Login from './Login'
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                       
               <Route path="/" element={<Signup/>}/>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/home" element={<Home/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;
