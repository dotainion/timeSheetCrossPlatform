import React, { useEffect, useRef } from "react";
import { Sidebar } from "../components/Sidebar";
import { BreadCrumbs } from "../widgets/BreadCrumbs";
import $ from 'jquery';


export const Layout = ({options, title, children}) =>{
    const layoutNavigationRef = useRef();
    const childrenContainerRef = useRef();

    useEffect(()=>{
        $(window).resize(()=>{
            const navHeight = $(layoutNavigationRef.current).height();
            $(childrenContainerRef.current).animate({
                height: window.innerHeight - navHeight - 10
            }, 'fast');
        });
        $(window).resize();
    }, []);
    return(
        <div className="layout-container">
            <Sidebar />
            <div className="max-width">
                <div ref={layoutNavigationRef} className="layout-navigation">
                    <div className="layout-wrapper-nav">
                        <h2>{title}</h2>
                        <BreadCrumbs options={options} />
                    </div>
                </div>
                <div ref={childrenContainerRef} className="layout-children">{children}</div>
            </div>
        </div>
    )
}