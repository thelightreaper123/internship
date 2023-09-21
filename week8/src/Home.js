import React,{useState} from "react";
import { Form } from "react-bootstrap";
import MovieResult from "./MovieResult";
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
function Home() {
    const [movies, setMovies]= useState([]);
    const [title, setTitle]= useState('');
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
const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}`
const res=await fetch(url);
const data = await res.json();
setMovies(data.results)
if(data.total_results==0){
    notFound();
}
    }catch(e){
   apiError();
    }
}
    return ( 
        <div className="main">
<Form onSubmit={searchMovie}>
<input className="search-bar" type="text" placeholder="Search movies" value={title} onChange={e => setTitle(e.target.value)} name="title"></input>
<button className="srch-btn">Search</button>
</Form>
    <div className="container">
        {movies.map((movieReq)=><MovieResult key={movieReq.id} {...movieReq}/>)}
    </div>
    <ToastContainer/>
        </div>
     );
}

export default Home;