import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';


export const Button = ({onClick, title, style, cssClass, blue, dark, loading, disabled, useEnterKey}) =>{
    const [color, setColor] = useState();

    useEffect(()=>{
        if(!useEnterKey) return;
        $('html').keypress((e)=>{
            e.key == 'Enter' && onClick?.();
        });
    }, [useEnterKey]);

    useEffect(()=>{
        if(blue) setColor('btn-primary');
        else setColor('btn-dark');
    }, []);
    return(
        <button 
            className={`btn ${color} ${cssClass} my-2`} 
            onClick={onClick} 
            style={style}
            disabled={disabled}
            >
            <span hidden={!loading} />
            {title}
        </button>
    )
}