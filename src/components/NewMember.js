import React, { useEffect, useRef, useState } from "react";
import { ModalXl } from "../container/ModalXl";
import { Roles } from "../infrastructure/Roles";
import { Teams } from "../module/logic/Teams";
import { Users } from "../module/logic/Users";
import { useProvider } from "../provider/ProviderWrapper";
import { Input } from "../widgets/Input";
import { Loading } from "./Loading";
import { Authenticate } from '../module/logic/Authenticate';
import { useAuth } from "../provider/AuthenticationWrapper";
import { Validation } from "../infrastructure/Validation";
import $ from 'jquery';


const auth = new Authenticate();

export const NewMember = ({isOpen, teamId, onClose, message}) =>{
    const { user } = useAuth();
    const { addToMember } = useProvider();

    const [loading, setLoading] = useState(false);

    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const roleRef = useRef();
    const phoneRef = useRef();
    const genderRef = useRef();
    const imageRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const addMember = async() =>{
        setLoading(true);

        const rtUsr = await auth.creatUser(
            user?.clientId,
            emailRef.current.value,
            fNameRef.current.value,
            lNameRef.current.value,
            imageRef.current || '',
            roleRef.current.value,
            user?.id,
            teamId || '',
            phoneRef.current.value,
            genderRef.current.value,
            passwordRef.current.value
        );

        if (!rtUsr) return setLoading(false);

        emailRef.current.value = '';
        fNameRef.current.value = '';
        lNameRef.current.value = '';
        imageRef.current = '';
        roleRef.current.value = '';
        phoneRef.current.value = '';
        genderRef.current.value = '';
        usernameRef.current.value = '';
        passwordRef.current.value = '';

        addToMember(rtUsr);
        setLoading(false);
    }

    useEffect(()=>{
        $(emailRef.current).change((e)=>{
            $(usernameRef.current).val(e.target.value);
            const label = $(usernameRef.current).parent().find('.input-entery-title')[0];
            e.target.value 
                ? $(label).addClass('input-entery-title-focus') 
                : $(label).removeClass('input-entery-title-focus');
        });
    }, []);

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
            <Input title="Username" inputRef={usernameRef} disabled />
            <Input title="Password" inputRef={passwordRef} type="password" />
        </ModalXl>
        <Loading loading={loading} />
        </>
    )
}