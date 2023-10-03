import React,{useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import MovieResult from "./MovieResult";
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ReactPaginate from 'react-paginate';
function Home() {
    const [movies, setMovies]= useState([]);
    const [title, setTitle]= useState('');
    const [searchHistory]=useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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
const noInput =()=>{
    toast.error('search cannot be empty',{
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
    setLoading(true);
    try{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}`        
const res=await fetch(url);
const data = await res.json();
console.log(data);
const SearchInput = /^(?=.*[a-zA-Z0-9])/;
    if (!SearchInput.test(title)){
      noInput();
      return;
    }
setPage(page + 1);
setMovies(data.results)
if(data.total_results==0){
    notFound();
}
setLoading(false);
setHasMore(true);
    }catch(e){
   apiError();
    }
    
}


function saveUserSearch(){
    if(title==''){
        return;
    }else{
        searchHistory.push(title);
    }
}
let lastFiveSearches = searchHistory.slice(-5);
const HandleScroll = () => {
    setPage(page + 1);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}&page=${page}`
    return fetch(url)
    .then((res)=> res.json())
    .then((data)=>setMovies(data.results));
}
window.onscroll=() => {
    if (
      window.innerHeight + window.scrollY ===
      document.documentElement.scrollHeight
    ) {
      if (!loading && hasMore) {
       
        HandleScroll();
      }
      
    }
  };
    return ( 
        <div className="main">
<Form onSubmit={searchMovie}>
<input className="search-bar" type="text" placeholder="Search movies" value={title} onChange={e => setTitle(e.target.value)} name="title"></input>
<button className="srch-btn" onClick={saveUserSearch}>Search</button>
<br></br>
{lastFiveSearches.length !== 0 && 
(<div>
<span style={{color:"white"}}>your last {lastFiveSearches.length} searches are</span>
<ul>{lastFiveSearches.map(e => { return <li style={{color:"white"}}>{e}</li>})}</ul>
</div>)
}
</Form>
    <div className="container">
        {movies.map((movieReq)=><MovieResult key={movieReq.id} {...movieReq}/>)}
    </div>
    {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load....</p>}
        </div>
     );
}

export default Home;