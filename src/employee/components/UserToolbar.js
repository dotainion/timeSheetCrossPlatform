import React, { useEffect, useRef } from "react";
import { HiPlusSm } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import { FiMinimize } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi';
import $ from 'jquery';
import { Authenticate } from "../../module/logic/Authenticate";
import { useAuth } from "../../provider/AuthenticationWrapper";


const authenticate = new Authenticate();

export const UserToolbar = ({onSearch, onMinimize}) =>{
    const { setIsAuthenticated } = useAuth();

    const navigation = [
        {
            icon: BsSearch,
            action: ()=>onSearch?.()
        },{
            icon: FiMinimize,
            action: ()=>onMinimize?.()
        },{
            icon: BiLogOutCircle,
            action: ()=>{
                authenticate.signOut();
                setIsAuthenticated(null);
            }
        },
    ];

    return(
        <div className="user-toolbar">
            {navigation.map((nav, key)=>(
                <div onClick={nav.action} className="user-toolbar-card" key={key}>
                    <nav.icon/>
                </div>
            ))}
        </div>
    )
}