import React from "react";


export const Button = ({onClick, title, style}) =>{
    return(
        <button 
            className="btn-container" 
            onClick={onClick} 
            style={style}
            >
            {title}
        </button>
    )
}