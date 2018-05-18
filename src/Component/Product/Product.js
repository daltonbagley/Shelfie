import React from 'react';


export default function Product(props){
    return (
        <div>
            <img className="ProductImg" src={props.url} width="200" height="200" alt={`missing product img`}/>
            <span>{props.name}</span>
            <span>{props.price}</span>

            <div>
                 <button onClick={()=>props.deleteProduct(props.id)}>DELETE</button> 
                 <button onClick={()=>props.handleEditClick(props.id)}>EDIT</button>
            </div>
            
        </div>
    )
}