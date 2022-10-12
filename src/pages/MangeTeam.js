import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Layout } from "../layout/Layout";
import { Teams } from "../module/logic/Teams";
import { useAuth } from "../provider/AuthenticationWrapper";
import { useProvider } from "../provider/ProviderWrapper";
import { Button } from "../widgets/Button";
import { ImgButton } from "../widgets/ImgButton";
import { Input } from "../widgets/Input";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';
import { ToastHandler } from "../infrastructure/ToastHandler";

const _team_ = new Teams();
const toast = new ToastHandler();

export const ManageTeam = () =>{
    const { user } = useAuth();
    const { addToTeam } = useProvider();

    const [isCreate, setIsCreate] = useState(true);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const nameRef = useRef();
    const clientRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const teamIdRef = useRef();

    const create = async() =>{
        return await _team_.add(
            nameRef.current.value,
            clientRef.current.value,
            descriptionRef.current.value,
            imageRef.current,
            user?.clientId
        );
    }

    const edit = async() =>{
        const response = await _team_.updateTeam({
            name: nameRef.current.value,
            clientName: clientRef.current.value,
            description: descriptionRef.current.value,
            image: imageRef.current || '',
        }, teamIdRef.current);
        navigate(location.pathname, response.first());
        return response;
    }

    const onRunTeam = async() =>{
        if(!clientRef.current.value){
            return toast.error('Must have Client Name.');
        }
        setLoading(true);
        let teamObj = null;
        if (!isCreate){
            await edit();
            return setLoading(false);
        }else teamObj = await create();

        if (teamObj == 'error'){
            return setLoading(false);
        };

        nameRef.current.value = '';
        clientRef.current.value = '';
        descriptionRef.current.value = '';
        descriptionRef.current.focus();
        clientRef.current.focus();
        nameRef.current.focus();

        addToTeam(teamObj);
        setLoading(false);
    }

    useEffect(async()=>{
        let tm = null;
        teamIdRef.current = location.pathname?.split(':')?.[2];
        if(!teamIdRef.current) return;
        if(location.state) tm = location.state;
        else tm = await _team_.getById(teamIdRef.current);

        setIsCreate(false);

        nameRef.current.value = tm?.name || '';
        clientRef.current.value = tm?.clientName || '';
        descriptionRef.current.value = tm?.description || '';

        nameRef.current.focus();
        clientRef.current.focus();
        descriptionRef.current.focus();
    }, []);

    return(
        <div className="overflow-hidden h-100">
            <div className="manage-team-container">
            <h2>{isCreate ? 'Create' : 'Edit'} a team</h2>
                <h1>Let's start with a name for your team</h1>
                <Input title="Name" inputRef={nameRef} />
                <Input title="Client Name" inputRef={clientRef} />
                <div className="fw-bold text-muted mb-4">The client name will appear on all user invoice under this team.</div>
                <Input title="Description" inputRef={descriptionRef} paragraph />
                <div className="mt-3">
                    <Button onClick={onRunTeam} title="Save" cssClass="px-4" disabled={loading} />
                    <span className="float-end">
                        <ImgButton onChange={(img)=>imageRef.current = img} />
                    </span>
                </div>
            </div>
            <Loading loading={loading} />
        </div>
    )
}