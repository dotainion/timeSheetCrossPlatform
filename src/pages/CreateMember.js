import React, { useEffect, useRef, useState } from "react";
import { ModalXl } from "../container/ModalXl";
import { Roles } from "../infrastructure/Roles";
import { Teams } from "../module/logic/Teams";
import { Users } from "../module/logic/Users";
import { useProvider } from "../provider/ProviderWrapper";
import { Input } from "../widgets/Input";
import { Loading } from "../components/Loading";
import { Authenticate } from '../module/logic/Authenticate';
import { useAuth } from "../provider/AuthenticationWrapper";
import { Validation } from "../infrastructure/Validation";
import $ from 'jquery';
import { BrowserLoginCredentials } from "../infrastructure/BrowserLoginCredentials";
import { Gender } from "../infrastructure/Gender";
import { Layout } from "../layout/Layout";
import { Button } from "../widgets/Button";
import { ImgButton } from "../widgets/ImgButton";
import { useLocation } from "react-router-dom";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';


const auth = new Authenticate();

export const CreateMember = () =>{
    const { user } = useAuth();
    const { addToMember } = useProvider();

    const [loading, setLoading] = useState(false);

    const location = useLocation();

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

        const teamId = location.pathname.split(':')?.[2];

        const rtUsr = await auth.creatUser(
            user?.clientId,
            emailRef.current.value,
            fNameRef.current.value,
            lNameRef.current.value,
            imageRef.current || '',
            roleRef.current.value,
            user?.id,
            teamId == 'unassign' ? '': teamId || '',
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

        addToMember(rtUsr.first());
        setLoading(false);
    }

    useEffect(()=>{
        $(emailRef.current).change((e)=>{
            $(usernameRef.current).val(e.target.value);
            const label = $(usernameRef.current).parent().find('div').first();
            e.target.value 
                ? $(label).addClass('input-title-focus') 
                : $(label).removeClass('input-title-focus');
        });
    }, []);

    return(
        <LayoutPageHandler>
            <div className="create-member-container">
                <h2>Create a member</h2>
                <h1>Let's start with information on your member</h1>
                <Input title="First Name" inputRef={fNameRef} cssClass="border-secondary" />
                <Input title="Last Name" inputRef={lNameRef} cssClass="border-secondary" />
                <Input title="Email" inputRef={emailRef} type="email" cssClass="border-secondary" />
                <Input title="Phone Number" inputRef={phoneRef} cssClass="border-secondary" />
                <Input title="Gender" inputRef={genderRef} options={(new Gender()).genders()} cssClass="border-secondary" />
                <Input title="Role" inputRef={roleRef} options={new Roles().roles()} cssClass="border-secondary" />
                <Input title="Username" inputRef={usernameRef} disabled cssClass="border-secondary" />
                <Input title="Password" inputRef={passwordRef} type="password" cssClass="border-secondary" />
                <div data-btn-container>
                    <Button onClick={addMember} title="Save" />
                    <ImgButton onChange={(img)=>imageRef.current = img} />
                </div>
            </div>
            <Loading loading={loading} />
        </LayoutPageHandler>
    )
}