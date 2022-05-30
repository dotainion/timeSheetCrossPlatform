import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Input = ({title, inputRef, options, onChange, defaultOption, paragraph, disabled, fixedLabel, type, min, max}) =>{
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
        $(titleRef.current).addClass('input-entery-title-focus');
        inputRef
            ? $(inputRef?.current).focus()
            : $(inputCRef.current).focus();
    }

    const onBlur = () =>{
        if(fixedLabel) return;
        if ($(inputCRef.current).val() || inputRef && $(inputRef.current).val()) return;
        $(titleRef.current).removeClass('input-entery-title-focus');
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

    useEffect(()=>{
        if (defaultOption){
            onFocus();
        }
    }, [defaultOption]);

    useEffect(()=>{
        if(fixedLabel){
            $(titleRef.current).addClass('input-entery-title-focus');
        }
    }, [fixedLabel]);

    return(
        <div ref={inputContainerRef} className={`input-entery ${options && 'pointer'}`} type={type}>
            <div ref={titleRef} onClick={onFocus} className={`input-entery-title`}>{title}</div>
            {
                !options
                    ? !paragraph 
                        ? <input 
                        ref={inputRef || inputCRef} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={onChange}
                        disabled={disabled}
                        type={type} 
                        min={min} 
                        max={max} 
                        step="1"
                        />
                        : <textarea 
                            ref={inputRef || inputCRef} 
                            disabled={disabled}
                            onChange={onChange} 
                            onFocus={onFocus} 
                            onBlur={onBlur} 
                        />
                    : <select 
                        ref={inputRef || inputCRef} 
                        onFocus={onFocus} 
                        onBlur={onBlur}
                        disabled={disabled}
                        onChange={onChange}
                        defaultValue={defaultOption} 
                        >
                        <option hidden={defaultOption}></option>
                        {options?.map?.((opt, key)=>(
                            <option value={opt?.value} key={key}>{opt?.title}</option>
                        ))}
                    </select>
            }
            
        </div>
    )
}