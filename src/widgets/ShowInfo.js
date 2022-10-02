import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const ShowInfo = ({info, children}) =>{
    return(
        <span title={info} tooltip="tooltip" className="position-relative">
            {children}
        </span>
    )
}