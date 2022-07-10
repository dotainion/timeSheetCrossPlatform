import React, { useRef } from 'react';
import { BiImport } from 'react-icons/bi';
import { VscAdd } from 'react-icons/vsc';
import { MdManageAccounts } from 'react-icons/md';
import { FaSignature, FaUsersCog, FaUserCircle } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { VEllipsisOption } from './VEllipsisOption';


export const ButtonCard = ({title, subTitle, body, footer, menu, profile, add, user, imports, manage, asign, team, onClick, disabled}) =>{
    const parentRef = useRef();

    const onTriger = (e) =>{
        e.stopPropagation();
        onClick?.(e);
    }
    
    return(
        <div ref={parentRef} onClick={onTriger} className={`card m-2 p-0 text-start overflow-hidden ${disabled ? 'text-secondary' : 'h-scale pointer'}`} style={{width: '18rem', position: 'relative'}}>
            {add && <VscAdd className={'card-img-top'} />}
            {imports && <BiImport className={'card-img-top'} />}
            {manage && <MdManageAccounts className={'card-img-top'} />}
            {asign && <FaSignature className={'card-img-top'} />}
            {team && <FaUsersCog className={'card-img-top'} />}
            {user && <FaUserCircle className={'card-img-top'} />}
            {profile && <ImProfile className="position-absolute m-2" style={{fontSize: '20px', right: '0'}} />}
            {menu && <div className="position-absolute end-0 me-2" style={{top: '-10px'}}>
                <VEllipsisOption
                    option={menu} 
                    parentRef={parentRef}
                    isOpen={(isActive)=>{}}
                />
            </div>}
            <div className="card-body overflow-hidden">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{subTitle}</h6>
                <div className="card-text">{body}</div>
            </div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    )
}