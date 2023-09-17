function MovieResult({title, poster_path, vote_average, release_date,overview}) {
    const API_IMG="https://image.tmdb.org/t/p/w500"; 
    const imageStyle = {
        width: '400px',    // Set the width of the image
        height: 'auto',    // Auto-adjust the height to maintain aspect ratio
        borderRadius: '8px', // Add rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a box shadow
      };
    return ( 
<div>
    <h1>{title}</h1>
    <img src={API_IMG+poster_path} style={imageStyle}></img>
    <p>{overview}</p>
</div>
     );
}

export default MovieResult;