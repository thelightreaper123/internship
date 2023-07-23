import React from 'react';
import {Link} from "react-router-dom"
import {useRouteError} from "react-router-dom"


const NotFound =() =>{
    const error = useRouteError();
    console.error(error);
    return(
     <div>
        <h1>404</h1>
     <h2>PAGE NOT FOUND</h2>
     <p>Click link to go back to <Link to='/'>HomePage</Link></p>
     </div>
    );
};

export default NotFound;