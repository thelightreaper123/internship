function List({item, deleteit}){
    const{id,value}=item;
return(
    <li key={id}>{value}<button onClick={() => deleteit(id)}>x</button></li>
)
 }

 export default List