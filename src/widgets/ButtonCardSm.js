import React from "react";
import { VscAdd } from "react-icons/vsc";
import { AiOutlineCheckCircle } from 'react-icons/ai';


export const ButtonCardSm = ({title, image, onClick, isSelected}) =>{
    return(
        <div className="d-inline-block px-0">
            <div onClick={onClick} className={`card bg-dark m-2 text-light ${!isSelected && 'pointer h-scale'}`} style={{width: '200px', minHeight: '130px'}}>
                {isSelected && <AiOutlineCheckCircle className="position-absolute top-0 top-0 end-0 fs-3 bg-dark rounded-circle text-success" style={{transform: 'translate3d(50%, -100%, 0)', zIndex: 1111}} />}
                {image ? <img src={image} className="w-100" alt="" style={{height: '130px'}} /> : <VscAdd className={'card-img-top'} />}
                <div className="p-1">
                    <div className="text-truncate">{title}</div>
                </div>
            </div>
        </div> 
    )
}