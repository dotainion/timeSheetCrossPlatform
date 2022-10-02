import React, { useEffect, useRef } from "react";
import $ from 'jquery';


export const Input = ({title, cssClass, inputRef, options, onChange, defaultOption, paragraph, disabled, fixedLabel, type, min, max}) =>{
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
        $(titleRef.current).addClass('input-title-focus');
        inputRef
            ? $(inputRef?.current).focus()
            : $(inputCRef.current).focus();
    }

    const onBlur = () =>{
        if(fixedLabel) return;
        if ($(inputCRef.current).val() || inputRef && $(inputRef.current).val()) return;
        $(titleRef.current).removeClass('input-title-focus');
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
            $(titleRef.current).addClass('input-title-focus');
        }
    }, [fixedLabel]);

    return(
        <div data-input-container className={`${cssClass}`}>
            <div ref={inputContainerRef} className={`mt-2 border-0 border-bottom position-relative ${options && 'pointer'}`} data-input type={type}>
                <div ref={titleRef} onClick={()=>!disabled && onFocus?.()} className="input-title">{title}</div>
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
                            className="w-100 p-2 border-0 bg-transparent"
                            />
                            : <textarea 
                                ref={inputRef || inputCRef} 
                                disabled={disabled}
                                onChange={onChange} 
                                onFocus={onFocus} 
                                onBlur={onBlur} 
                                className="w-100 p-2 border-0 bg-transparent"
                                style={{outline: 'none'}}
                            />
                        : <select 
                            ref={inputRef || inputCRef} 
                            onFocus={onFocus} 
                            onBlur={onBlur}
                            disabled={disabled}
                            onChange={onChange}
                            defaultValue={defaultOption} 
                            className="w-100 p-2 border-0 pointer bg-transparent"
                            >
                            <option hidden={defaultOption}></option>
                            {options?.map?.((opt, key)=>(
                                <option value={opt?.value || opt?.id} key={key}>{opt?.title || opt?.name}</option>
                            ))}
                        </select>
                }
                
            </div>
        </div>
    )
}