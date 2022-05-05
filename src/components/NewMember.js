import React, { useEffect, useRef, useState } from "react";
import { ModalXl } from "../container/ModalXl";
import { Roles } from "../infrastructure/Roles";
import { Teams } from "../module/logic/Teams";
import { Users } from "../module/logic/Users";
import { useProvider } from "../provider/ProviderWrapper";
import { Input } from "../widgets/Input";
import { Loading } from "./Loading";


const users = new Users();

export const NewMember = ({isOpen, teamId, onClose, message}) =>{
    const { addToMember } = useProvider();

    const [loading, setLoading] = useState(false);

    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const roleRef = useRef();
    const phoneRef = useRef();
    const genderRef = useRef();
    const imageRef = useRef();

    const addMember = async() =>{
        setLoading(true);
        const rtUsr = await users.add(
            'clientId',
            emailRef.current.value,
            fNameRef.current.value,
            lNameRef.current.value,
            imageRef.current || '',
            roleRef.current.value,
            'supervisorId',
            teamId || '',
            phoneRef.current.value,
            genderRef.current.value
        );

        if (rtUsr == 'error'){
            return setLoading(false);
        };

        emailRef.current.value = '';
        fNameRef.current.value = '';
        lNameRef.current.value = '';
        imageRef.current = '';
        roleRef.current.value = '';
        phoneRef.current.value = '';
        genderRef.current.value = '';

        addToMember(rtUsr);
        setLoading(false);
    }

    return(
        <>
        <ModalXl
            isOpen={isOpen} 
            onClose={onClose}
            title="Create a member"
            message={message}
            onImageSelect={(img)=>imageRef.current = img}
            onConfirm={addMember}
            >
            <Input title="First Name" inputRef={fNameRef} />
            <Input title="Last Name" inputRef={lNameRef} />
            <Input title="Email" inputRef={emailRef} type="email" />
            <Input title="Phone Number" inputRef={phoneRef} />
            <Input title="Gender" inputRef={genderRef} options={[
                { title: 'Male' },
                { title: 'Female' }
            ]} />
            <Input title="Role" inputRef={roleRef} options={new Roles().roles()} />
        </ModalXl>
        <Loading loading={loading} />
        </>
    )
}