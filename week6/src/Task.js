
import { useParams } from 'react-router'
import './App.css';
import {Link} from "react-router-dom"

export default function Task() 
{
  const { id } = useParams();
  const storedTask = JSON.parse(localStorage.getItem('items'));
  const specificTask = storedTask.find((specificTask)=> specificTask.id == id);
  const storedDescription = JSON.parse(localStorage.getItem('narration'));
  const specificDescription = storedDescription.find((specificDescription)=> specificDescription.id == id);
  const storedDate = JSON.parse(localStorage.getItem('date'));
  const specificDate = storedDate.find((specificDate)=> specificDate.id == id);
  if(specificTask && specificDescription){
    return (
      <div className='taskpage'>
        <h1>{specificTask.value}</h1>
        <hr></hr>
        <p>{specificDescription.value}</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>created on:{specificDate.value}</p>
      </div>
     )
  }
  else{
    return(
      <div>
         <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>it appears the task you are looking for does not exist</p>
      <p>Click link to go back to <Link to='/'>HomePage</Link></p>
      </div>
     );
  }
}