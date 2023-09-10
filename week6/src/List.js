import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




function List({item, deleteit}){
    const{id,value}=item;
return(
    <li key={id}>{value}<button id="DeleteButton" onClick={() => deleteit(id)}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button></li>
)
 }

 export default List