function Button({additem}){

    return(
        <button id="AddButton" onClick={()=>additem()}>Add</button>
    )
}

export default Button