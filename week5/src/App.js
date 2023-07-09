import "./light.css";
import React, {useState} from 'react';
import Button from "./Button";
import List from './list';
import{FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faTrashCan } from '@fortawesome/free-solid-svg-icons'
import{faToggleOn } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [buttonIsClicked , setButtonIsClicked] = useState(false);
  const [todotasks, setNewitem]= useState("");
  const [items, setItems] = useState([]);
 function additem(){
  if (!todotasks){
    alert("please input item!");
    return;
  }
  const item = {
    id: Math.floor(Math.random() * 1000),
    value: todotasks
  };
  setItems(oldList => [...oldList, item]);
  setNewitem("");
 }

 function deleteitem(id){
const newArray = items.filter(item => item.id !== id);
setItems(newArray);
 } 


  return(
    <div className="body">
      <div style={{visibility:"hidden"}}>.</div>
     <div className={`main ${buttonIsClicked ? 'light' : 'dark'}`}>
     <h1>To Do List</h1>
    <input type='text' placeholder='input item' value={todotasks} onChange={e => setNewitem(e.target.value)} ></input>
    <Button
    additem={additem}/>
    <ul>
    {items.map(item=>{
      return(
        <List  item={item} deleteit = {deleteitem}/>
      )
    })}
    </ul>
     </div>
     <div className="theme-toggle">
      <h2>Light/Dark mode</h2>
      <FontAwesomeIcon id="togg" onClick={()=>setButtonIsClicked(buttonIsClicked=>!buttonIsClicked)} icon={faToggleOn}></FontAwesomeIcon>
      
     </div>
    </div>
  );
}

export default App;
