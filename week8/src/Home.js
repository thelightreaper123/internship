import React,{useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import MovieResult from "./MovieResult";
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
function Home() {
    const [movies, setMovies]= useState([]);
    const [title, setTitle]= useState('');
    const [title2, setTitle2]= useState(title);
    const [page,setPage]=useState(1);
    const [searchHistory]=useState([]);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}&page=${page}`
    const notFound =()=>{
        toast.error('result not found',{
            position: "top-right", 
            autoClose: 5000,       
            hideProgressBar: false, 
            closeOnClick: true,    
            pauseOnHover: true,    
            draggable: false,       
    });
}
const noPages =()=>{
    toast.error(`page no ${page} of ${title} does not exist`,{
        position: "top-right", 
        autoClose: 5000,       
        hideProgressBar: false, 
        closeOnClick: true,    
        pauseOnHover: true,    
        draggable: false,       
});
}
const apiError =()=>{
    toast.error('ERROR! Check your internet connection or try again later',{
        position: "top-right", 
        autoClose: 5000,       
        hideProgressBar: false, 
        closeOnClick: true,    
        pauseOnHover: true,    
        draggable: false,       
});
}
const searchMovie = async(e)=>{
    e.preventDefault();
    try{

const res=await fetch(url);
const data = await res.json();
setMovies(data.results)
if(data.total_results==0){
    notFound();
}
if(data.results==0){
    noPages();
}
    }catch(e){
   apiError();
    }
}
function saveUserSearch(){
searchHistory.push(title);
}
let lastFiveSearches = searchHistory.slice(-5);
    return ( 
        <div className="main">
<Form onSubmit={searchMovie}>
<input className="search-bar" type="text" placeholder="Search movies" value={title} onChange={e => setTitle(e.target.value)} name="title"></input>
<button className="srch-btn" onClick={saveUserSearch}>Search</button>
<br></br>
{lastFiveSearches.length !== 0 && 
(<div>
<span>your last {lastFiveSearches.length} searches are</span>
<ul>{lastFiveSearches.map(e => { return <li>{e}</li>})}</ul>
</div>)
}
<input className="page-bar" type="number" value={page} onChange={e => setPage(e.target.value)} name="page" onClick={searchMovie} on min="1"></input>
</Form>
    <div className="container">
        {movies.map((movieReq)=><MovieResult key={movieReq.id} {...movieReq}/>)}
    </div>
    <ToastContainer/>
        </div>
     );
}

export default Home;