import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Editable = ({onChange, value}) =>{
    const containerRef = useRef();
    const inputRef = useRef();

    useEffect(()=>{
        $(containerRef.current).parent().dblclick(()=>{
            $(containerRef.current).show('fast');
            $(inputRef.current).focus();
        });
        $(inputRef.current).blur(()=>{
            $(containerRef.current).hide('fast');
        });
    }, []);
    return(
        <div ref={containerRef} className="editable-container" hidden>
            <input ref={inputRef} onChange={onChange} defaultValue={value} />
        </div>
    )
}