import React, {useState} from 'react';
import Button from "./Button";
import List from './list';
function App() {
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


  return (
    <div>
      <h1>To Do List</h1>
    <input type='text' placeholder='input item' value={todotasks} onChange={e => setNewitem(e.target.value)}></input>
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
  );
}

export default App;
