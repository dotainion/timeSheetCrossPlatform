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
                $(overlayRef.current).show();
                const h = $(overlayRef.current).height();
                $(overlayRef.current).hide();
                if (parentRef){
                    const cH = $(parentRef.current).height();
                    $(parentRef.current).height(h + cH);
                    $(overlayRef.current).show('fast');
                }else{
                    $(overlayRef.current).show();
                }
            }else{
                if (parentRef){
                    const hh = $(overlayRef.current).height();
                    const cHh = $(parentRef.current).height();
                    $(parentRef.current).height(cHh - hh);
                    $(overlayRef.current).hide('fast');
                }else{
                    $(overlayRef.current).hide();
                }
            }
        });
    }, [parentRef]);

    return(
        <span ref={containerRef} className="relative">
            <span ref={childrenRef}>{children}</span>
            <div d={()=>alert('hello world')} ref={overlayRef} className="options-overlay" hidden>
                {options?.map((option, key)=>(
                    <div onClick={option?.action} key={key}>{option?.title}</div>
                ))}
            </div>
        </span>
    )
}