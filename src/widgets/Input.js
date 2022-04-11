import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Input = ({title, inputRef, options, defaultOption, paragraph, type, min, max}) =>{
    const titleRef = useRef();
    const inputCRef = useRef();
    const inputContainerRef = useRef();

    const validTypes = [
        'email',
        'number',
        'password',
    ];

    const rmBodorError = () =>{
        $(inputContainerRef.current).css({
            border: ''
        });
    }

    const onFocus = () =>{
        $(titleRef.current).animate({top: '8px', fontSize: '12px'}, 'fast');
        $(inputCRef.current).focus();
        inputRef && $(inputRef?.current).focus();
    }

    const onBlur = () =>{
        if ($(inputCRef.current).val() || inputRef && $(inputRef.current).val()) return;
        $(titleRef.current).animate({top: '50%', fontSize: '18px'}, 'fast');
    }

    useEffect(()=>{
        inputRef 
            ? $(inputRef.current).change(rmBodorError)
            : $(inputCRef.current).change(rmBodorError);
    }, [inputRef]);

    useEffect(()=>{
        const vT = validTypes.filter((t)=>t == type);
        vT.length && $(inputCRef.current).attr('type', vT);
        vT.length && inputRef && $(inputRef?.current).attr('type', vT);
    }, [type]);

    return(
        <div ref={inputContainerRef} onClick={onFocus} className={`input-entery ${options && 'pointer'}`} type={type}>
            <div ref={titleRef} className={`input-entery-title`}>{title}</div>
            {
                !options
                    ? !paragraph 
                        ? <input 
                        ref={inputRef || inputCRef} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        type={type} 
                        min={min} 
                        max={max} 
                        step="1"
                        />
                        : <textarea ref={inputRef || inputCRef} onFocus={onFocus} onBlur={onBlur} />
                    : <select 
                        ref={inputRef || inputCRef} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        defaultValue={defaultOption} 
                        >
                        <option hidden={defaultOption}></option>
                        {options?.map((opt, key)=>(
                            <option value={opt?.value} key={key}>{opt?.title}</option>
                        ))}
                    </select>
            }
            
        </div>
    )
}