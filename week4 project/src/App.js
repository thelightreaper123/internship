import {useState} from 'react';

export default function MyApp(){
  const initialstate = () => Number(window.localStorage.getItem('count')) || 0
  const [count, setCount] = useState(initialstate);

  function Plus() {
    setCount(count + 1);
  };
  
  function Minus() {
    setCount(count - 1);
  };


  function Reset() {
    setCount(0);
  };

  window.localStorage.setItem('count', count);
  

  return(
    <div>
      <h1>Counter app</h1>
      <h2>{count}</h2>
       <button  onClick={Plus}>+</button>
       <button onClick={Minus}>-</button>
       <button  onClick={Reset}>reset</button>
    </div>
  );
}


 
 

