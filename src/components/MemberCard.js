import React, { useEffect, useRef } from "react";
import { VEllipsisOption } from "../widgets/VEllipsisOption";
import { CgProfile } from 'react-icons/cg';
import $ from 'jquery';


export const MemberCard = ({onClick, icon, name, gender, description, address, number, role, supervisor, menu, useHover}) =>{
    const parentRef = useRef();

    const onTriger = (e) =>{
        e.stopPropagation();
        onClick?.(e);
    }

    return(
        <div ref={parentRef} className="team-card-container card h-scale pointer" style={{width: '18rem'}}>
            <div onClick={onTriger} className={`team-card ${ useHover && 'team-card-hover'}`}>
                {icon}
                <VEllipsisOption
                    option={menu} 
                    parentRef={parentRef}
                    isOpen={(isActive)=>{}}
                />
                <b>{name}</b>
                {role && <div>Role: {role}</div>}
                {supervisor && <div>Supervisor: {supervisor}</div>}
                {number && <div>{number}</div>}
                {gender && <div>Gender: {gender}</div>}
                {address && <div>{address}</div>}
                {description &&<div>{description}</div>}
            </div>
        </div>
    )
}