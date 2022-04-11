import React, { useEffect, useRef } from "react";
import { MdOutlineAdd } from 'react-icons/md';
import $ from 'jquery';


export const BreadCrumbs = ({options}) =>{
    const breadRef = useRef();

    useEffect(()=>{
        try{
            if (options?.length){
                let reversedIndex = options?.length -1;
                const reversedOption = options.reverse();
                reversedOption.forEach((opt, i)=>{
                    $('#' + opt?.title + reversedIndex).css({zIndex: i});
                    reversedIndex --;
                });
            }
        }catch{}
    }, [options]);
    return(
        <div ref={breadRef} className="bread-crumbs">
            <div className="bread-crumbs-inner">
                {
                    options?.length?
                    options.map((crumbs, key)=>(
                        <div onClick={crumbs?.action} id={crumbs?.title + key} key={key}>
                            <span>{crumbs?.title}</span>
                        </div>
                    )):null
                }
            </div>
        </div>
    )
}