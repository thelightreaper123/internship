import React,{useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import MovieResult from "./MovieResult";
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
function Home() {
  const storedLanguage = JSON.parse(localStorage.getItem('language')) || [];
    const [movies, setMovies]= useState([]);
    const [title, setTitle]= useState('');
    const [searchHistory, setSearchHistory]=useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [language, setLanguage] = useState(storedLanguage);
    const [titleChanged, setTitleChanged] = useState(false);
    localStorage.setItem('language', JSON.stringify(language));
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
    if (e) {
        e.preventDefault();
      }
    setHasMore(true);
    try{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=b7d68d57b175ae831b45672648c74d7b&query=${title}&language=${language}&page=${page}`        
const res=await fetch(url);
const data = await res.json();
const SearchInput = /^(?=.*[a-zA-Z0-9])/;
    if (!SearchInput.test(title)){
      noInput();
      return;
    }
    const newMovies = data.results;
    setMovies([...movies, ...newMovies]);
if(data.total_results===0){
    notFound();
}
if (newMovies.length===0){
    setHasMore(false);
}else{
    setPage(page + 1);
}
    }catch(e){
   apiError();
    }
    
}


function saveUserSearch(){
    if (title === '') {
        return;
      } else {
        const uniqueSearchHistory = new Set(searchHistory);
        uniqueSearchHistory.add(title);
        const updatedSearchHistory = [...uniqueSearchHistory];
        if (updatedSearchHistory.length > 5) {
          updatedSearchHistory.splice(0, updatedSearchHistory.length - 5);
        }
        
        setSearchHistory(updatedSearchHistory);
  localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
        setMovies([]);
        setPage(1);
    }
}

const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];




const HandleScroll = () => {
    setLoading(true);
    searchMovie();
    setLoading(false);
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
  const handleReSearch = (search) => {
    setTitle(search);
   searchMovie();
  };
  
    return ( 
        <div className="main">
<Form onSubmit={searchMovie}>
<input className="search-bar" type="text" placeholder="Search movies" value={title} onChange={e => setTitle(e.target.value)} name="title"></input>
<button className="srch-btn" onClick={saveUserSearch}>Search</button>
<br></br>
<select name="select-language" id="select-language" defaultValue={language} onChange={(e)=> setLanguage(e.target.value)} on>
    <option value='en-us'>English</option>
    <option value='ja-JP'>Japanese</option>
    <option value='es-ES'>Spanish</option>
    <option value='fr-FR'>French</option>
    <option value='de-DE'>German</option>
    <option value='zh-CN'>Chinese</option>
    <option value='ru-RU'>Russian</option>
    <option value='it-IT'>Italian</option>
    <option value='ko-KR'>Korean</option>
</select>
<br></br>
{storedSearchHistory.length !== 0 && (
          <div>
            <span style={{ color: "white" }}>
              Your last {storedSearchHistory.length} searches are
            </span>
            <ul>
              {storedSearchHistory.map((item, index) => {
                return (
                  <li key={index} style={{ color: "white", cursor: "pointer"}} onClick={() => handleReSearch(item)}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
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