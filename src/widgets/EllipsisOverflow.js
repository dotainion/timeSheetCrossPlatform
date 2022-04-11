import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const EllipsisOverflow = ({children}) =>{
    const containerRef = useRef();
    const overlayRef = useRef();

    const isEllipsisActive = () =>{
        let a = $(containerRef.current);
        let b = a.clone().css({display: 'inline', width: 'auto', visibility: 'hidden'}).appendTo('body');
        let b_w = b.width();
        b.remove();
        if (b_w > a.width()) return true;
        return false;
    }

    const createOverlay = (key) =>{
        if (key == 'mouseenter'){
            overlayRef.current = $('<div/>').css({
                top: 0,
                left: 0,
                zIndex: 10,
                width: 'auto',
                height: '100%',
                padding: '5px',
                position: 'absolute',
                backgroundColor: 'white',
                boxShadow: '2px 2px 5px lightgray',
            }).text($(containerRef.current).text())
            .appendTo(containerRef.current).addClass('dummy-overlay');
            $(containerRef.current).css({overflow: 'visible'});
        }else{
            $(overlayRef.current[0]).remove();
            $(containerRef.current).css({overflow: 'hidden'});
        }
    }

    useEffect(()=>{
        $(containerRef.current).css({
           overflow: 'hidden',
           whiteSpace: 'nowrap',
           textOverflow: 'ellipsis',
           display: 'block',
           position: 'relative'
        }).hover((e)=>{
            if (!isEllipsisActive()) return;
            createOverlay(e.type);
        });
    }, []);

    return(
        <span ref={containerRef}>
            {children}
        </span>
    )
}