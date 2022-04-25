import React, { useEffect, useRef } from "react";
import { GiCoffeeCup } from 'react-icons/gi';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import $ from 'jquery';


export const Breaks = ({breaks}) =>{
    const rowCloneRef = useRef();
    const rowCloneContainerRef = useRef();

    const closeOverlays = () =>{
        $('body').find('.breaks-overlay').each((_, overlay)=>{
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
        $('.breaks-container').click((e)=>{
            e.stopPropagation();
            $(e.currentTarget).parent().find('.breaks-overlay').css({
                top: $('.breaks-container').css('top')
            }).show('fast');
        });
        $('html').click((e)=>{
            $(e.currentTarget).parent().find('.breaks-overlay').hide('fast')
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
                    <div><MdDeleteForever/></div>
                </div>
                <div ref={rowCloneContainerRef} className="break-overlay-scrollable">
                    {breaks?.map((time, key)=>(
                        <CloneRow 
                            key={key}
                            defaultStart={time?.startBreak} 
                            defaultEnd={time?.endBreak}
                        />
                    ))}
                </div>
                <div onClick={()=>createClone()} className="break-overlay-row break-overlay-row-add">
                    <div className="break-add-btn">Add new break</div>
                    <span className="relative">
                        <div className="break-overlay-icon">
                            <IoMdAddCircle /> 
                        </div>
                    </span>
                </div>
            </div>
            <CloneRow cloneRef={rowCloneRef} />
        </>
    )
}

const CloneRow = ({cloneRef, defaultStart, defaultEnd}) =>{
    return(
        <div ref={cloneRef} className="break-overlay-row" style={{display: !defaultStart && 'none'}}>
            <input placeholder="Start time" onChange={()=> null} value={defaultStart} />
            <input placeholder="End time" onChange={()=> null} value={defaultEnd} />
            <span className="relative">
                <div className="break-overlay-icon">
                    <IoMdRemoveCircle />
                </div>
            </span>
        </div>
    )
}