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
    const [totalPages, setTotalPages] = useState(1);
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
setTotalPages(data.total_pages);
if(data.total_results==0){
    notFound();
}
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
    const handlePageChange = (selectedPage) => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}&page=${selectedPage.selected + 1}`
        return fetch(url)
        .then((res)=> res.json())
        .then((data)=>setMovies(data.results))  
    };
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
</Form>
    <div className="container">
        {movies.map((movieReq)=><MovieResult key={movieReq.id} {...movieReq}/>)}
    </div>
    <ToastContainer/>
    <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
    />
        </div>
     );
}

export default Home;