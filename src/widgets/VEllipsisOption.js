import React, { useEffect, useRef } from "react";
import { VscEllipsis } from 'react-icons/vsc';
import $ from 'jquery';


export const VEllipsisOption = ({isOpen, option, parentRef}) =>{
    const overlayRef = useRef();
    const ellipsisRef = useRef();
    const backdropRef = useRef();

    const toggleOverlay = (e) =>{
        e.stopPropagation();
        const isActive = $(backdropRef.current).css('display') === 'block' ? false : true;
        $(overlayRef.current).animate({width: 'toggle'});
        $(backdropRef.current).animate({width: 'toggle'});
        isOpen?.(isActive);
    }

    useEffect(()=>{
        $('html').click((e)=>{
            if($(overlayRef.current).css('display') == 'block'){
                toggleOverlay(e);
            }
        });
        $(ellipsisRef.current).click(toggleOverlay);
        $(backdropRef.current).click(toggleOverlay);
    }, []);

    return(
        <>
        <div className="v-ellipsis-opt-container">
            <span ref={ellipsisRef}>
                <VscEllipsis className="v-ellipsis-icon" />
            </span>
            <div ref={overlayRef} className="v-ellipsis-overlay" style={{display: 'none'}}>
                {option?.map((opt, key)=>(
                    <Option 
                        onClick={opt?.action} 
                        key={key} 
                        title={opt?.title}
                        parentRef={parentRef}
                    />
                ))}
            </div>
        </div>
        <div ref={backdropRef} className="v-ellipsis-backdrop" />
        </>
    )
}

const Option = ({parentRef, onClick, title}) =>{
    const optionsRef = useRef();

    useEffect(()=>{
        $(optionsRef.current).click((e)=>{
            e.stopPropagation();
            e['ref'] = parentRef?.current;
            onClick?.(e);
        });
    }, []);

    return(
        <div ref={optionsRef} >{title}</div>
    )
}