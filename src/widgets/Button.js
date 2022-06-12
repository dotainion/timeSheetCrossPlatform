import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Button = ({onClick, title, style, loading, useEnterKey}) =>{

    useEffect(()=>{
        if(!useEnterKey) return;
        $('html').keypress((e)=>{
            if(e.key == 'Enter'){
                onClick?.();
            }
        });
    }, [useEnterKey]);
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