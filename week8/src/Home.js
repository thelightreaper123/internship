import React,{useState,useEffect} from "react";
import { Form } from "react-bootstrap";
import MovieBox from "./MovieBox";

function Home() {
    const [movies, setMovies]= useState([]);
    const [title, setTitle]= useState('');
    const getMovie=()=>{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=`)
        .then(res=> res.json())
        .then(json => console.log(json))
    }
useEffect(()=>{
    getMovie()
    console.log(process.env.REACT_APP_API_KEY)
},[])
const searchMovie = async(e)=>{
    e.preventDefault();
    try{
const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}`
const res=await fetch(url);
const data = await res.json();
setMovies(data.results)
console.log(data);
    }catch(e){
console.log(e)
    }
}
    return ( 
        <div className="main">
<Form onSubmit={searchMovie}>
<input className="search-bar" type="text" placeholder="Search movies" value={title} onChange={e => setTitle(e.target.value)} name="title"></input>
<button>Search</button>
</Form>
    <div>
        {movies.map((movieReq)=><MovieBox key={movieReq.id} {...movieReq}/>)}
    </div>
        </div>
     );
}

export default Home;