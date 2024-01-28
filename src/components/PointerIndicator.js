import React, { useEffect, useRef } from "react";
import { ImArrowDown, ImArrowLeft, ImArrowRight, ImArrowUp } from 'react-icons/im';
import $ from 'jquery';


export const PointerIndicator = ({top, left, right, bottom, children}) =>{
    const childrenRef = useRef([]);

    useEffect(()=>{
        
    }, []);
    
    return(
        <span ref={childrenRef} className="position-relative d-inline-block">
            <ImArrowDown hidden={!top} className="position-absolute start-50 fs-1 move-arrow-top text-info" />
            <ImArrowLeft hidden={!right} className="position-absolute top-50 move-arrow-left fs-1 text-info" />
            <ImArrowRight hidden={!left} className="position-absolute top-50 move-arrow-right fs-1 text-info" />
            <ImArrowUp hidden={!bottom} className="position-absolute start-50 move-arrow-bottom fs-1 text-info" />
            {children}
        </span>
    );
}