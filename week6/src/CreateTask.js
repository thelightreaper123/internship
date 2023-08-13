import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link} from 'react-router-dom';
import List from './List';


function CreateTask({modal,toggle}) {
    const storedTask = JSON.parse(localStorage.getItem('items')) || []
    const storedDescription = JSON.parse(localStorage.getItem('descript')) || []
  const [tasks, setNewitem]= useState("");
  const [items, setItems] = useState(storedTask);
  const [descriptions, setNewDescription]= useState("");
  const [descript, setDescription] = useState(storedDescription);
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    
  }, [items]);
  useEffect(() => {
    localStorage.setItem('descript', JSON.stringify(descript));
    
  }, [descript]);
  function add(){
    if (!tasks){
      alert("please input task!");
      return;
    }
    if (!descriptions){
        alert("please input description!");
        return;
      }
    const taskinput = /^(?=.*[a-z])/;
    if (!taskinput.test(tasks)){
      alert('must contain at least one letter');
      return;
    }
    const descriptionInput = /^(?=.*[a-z])/;
      if (!descriptionInput.test(descriptions)){
        alert('must contain at least one letter');
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
   }
   function Delete(id){
    const newArray1 = items.filter(item => item.id !== id);
    const newArray2 = descript.filter(description => description.id !== id);
    setItems(newArray1);
    setDescription(newArray2);
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={add}>
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
                <List item={item} deleteit = {Delete}/><Link to={`/${item.id}`}><p>EXPAND</p></Link>
            </div>
        )
       })}
    </div>
  );
}

export default CreateTask;