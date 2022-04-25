import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Options = ({parentRef, options, children}) =>{
    const overlayRef = useRef();
    const childrenRef = useRef();
    const containerRef = useRef();

    useEffect(()=>{
        $(childrenRef.current).click((e)=>{
            e.stopPropagation();
            if ($(overlayRef.current).css('display') === 'none'){
                $(overlayRef.current).show('fast');
            }else{
                $(overlayRef.current).hide('fast');
            }
        });
        $('html').click(()=>{
            $(overlayRef.current).hide('fast');
        });
    }, [parentRef]);

    return(
        <span ref={containerRef}>
            <span ref={childrenRef}>{children}</span>
            <div onClick={()=>{}} ref={overlayRef} className="options-overlay">
                {options?.map((option, key)=>(
                    <div onClick={option?.action} value={option?.value} key={key}>{option?.title}</div>
                ))}
            </div>
        </span>
    )
}