import React, { useEffect } from "react";
import { useLayout } from "./Layout";
import logo from '../images/logo.png';
import { useAuth } from "../provider/AuthenticationWrapper";
import $ from 'jquery';
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";


export const LayoutPageHandler = ({options, title, menu, subMenu, loading, child, children}) =>{
    const {setMenu, setTitle, setOptions} = useLayout();

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
    }, [options, title, menu, subMenu]);

    return(
        <div className="d-flex">
            <div className="position-relative pt-3 text-center text-light vh-100" data-sub-menu="true" style={{backgroundColor: '#343a40', width: '152px'}}>
                <img src={logo} style={{width: '50px'}} alt="" />
                <h3 className="mt-3 ps-2 pe-2">Menu</h3>
                <h6 className="ps-2 pe-2 text-nowrap">Time sheet</h6>
                {subMenu?.map((opt, i)=>(
                    <div className="sidebar-active" key={i}>
                         <div onClick={(e)=>opt?.toggle !== false && onSubMenuClick(e, opt)} className={`pointer px-2 py-1 border-bottom border-secondary d-flex text-light align-items-center sidebar-btn ${opt?.toggle === false && 'bg-dark rounded-0'}`} data-sub-menu-btn>
                            {opt?.icon && <div><opt.icon className="fs-4" /></div>}
                            <small className="ms-1 me-3 text-nowrap">{opt.title}</small>
                        </div>
                        <div className={`${opt?.toggle !== false && 'd-none'} scroll`} id={`${opt?.title}-sub-menu`} style={{maxHeight: '50vh'}}>
                            <div className="small border-bottom border-secondary pb-1 mt-3" style={{lineHeight: '14px'}}>{opt?.optionsTitle}</div>
                            {opt?.options?.map((nav, key)=>(
                                <div key={key}>
                                    <div onClick={(e)=>nav?.onClick?.(e)} className={`pointer ps-2 pe-2 mt-1 mb-1 d-flex text-light align-items-center sidebar-btn`}>
                                        {nav?.icon && <div><nav.icon className="fs-4" /></div>}
                                        <small className="ms-1 me-3 text-nowrap">{nav?.title}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="scroll" style={{maxHeight: '50vh'}}>
                    <div className="small border-bottom border-dark pb-1 mt-3" style={{lineHeight: '14px'}}>{child?.title}</div>
                    {child?.options?.map((c, key)=>(
                        <div key={key}>
                            <div onClick={(e)=>c?.onClick?.(e)} className={`pointer ps-2 pe-2 mt-1 mb-1 d-flex text-light align-items-center sidebar-btn`}>
                                {c?.icon && <div><c.icon className="fs-4" /></div>}
                                <small className="ms-1 me-3 text-nowrap">{c?.title}</small>
                            </div>
                        </div>
                    ))}
                </div>
                <Loading loading={loading}/>
            </div>
            <div className="bg">{children}</div>
        </div>
    )
}