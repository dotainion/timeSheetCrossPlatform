import React, { useEffect, useRef, useState } from 'react';
import { RadioButton } from './RadioButton';


export const MultiSelect = ({title, onChange, options}) =>{
    const [selected, setSelected] = useState([]);

    const onSelection = (state, item) =>{
        if (state){
            setSelected([...selected, item]);
        }else{
            let temp = [];
            for(let obj of selected){
                if (obj?.title !== item?.title){
                    temp.push(obj);
                }
            }
            setSelected(temp);
        }
    }

    useEffect(()=>{
        onChange?.(selected);
    }, [selected]);

    return(
        <div className="multi-select-container">
            <div>{title}</div>
            <div className="multi-select-optons">
                {options?.map((opt, key)=>(
                    <div key={key}>
                        <div className="multi-select">
                            <RadioButton 
                                onChange={(checked)=>onSelection(checked, opt)} 
                                title={opt?.title} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
