import React, { useEffect, useRef, useState } from "react";
import { SideMenu } from "../menu/SideMenu";
import { BreadCrumbs } from "../widgets/BreadCrumbs";
import { GiHamburgerMenu } from 'react-icons/gi';
import $ from 'jquery';
import { MenuButton } from "../menu/MenuButton";


export const Layout = ({options, title, children}) =>{
    useEffect(()=>{
        
    }, []);
    return(
        <div className="d-flex">
            <SideMenu />
            <div className="w-100 vh-100">
                <nav>
                    <div className="container-fluid d-flex align-items-center">
                        <MenuButton/>
                        <div className="ms-2">
                            <h6 className="m-0 p-0">{title}</h6>
                            <BreadCrumbs options={options} />
                        </div>
                    </div>
                </nav>
                <div className="w-100 h-100 overflow-auto bg">{children}</div>
            </div>
        </div>
    )
}