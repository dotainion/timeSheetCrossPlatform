import React, { useEffect, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import $ from 'jquery';


export const Search = ({inputRef, onSearch}) =>{
    const searchRef = useRef();

    const onTriggerSearch = () =>{
        onSearch?.($(inputRef?.current || searchRef.current).val());
    }

    useEffect(()=>{
        const ref = inputRef? inputRef?.current: searchRef.current
        $(ref).attr('placeholder', 'Search...');
        $(ref).on('keypress', (e)=>{
            if(e.key == 'Enter'){
                onTriggerSearch();
            }
        });
    }, []);
    return(
        <div className={'search-input'}>
            <BiSearchAlt onClick={onTriggerSearch} />
            <input ref={inputRef || searchRef} type={'search'} />
        </div>
    )
}