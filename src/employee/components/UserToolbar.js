import React, { useEffect, useRef } from "react";
import { HiPlusSm } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import { FiMinimize } from 'react-icons/fi';
import $ from 'jquery';



export const UserToolbar = ({onSearch, onMinimize}) =>{
    return(
        <div className="user-toolbar">
            <div onClick={onSearch} className="user-toolbar-card">
                <BsSearch/>
            </div>
            <div onClick={onMinimize} className="user-toolbar-card">
                <FiMinimize/>
            </div>
        </div>
    )
}