import React, { useEffect, useRef, useState } from "react";
import { GiCoffeeCup } from 'react-icons/gi';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { Break } from '../module/logic/Beak';
import { Validation } from '../infrastructure/Validation';
import { FaUndoAlt } from 'react-icons/fa';
import $ from 'jquery';


const brk = new Break();
const valid = new Validation();


export const Breaks = ({breaks, log}) =>{
    const closeOverlays = () =>{
        $('body').find('.breaks-overlay').each((_, overlay)=>{
            $(overlay).hide('fast');
        });
    }

    useEffect(()=>{
        $('.breaks-container').click((e)=>{
            e.stopPropagation();
            $(e.currentTarget).parent().find('.breaks-overlay').css({
                top: $('.breaks-container').css('top')
            }).show('fast');
        });
        $('html').click((e)=>{
            $(e.currentTarget).parent().find('.breaks-overlay').hide('fast');
        });
    }, []);

    return(
        <>
            <div className="breaks-container">
                <GiCoffeeCup onMouseDown={closeOverlays} />
            </div>
            <div hidden className="breaks-overlay" onClick={e=>e.stopPropagation()} >
                <div className="break-overlay-header">
                    <div className="max-width">Start</div>
                    <div className="max-width">End</div>
                    <div><MdDeleteForever/></div>
                </div>
                <div className="break-overlay-scrollable">
                    {breaks?.map((time, key)=>(
                        <CloneRow breakLog={time} key={key} />
                    ))}
                </div>
                <div className="break-overlay-row">
                    <div className="break-bottom-tab">BREAKS</div>
                </div>
            </div>
        </>
    )
}

const CloneRow = ({breakLog}) =>{
    const startBreak = breakLog?.startBreak; 
    const endBreak = breakLog?.endBreak;

    const undoContainerRef = useRef();
    const timeoutRef = useRef();
    const undoRef = useRef();
    const removeRef = useRef();
    const startInputRef = useRef();
    const endInputRef = useRef();

    useEffect(()=>{
        [startInputRef.current, endInputRef.current].forEach((element)=>{
            $(element).change(()=>{
                let isError = false;
                if (valid.isTimeValid(startInputRef.current.value, startInputRef.current)?.error){
                    isError = true;
                }
                if (valid.isTimeValid(endInputRef.current.value, endInputRef.current)?.error){
                    isError = true;
                }
                if (isError) return;
                brk.updateBreak(startInputRef.current.value, endInputRef.current.value, breakLog?.id);
            });
        });

        $(removeRef.current).find('svg').click((e)=>{
            e.stopPropagation();
            $(undoContainerRef.current).show('slow');
            timeoutRef.current = setTimeout(() => {
                $(undoContainerRef.current).hide('slow');
                $(e.currentTarget).parent().parent().parent().remove();
                brk.deleteBreak(breakLog?.id);
            }, 5000);
        });
        $(undoRef.current).click(()=>{
            clearTimeout(timeoutRef.current);
            $(undoContainerRef.current).hide('slow');
        });
    }, []);

    return(
        <div className="break-overlay-row" style={{display: !startBreak && 'none'}}>
            <input ref={startInputRef} placeholder="Start time" defaultValue={startBreak} />
            <input ref={endInputRef} placeholder="End time" defaultValue={endBreak} />
            <span className="relative">
                <div className="break-overlay-icon" ref={removeRef}>
                    <IoMdRemoveCircle />
                </div>
            </span>
            <div hidden ref={undoContainerRef} className="break-revert">
                <span ref={undoRef}><FaUndoAlt/>Undo</span>
            </div>
        </div>
    )
}