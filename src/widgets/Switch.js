import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';


export const Switch = ({inputRef, onChange, disabled, on, off}) =>{
    const [checked, setChecked] = useState();
    const checkboxRef = useRef();

    const triggerChecked = (e) =>{
        setChecked(e.target.checked);
        onChange?.(e.target.checked);
    }

    useEffect(()=>{
        
    }, []);
    return(
        <label className={`w-100 form-check form-switch ${disabled ? 'bg-light' : 'pointer'}`}>
            <input onChange={triggerChecked} ref={inputRef || checkboxRef} className="form-check-input pointer" disabled={disabled} type="checkbox" />
            <span className={`${disabled && 'text-muted'}`}>{checked ? on || 'On' : off || 'Off'}</span>
        </label>
    )
}