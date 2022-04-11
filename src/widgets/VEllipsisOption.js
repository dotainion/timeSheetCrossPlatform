import React, { useEffect, useRef } from "react";
import { VscEllipsis } from 'react-icons/vsc';
import $ from 'jquery';


export const VEllipsisOption = ({option, parentRef}) =>{
    const overlayRef = useRef();
    const ellipsisRef = useRef();

    const toggleOverlay = (e) =>{
        e.stopPropagation();
        $(overlayRef.current).animate({width: 'toggle'});
    }

    useEffect(()=>{
        $('html').click((e)=>{
            $(overlayRef.current).css('display') == 'block' && toggleOverlay(e);
        });
        $(ellipsisRef.current).click(toggleOverlay);
    }, []);

    return(
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
    )
}

const Option = ({parentRef, onClick, title}) =>{
    const optionsRef = useRef();

    useEffect(()=>{
        $(optionsRef.current).click((e)=>{
            e['ref'] = parentRef?.current;
            onClick?.(e);
        });
    }, []);

    return(
        <div ref={optionsRef} >{title}</div>
    )
}