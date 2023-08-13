import React, {useState,} from 'react';
import './App.css';
import CreateTask from './CreateTask';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
   const [modal, setModal] = useState(false);
   const toggle=()=>{
    setModal(!modal);
   }
  return (
    <>
      <div className='Main'>
    <div className='header'>
   <h1>Tades Task App</h1>
   <button className='create-task-btn' onClick={()=>setModal(true)}>Create task</button>
   </div>
   <div className='body'>

   <CreateTask toggle={toggle} modal={modal}/>
    </div>
    </div>
    </>
  );
}

export default App;
