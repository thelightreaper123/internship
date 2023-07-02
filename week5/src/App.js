import React, {useState} from 'react';
import Button from "./Buttoninp";
function App() {
  const [newItem, setNewItem]= useState("");
  const [items, setItems] = useState([]);
 function additem(){
  if (!newItem){
    alert("please input item!");
    return;
  }
  const item = {
    id: Math.floor(Math.random() * 1000),
    value: newItem
  };
  setItems(oldList => [...oldList, item]);
  setNewItem("");
 }

 function deleteitem(id){
const newArray = items.filter(item => item.id !== id);
setItems(newArray);
 } 


  return (
    <div>
      <h1>To Do List</h1>
    <input type='text' placeholder='input item' value={newItem} onChange={e => setNewItem(e.target.value)}></input>
    <Button
    additem={additem}/>
    <ul>
    {items.map(item=>{
      return(
        <li key={item.id}>{item.value}<button onClick={() => deleteitem(item.id)}>x</button></li>
      )
    })}
    </ul>
    </div>
  );
}

export default App;
