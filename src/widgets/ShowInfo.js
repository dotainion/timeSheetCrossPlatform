import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const ShowInfo = ({info, children}) =>{
    const displayInfoRef = useRef();
    const timeoutRef = useRef();
    const overlay = useRef();

    useEffect(()=>{
        $(displayInfoRef.current).hover((e)=>{
            if (e.type === 'mouseenter'){
                timeoutRef.current = setTimeout(() => {
                    $(overlay.current).show();
                }, 1000);
            }else{
                $(overlay.current).hide();
                clearTimeout(timeoutRef.current);
            }
        });
    }, []);

    return(
        <span ref={displayInfoRef} className="display-info-on-hover">
            {children}
            <div ref={overlay} className="display-info-overlay">{info}</div>
        </span>
    )
}