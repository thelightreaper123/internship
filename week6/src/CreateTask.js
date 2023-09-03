import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link} from 'react-router-dom';
import List from './List';


function CreateTask({modal,toggle}) {
    const linkStyle = {
        textDecoration: "none",
        color: 'black'
      };
  const storedTask = JSON.parse(localStorage.getItem('items')) || []
  const storedDescription = JSON.parse(localStorage.getItem('narration')) || []
  const storedDate = JSON.parse(localStorage.getItem('date')) || []
  const [tasks, setNewitem]= useState("");
  const [items, setItems] = useState(storedTask);
  const [descriptions, setNewDescription]= useState("");
  const [narration, setDescription] = useState(storedDescription);
  const [time, setNewDate]= useState("");
  const [date, setDate] = useState(storedDate);
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    
  }, [items]);
  useEffect(() => {
    localStorage.setItem('narration', JSON.stringify(narration));
    
  }, [narration]);
  useEffect(() => {
    localStorage.setItem('date', JSON.stringify(date));
    
  }, [date]);
  function add(){
    if (!tasks){
      alert("please input task!");
      return;
    }
    if (!descriptions){
        alert("please input description!");
        return;
      }
      if (!time){
        alert("please input date!");
        return;
      }
    const taskinput = /^(?=.*[a-zA-Z0-9])/;
    if (!taskinput.test(tasks)){
      alert('task cannot be empty');
      return;
    }
    const descriptionInput = /^(?=.*[a-zA-Z0-9])/;
      if (!descriptionInput.test(descriptions)){
        alert('description cannot be empty');
        return;
      }
      const dateInput = /^(?=.*[0-9])/;
      if (!dateInput.test(time)){
        alert('date cannot be empty');
        return;
      }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: tasks
    };
    
    setItems(oldList => [...oldList, item]);
    setNewitem(""); 
  
      const description = {
        id: item.id,
        value: descriptions
      };
      
      setDescription(oldList => [...oldList, description]);
      setNewDescription("");

      const period = {
        id: item.id,
        value: time
      };
      
      setDate(oldList => [...oldList, period]);
      setNewDate("");
      toggle();
   }
   function Delete(id){
    const newArray1 = items.filter(item => item.id !== id);
    const newArray2 = narration.filter(description => description.id !== id);
    const newArray3 = date.filter(date => date.id !== id);
    setItems(newArray1);
    setDescription(newArray2);
    setDate(newArray3);
     } 
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
          <form>
          <div className='form-group'>
          <label>Task Name</label>
          <input placeholder='input task' type='text' className='form-control' value={tasks} onChange={e => setNewitem(e.target.value)}/>
          </div>
          <label>Description</label>
          <textarea rows="5" className='form-control' value={descriptions} onChange={e => setNewDescription(e.target.value)}></textarea>
          <label>Date created</label>
          <input type='date' rows="2" className='form-control' value={time} onChange={e => setNewDate(e.target.value)}></input>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={add} >
            Create
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
       {items.map(item=>{
        return(
            <div>
                <List item={item} deleteit = {Delete}/><Link to={`/${item.id}`} style={linkStyle}><p>EXPAND</p></Link>
            </div>
        )
       })}
    </div>
  );
}

export default CreateTask;