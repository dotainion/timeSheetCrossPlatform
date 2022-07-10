import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Switch = ({inputRef, onChange}) =>{
    const btnRef = useRef();
    const checkboxRef = useRef();

    useEffect(()=>{
        $(inputRef?.current || checkboxRef.current).on('change', (e)=>{
            $(btnRef.current).css({
                left: !e.target.checked ? '0' : '',
                right: e.target.checked ? '-2px' : '',
                backgroundColor: e.target.checked ? 'green' : ''
            });
            onChange?.(e.target.checked);
        });
        const checked = inputRef?.current 
            ? inputRef?.current?.checked 
            : checkboxRef.current.checked;
        onChange?.(checked);
    }, [inputRef, onChange]);
    return(
        <label className="switch-container">
            <div className="switch-bg"></div>
            <div className="switch-content" style={{left: 0}}>No</div>
            <div className="switch-content" style={{right: 0}}>Yes</div>
            <div ref={btnRef} className="switch-btn"></div>
            <input ref={inputRef || checkboxRef} type="checkbox" hidden />
        </label>
    )
}