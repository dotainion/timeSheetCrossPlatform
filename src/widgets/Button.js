import React from "react";


export const Button = ({onClick, title, style, loading}) =>{
    return(
        <button 
            className="btn-container" 
            onClick={onClick} 
            style={style}
            >
            <span hidden={!loading} />
            {title}
        </button>
    )
}