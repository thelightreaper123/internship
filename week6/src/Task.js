import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import './App.css';
import {Link} from "react-router-dom"
import {useRouteError} from "react-router-dom"

export default function Task() 
{
  const error = useRouteError();
  const { value } = useParams();
  const storedTask = JSON.parse(localStorage.getItem('items'));
  return Object.keys(storedTask).map((obj, i)=>{
    if(storedTask[obj].value ==value){
      return (
        <div className='taskpage'>
          <h1>{storedTask[obj].value}</h1>
          <hr></hr>
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
  })
}