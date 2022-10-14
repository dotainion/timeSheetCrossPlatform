import React, { useEffect, useRef } from "react";
import { HiPlusSm } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import { FiMinimize } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi';
import $ from 'jquery';
import { Authenticate } from "../../module/logic/Authenticate";
import { useAuth } from "../../provider/AuthenticationWrapper";
import { getRoles } from "@testing-library/react";
import { Roles } from '../../infrastructure/Roles';

const role = new Roles();
const authenticate = new Authenticate();

export const UserToolbar = ({onSearch, onMinimize}) =>{
    const { setIsAuthenticated, user } = useAuth();

    const isMobile = () =>{
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const navigation = [
        {
            icon: BsSearch,
            action: ()=>onSearch?.(),
            css: '',
        },{
            icon: FiMinimize,
            action: ()=>onMinimize?.(),
            css: !isMobile() ? 'd-none' : '',
        },{
            icon: BiLogOutCircle,
            action: ()=>{
                authenticate.signOut();
                setIsAuthenticated(null);
            },
            css: role.isSuperior(user?.role) ? 'd-none' : ''
        },
    ];

    useEffect(()=>{

    }, []);

    return(
        <div className="user-toolbar">
            {navigation.map((nav, key)=>(
                <div onClick={nav.action} className={`user-toolbar-card ${nav?.css}`} key={key}>
                    <nav.icon/>
                </div>
            ))}
        </div>
    )
}