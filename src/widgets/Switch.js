import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Switch = ({inputRef, onChange}) =>{
    const checkboxRef = useRef();

    useEffect(()=>{
        $(inputRef?.current || checkboxRef.current).on('change', (e)=>{
            onChange?.(e.target.checked);
        });
        onChange?.(inputRef?.current ? inputRef?.current?.checked : checkboxRef.current.checked);
    }, [inputRef, onChange]);
    return(
        <label className="form-check form-switch pointer">
            <input ref={inputRef || checkboxRef} className="form-check-input pointer" type="checkbox" />
        </label>
    )
}