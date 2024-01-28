import React, { useEffect, useRef, useState } from "react";
import { Authenticate } from "../module/logic/Authenticate";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Loading } from "../components/Loading";
import { useAccounts } from "../provider/AccountsWrapper";
import { routes } from "../Routes/Routes";
import { useNavigate } from "react-router-dom";

const auth = new Authenticate();

export const AddAccounts = () =>{
    const { user } = useAuth();
    const { account, addAvailableAccount } = useAccounts();

    const [loading, setLoading] = useState(false);

    const nameRef = useRef();
    const descriptionRef = useRef();

    const navigate = useNavigate();

    const createAccount = async() =>{
        if(!account?.clientId) return console.log('Cant fine account.');
        setLoading(true);
        const response = await auth.createAccount({
            clientId: account?.clientId,
            name: nameRef.current.value, 
            description: descriptionRef.current.value
        });
        nameRef.current.value = ''; 
        descriptionRef.current.value = '';
        nameRef.current.focus(); 
        descriptionRef.current.focus();
        addAvailableAccount(response.first());
        setLoading(false);

        routes.manageAccount();

        const admin = routes.admin().replace('*', '');
        const accounts = routes.accounts().replace('*', '');
        const manage = routes.manageAccount();
        const manageUrl = `${admin}${accounts}${manage}`;
        navigate(`${manageUrl}:${response.first()?.id}`, {state: response.first()});
    }

    return(
        <div className="p-2">
            <div className="col-md-7 m-auto">
                <div className="my-5 display-6 fw-bold text-center">Create Account</div>
                <Input inputRef={nameRef} title={'Account Name'} />
                <Input inputRef={descriptionRef} title={'Description'} />
                <Button onClick={createAccount} title={'Add Account'} cssClass="float-end mt-4" />
            </div>
            <Loading loading={loading} />
        </div>
    )
}