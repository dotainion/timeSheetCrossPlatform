import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { ShowInfo } from "./ShowInfo";


export const ClockButton = ({onClick, disabled, state, title, color, tooltip}) =>{
    const isState = () =>{
        if(state.includes(title)) return true;
        return false;
    }
    return(
        <ShowInfo info={tooltip}>
            <div className="clock-in-btn-dots" style={{backgroundColor: color}}/>
            <button 
                onClick={onClick} 
                disabled={disabled}
                className={`text-light ${isState() ? 'bg-secondary' : 'bg-transparent'}`}
                style={{border: `1px solid ${isState() ? 'black' : color}`}}>
                {title}
            </button>
        </ShowInfo>
    )
}