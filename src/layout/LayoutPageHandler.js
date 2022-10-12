import React, { useEffect } from "react";
import { useLayout } from "./Layout";
import logo from '../images/logo.png';
import { useAuth } from "../provider/AuthenticationWrapper";
import $ from 'jquery';
import { useLocation, useNavigate } from "react-router-dom";


export const LayoutPageHandler = ({options, title, menu, subMenu, children}) =>{
    const {setMenu, setTitle, setOptions, setSubMenu} = useLayout();

    const location = useLocation();

    const onSubMenuClick = (e, opt) =>{
        if(opt?.options?.length){
            const dropdown = $(`#${opt?.title}-sub-menu`);
            if($(dropdown).is(':hidden')){ 
                $(dropdown).removeClass('d-none').show('fast');
                $(e.currentTarget).addClass('bg-dark');
            }else{ 
                $(dropdown).addClass('d-none').hide('fast');
                $(e.currentTarget).removeClass('bg-dark');
            }
        }else{
            opt?.onClick?.(opt);
            $('[data-sub-menu]').find('[data-sub-menu-btn]').each((i, element)=>{
                $(element).removeClass('bg-dark');
            });
            if($(e.currentTarget).hasClass('bg-dark')){
                $(e.currentTarget).removeClass('bg-dark');
            }else{
                $(e.currentTarget).addClass('bg-dark');
            }
        }
    }

    useEffect(()=>{
        setMenu(menu);
        setTitle(title);
        setOptions(options);
        setSubMenu(subMenu);
    }, [options, title, menu, subMenu]);

    return(
        <div className="d-flex">
            <div className="pt-3 text-center text-light vh-100" data-sub-menu="true" style={{backgroundColor: '#343a40', width: '152px'}}>
                <img src={logo} style={{width: '50px'}} alt="" />
                <h3 className="mt-3 ps-2 pe-2">Menu</h3>
                <h6 className="ps-2 pe-2 text-nowrap">Time sheet</h6>
                {subMenu?.map((opt, i)=>(
                    <div className="sidebar-active" key={i}>
                         <div onClick={(e)=>onSubMenuClick(e, opt)} className={`pointer px-2 py-1 mt-2 mb-1 d-flex text-light align-items-center sidebar-btn`} data-sub-menu-btn>
                            {opt?.icon && <div><opt.icon className="fs-4" /></div>}
                            <small className="ms-1 me-3 text-nowrap">{opt.title}</small>
                        </div>
                        <div className="d-none overflow-auto" id={`${opt.title}-sub-menu`} style={{maxHeight: '50vh'}}>
                            <div className="small border-bottom">{opt?.optionsTitle}</div>
                            {opt?.options?.map((nav, key)=>(
                                <div key={key}>
                                    <div onClick={nav.onClick} className={`pointer ps-2 pe-2 mt-1 mb-1 d-flex text-light align-items-center sidebar-btn`}>
                                        <div><nav.icon className="fs-4" /></div>
                                        <small className="ms-1 me-3 text-nowrap">{nav.title}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg">{children}</div>
        </div>
    )
}