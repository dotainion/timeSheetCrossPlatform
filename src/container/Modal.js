import React, { useEffect, useRef, useState } from "react";
import { VscClose } from 'react-icons/vsc';
import $ from 'jquery';


export const Modal = ({isOpen, onClose, onDone, onPrevious, title, onPreviousTitle, onDoneTitle, onCloseTitle, children}) =>{
    const containerRef = useRef();

    useEffect(()=>{
        isOpen 
            ? $(containerRef.current).removeClass('d-none').show('fast') 
            : $(containerRef.current).addClass('d-none').hide('fast');
    }, [isOpen]);
    return(
        <div ref={containerRef} onClick={e=>e.stopPropagation()} className="modal d-none">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title">{title}</h5>
                        <button onClick={onClose} className="close border-0 bg-dark text-light pt-0">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        {onPrevious && <button onClick={onPrevious} className="btn btn-dark">{onPreviousTitle || 'Previous'}</button>}
                        {onDone && <button onClick={onDone} className="btn btn-dark">{onDoneTitle || 'Done'}</button>}
                        <button onClick={onClose} className="btn btn-dark">{onCloseTitle || 'Close'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}