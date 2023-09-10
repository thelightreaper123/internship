import React, {useState,} from 'react';
import './App.css';
import CreateTask from './CreateTask';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
   const [popup, setPopup] = useState(false);
   const toggle=()=>{
    setPopup(!popup);
   }
  return (
    <>
      <div className='Main'>
    <div className='header'>
   <h1>Tades Task App</h1>
   <button className='create-task-btn' onClick={()=>setPopup(true)}>Create task</button>
   </div>
   <div className='body'>

   <CreateTask toggle={toggle} modal={popup}/>
    </div>
    </div>
    </>
  );
}

export default App;
