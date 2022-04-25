import React, { useEffect, useRef } from "react";
import { GrAdd } from 'react-icons/gr';
import $ from 'jquery';



export const UserToolbar = ({onSearch, onMinimize}) =>{
    return(
        <div className="user-toolbar">
            <div onClick={onSearch} className="user-toolbar-card">
                <div className="user-toolbar-card-float">
                    <GrAdd/>
                    <div>Search</div>
                </div>
            </div>
            <div onClick={onMinimize} className="user-toolbar-card">
                <div className="user-toolbar-card-float">
                    <GrAdd/>
                    <div>Minimize</div>
                </div>
            </div>
        </div>
    )
}