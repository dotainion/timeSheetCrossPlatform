import React, { useEffect, useRef } from "react";
import { GiCoffeeCup } from 'react-icons/gi';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import $ from 'jquery';
import { keyboard } from "@testing-library/user-event/dist/keyboard";


const list = [];
let overlayElement = [];
export const Breaks = () =>{
    const rowCloneRef = useRef();
    const hoverStartRef = useRef();
    const rowCloneContainerRef = useRef();

    const closeOverlays = () =>{
        $('body').find('.breaks-overlay').each((i, overlay)=>{
            $(overlay).hide('fast');
        });
    }

    const createClone = (startTime = '', endTime = '') =>{
        const clone = $(rowCloneRef.current).clone(true);
        $(rowCloneContainerRef.current).append(clone);
        $(clone).find('svg').click((e)=>{
            e.stopPropagation();
            $(clone).remove();
        });
        $(clone).find('input').each((i, input)=>{
            !i ? $(input).val(startTime) : $(input).val(endTime);
        });
        $(clone).show('fast');
    }

    useEffect(()=>{
        hoverStartRef.current = false;
        $('.breaks-container').hover((e)=>{
            if (e.type == 'mouseenter'){
                $(e.target).find('svg').css({color: 'dodgerblue'});
            }else{
                $(e.target).find('svg').css({color: 'black'});
            }
        }).click((e)=>{
            e.stopPropagation();
            hoverStartRef.current = true;
            $(e.currentTarget).parent().find('.breaks-overlay').css({
                top: $('.breaks-container').css('top')
            }).show('fast');
        });
        $('html').click((e)=>{
            if (!hoverStartRef.current){
                $(e.currentTarget).parent().find('.breaks-overlay').hide('fast')
            }else{
                hoverStartRef.current = false;
            }
        });
    }, []);

    return(
        <>
            <div className="breaks-container">
                <GiCoffeeCup onMouseDown={closeOverlays} />
            </div>
            <div 
                hidden 
                className="breaks-overlay"
                onClick={e=>e.stopPropagation()}
                >
                <div className="break-overlay-header">
                    <div className="max-width">Start</div>
                    <div className="max-width">End</div>
                </div>
                <div ref={rowCloneContainerRef}>
                    {list.map((time, key)=>createClone('start-'+key, 'end-'+key))}
                </div>
                <div onClick={()=>createClone()} className="break-overlay-row pointer">
                    <div>Add new break</div>
                    <span className="relative">
                        <div className="break-overlay-icon">
                            <IoMdAddCircle /> 
                        </div>
                    </span>
                </div>
                <CloneRow cloneRef={rowCloneRef} />
            </div>
        </>
    )
}

const CloneRow = ({cloneRef}) =>{
    return(
        <div ref={cloneRef} className="break-overlay-row" style={{display: 'none'}}>
            <input placeholder="Start time" />
            <input placeholder="End time" />
            <span className="relative">
                <div className="break-overlay-icon">
                    <IoMdRemoveCircle />
                </div>
            </span>
        </div>
    )
}