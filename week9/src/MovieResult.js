import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
function MovieResult({title, poster_path, vote_average, release_date,overview}) {
    const [show, setShow]=useState(false);
    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);
    const API_IMG="https://image.tmdb.org/t/p/w500"; 
    const imageStyle = {
        width: '350px',    // Set the width of the image
        height: 'auto',    // Auto-adjust the height to maintain aspect ratio
        borderRadius: '8px', // Add rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a box shadow
      };

    return ( 
<div>
    <h1 style={{color:"white"}} onClick={handleShow}>{title}</h1>
    <img src={API_IMG+poster_path} style={imageStyle}></img>
    <div className="card-body">
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <img className="card-img-top" src={API_IMG+poster_path} style={imageStyle}></img>
    <p>{overview}</p>
    <h2>IMDb:{vote_average}</h2>
    <h3>Release Date:{release_date}</h3>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>close</Button>
        </Modal.Footer>
    </Modal>
    </div>
</div>
     );
}

export default MovieResult;