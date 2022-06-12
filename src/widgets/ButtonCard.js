import React from 'react';
import { BiImport } from 'react-icons/bi';
import { VscAdd } from 'react-icons/vsc';
import { MdManageAccounts } from 'react-icons/md';
import { FaSignature } from 'react-icons/fa';


export const ButtonCard = ({title, add, imports, manage, asign, onClick}) =>{
    return(
        <div className="btn-card-container">
            <div onClick={onClick} className="btn-card">
                {add && <VscAdd className="float-center" />}
                {imports && <BiImport className="float-center" />}
                {manage && <MdManageAccounts className="float-center" />}
                {asign && <FaSignature className="float-center" />}
                <div className="float-center">{title}</div>
            </div>
        </div>
    )
}