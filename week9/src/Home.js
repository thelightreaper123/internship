import React,{useState} from "react";
import { Form } from "react-bootstrap";
import MovieResult from "./MovieResult";
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
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
    setHasMore(true);
    try{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}`        
const res=await fetch(url);
const data = await res.json();
const SearchInput = /^(?=.*[a-zA-Z0-9])/;
    if (!SearchInput.test(title)){
      noInput();
      return;
    }
setMovies(data.results)
if(data.total_results===0){
    notFound();
}
setPage(page + 1);

    }catch(e){
   apiError();
    }
    
}


function saveUserSearch(){
    if(title===''){
        return;
    }else{
        searchHistory.push(title);
    }
}
let lastFiveSearches = searchHistory.slice(-5);
const HandleScroll = () => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}&page=${page}`
    return fetch(url)
    .then((res)=> res.json())
    .then((data)=>{
        const newMovies = data.results;
        setMovies([...movies, ...newMovies]);
        setPage(page + 1);
        if (newMovies.length===0){
            setHasMore(false);
        }
        setLoading(false);
    });
}
window.onscroll=() => {
    if (
      window.innerHeight + window.scrollY ===
      document.documentElement.scrollHeight
    ) {
      if (!loading && hasMore) {
       
        HandleScroll();
      }
      return;
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
    <ToastContainer/>
    {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load....</p>}
        </div>
     );
}

export default Home;