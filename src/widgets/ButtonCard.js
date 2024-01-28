import React, { useRef } from 'react';
import { BiImport } from 'react-icons/bi';
import { VscAdd } from 'react-icons/vsc';
import { MdManageAccounts } from 'react-icons/md';
import { FaSignature, FaUsersCog, FaUserCircle } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { VEllipsisOption } from './VEllipsisOption';
import { AiOutlineGoogle } from 'react-icons/ai';


export const ButtonCard = ({title, image, subTitle, body, footer, menu, profile, add, user, imports, manage, asign, team, google, onClick, disabled}) =>{
    const parentRef = useRef();

    const onTriger = (e) =>{
        e.stopPropagation();
        onClick?.(e);
    }
    
    return(
        <div ref={parentRef} onClick={onTriger} className={`card m-2 p-0 text-start overflow-hidden ${disabled ? 'text-secondary' : 'h-scale pointer'}`} style={{width: '15rem', position: 'relative'}}>
            {image && <img className="card-img-top" src={image} alt="Card image cap" style={{height: '130px'}} />}
            {add && <VscAdd className={'card-img-top'} />}
            {imports && <BiImport className={'card-img-top'} />}
            {manage && <MdManageAccounts className={'card-img-top'} />}
            {asign && <FaSignature className={'card-img-top'} />}
            {team && <FaUsersCog className={'card-img-top'} />}
            {user && <FaUserCircle className={'card-img-top'} />}
            {google && <AiOutlineGoogle className={'card-img-top'} />}
            {profile && <ImProfile className="position-absolute m-2" style={{fontSize: '20px', right: '0'}} />}
            {menu && <div className="position-absolute end-0 me-2" style={{top: '-10px'}}>
                <VEllipsisOption
                    option={menu} 
                    parentRef={parentRef}
                    isOpen={(isActive)=>{}}
                />
            </div>}
            <div className="card-body overflow-hidden">
                <h5 className="card-title text-truncate">{title}</h5>
                <h6 className="card-subtitle text-muted">{subTitle}</h6>
                <div className="card-text">{body}</div>
            </div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    )
}