function Button({additem}){

    return(
        <button onClick={()=>additem()}>Add</button>
    )
}

export default Button