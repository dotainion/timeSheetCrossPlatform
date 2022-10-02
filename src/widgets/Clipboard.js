import React, { useRef } from "react";
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IoCopyOutline } from 'react-icons/io5';
import { ToastHandler } from "../infrastructure/ToastHandler";

const toast = new ToastHandler();

export const Clipboard = ({value}) =>{
    const inputRef = useRef();

    const copy = () =>{
        inputRef.current.select();
        inputRef.current.setSelectionRange(0, 99999); 
        navigator.clipboard.writeText(inputRef.current.value);
        toast.success('Copied to clipboard!');
    }

    return(
        <div onClick={copy} className="clipboard-hover border rounded d-flex align-items-center text-nowrap p-2 pointer">
            <MdKeyboardArrowRight/>
            <div className="text-truncate w-100">{value}</div>
            <input ref={inputRef} className="d-none" value={value} readOnly />
            <IoCopyOutline className="d-none" data-copy-icon />
        </div>
    )
}