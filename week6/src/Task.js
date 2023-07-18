import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import './App.css';


export default function Task() 
{
  const { id } = useParams();
  const storedTask = JSON.parse(localStorage.getItem('items'));
  return Object.keys(storedTask).map((obj, i)=>{
    if(storedTask[obj].id ==id){
      return (
        <div className='taskpage'>
          <h1>{storedTask[obj].value}</h1>
          <hr></hr>
        </div>
       )
    }
  })
}