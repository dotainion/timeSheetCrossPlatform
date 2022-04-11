import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';


export const RadioButton = ({onChange, defaultSelect, title}) =>{
    const [checked, setChecked] = useState();

    const radioRef = useRef();

    useEffect(async()=>{
        onChange?.(checked);
        radioRef.current.checked = checked;
    }, [checked]);

    useEffect(async()=>{
        setChecked(defaultSelect);
    }, [defaultSelect]);

    return(
        <div onClick={()=>setChecked(!checked)} className="radio-btn-container">
            <input ref={radioRef} type="radio" />
            <div className="max-width">{title}</div>
        </div>
    )
}