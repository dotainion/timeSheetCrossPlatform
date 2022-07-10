import React, { useEffect, useRef } from "react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdMenuOpen } from 'react-icons/md'
import $ from 'jquery';

export const MenuButton = ({inMenu}) =>{
    const onToggle = () =>{
        $('.sidebar').toggle('fast').promise().done(()=>{
            hideToggle();
        });
    }

    const hideToggle = () =>{
        if($('.sidebar').css('display') === 'none'){
            $('.menu-ref').show('fast');
            $('.back-ref').hide('fast');
        }else{
            $('.back-ref').show('fast');
            $('.menu-ref').hide('fast');
        }
    }

    useEffect(()=>{
        hideToggle();
    }, []);
    return(
        <>
            {
                inMenu 
                    ? <MdMenuOpen onClick={onToggle} className="display-6 pointer back-ref" />
                    : <GiHamburgerMenu onClick={onToggle} className="display-6 pointer menu-ref" />
            }
        </>
    )
}