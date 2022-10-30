import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { SideMenu } from "../menu/SideMenu";
import { BreadCrumbs } from "../widgets/BreadCrumbs";
import { GiHamburgerMenu } from 'react-icons/gi';
import $ from 'jquery';


const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

export const Layout = ({children}) =>{
    const [menu, setMenu] = useState();
    const [title, setTitle] = useState();
    const [options, setOptions] = useState();
    const [topMenuSize, setTopMenuSize] = useState({width: 0, height: 0});

    const topMenuRef = useRef();

    const layoutValues = {
        setMenu,
        setTitle,
        setOptions,
        topMenuSize
    }

    useEffect(()=>{
        setTopMenuSize({
            width: $(topMenuRef.current).width(), 
            height: $(topMenuRef.current).height()
        });
    }, []);
    return(
        <LayoutContext.Provider value={layoutValues}>
            <div className="d-flex">
                <SideMenu />
                <div className="w-100 vh-100">
                    <nav>
                        <div ref={topMenuRef} className="container-fluid d-flex align-items-center bg-dark">
                            <span className="ps-1 fw-bold text-light">{title}</span>
                            <div className="ms-2">
                                <BreadCrumbs options={options} />
                            </div>
                            {menu?.map((m, i)=>(
                                <span 
                                    className="p-1 ps-3 pe-3 mt-1 mb-1 me-2 pointer small menu-btn text-light" 
                                    style={{backgroundColor: '#343a40'}}
                                    onClick={m?.onClick}
                                    title={m?.tooltip}
                                    tooltip={'tooltip'}
                                    key={i}
                                >{m?.title}</span>
                            ))}
                        </div>
                    </nav>
                    <div className="w-100 h-100 overflow-hidden bg">{children}</div>
                </div>
            </div>
        </LayoutContext.Provider>
    )
}