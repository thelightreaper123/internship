import React, {useState, useEffect} from 'react';
import './App.css';
import List from './List';
import Button from "./Button";
import { BrowserRouter as Router, Route, Switch, createBrowserRouter, RouterProvider, createRoutesFromElements, Link, useNavigate} from 'react-router-dom';
import{FontAwesomeIcon} from '@fortawesome/react-fontawesome'


function App() {
  const storedTask = JSON.parse(localStorage.getItem('items')); 
  const [tasks, setNewitem]= useState("");
  const [items, setItems] = useState(storedTask,[]);
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    
  }, [items]);



  function additem(){
    if (!tasks){
      alert("please input task!");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: tasks
    };
    setItems(oldList => [...oldList, item]);
    setNewitem("");
   }

   
  
   function deleteitem(id){
  const newArray = items.filter(item => item.id !== id);
  setItems(newArray);
   } 
   
  return (
    <div className='Main'>
    <div className='header'>
   <h1>Tades Task App</h1>
   <input type='text' placeholder='input task' value={tasks} onChange={e => setNewitem(e.target.value)} ></input><Button
    additem={additem}/>
   
   </div>
   <div className='body'>
   <ul>
    {items.map(item=>{
      return(
        <div>
          <List item={item} deleteit = {deleteitem}/><Link to={`/task:/${item.id}`}><p>EXPAND</p></Link>
        </div>
      )
    })}
   
    </ul>
    </div>
    </div>
    
  );
}

export default App;
