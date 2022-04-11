import React, { useEffect, useRef } from "react";
import { VEllipsisOption } from "../widgets/VEllipsisOption";
import { CgProfile } from 'react-icons/cg';
import $ from 'jquery';


export const MemberCard = ({onClick, icon, name, gender, description, address, number, role, supervisor, menu, asBtn, children}) =>{
    const parentRef = useRef();

    return(
        <div ref={parentRef} className="team-card-container">
            <div className="team-card">
                <div hidden={asBtn}>
                    {icon}
                    <VEllipsisOption
                        option={menu} 
                        parentRef={parentRef}
                    />
                </div>
                <b>{name}</b>
                {role && <div>Role: {role}</div>}
                {supervisor && <div>Supervisor: {supervisor}</div>}
                {number && <div>{number}</div>}
                {gender && <div>Gender: {gender}</div>}
                {address && <div>{address}</div>}
                {description &&<div>{description}</div>}
                <div onClick={onClick} hidden={!asBtn} className="team-cart-children">{children}</div>
            </div>
        </div>
    )
}