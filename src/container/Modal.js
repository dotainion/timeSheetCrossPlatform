import React, { useEffect, useRef, useState } from "react";
import { VscClose } from 'react-icons/vsc';
import $ from 'jquery';


export const Modal = ({isOpen, children}) =>{
    const containerRef = useRef();

    useEffect(()=>{
        isOpen ? $(containerRef.current).show('fast') : $(containerRef.current).hide('fast');
    }, [isOpen]);
    return(
        <div    
            ref={containerRef} 
            onClick={e=>e.stopPropagation()} 
            className="modal-container" 
            hidden
            >
            {children}
        </div>
    )
}