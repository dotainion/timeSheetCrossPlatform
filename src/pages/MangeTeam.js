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

const _team_ = new Teams();

export const ManageTeam = () =>{
    const { user } = useAuth();
    const { addToTeam } = useProvider();

    const [isCreate, setIsCreate] = useState(true);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const teamIdRef = useRef();

    const create = async() =>{
        return await _team_.add(
            nameRef.current.value,
            descriptionRef.current.value,
            imageRef.current,
            user?.clientId
        );
    }

    const edit = async() =>{
        const response = await _team_.updateTeam({
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            image: imageRef.current || '',
        }, teamIdRef.current);
        navigate(location.pathname, response.first());
        return response;
    }

    const onRunTeam = async() =>{
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
        descriptionRef.current.value = '';
        descriptionRef.current.focus();
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

        nameRef.current.value = tm?.name;
        descriptionRef.current.value = tm?.description;

        nameRef.current.focus();
        descriptionRef.current.focus();
    }, []);

    return(
        <div className="overflow-hidden h-100">
            <div className="manage-team-container">
            <h2>{isCreate ? 'Create' : 'Edit'} a team</h2>
                <h1>Let's start with a name for your team</h1>
                <Input title="Name" inputRef={nameRef} />
                <Input title="Description" inputRef={descriptionRef} paragraph />
                <div data-btn-container>
                    <Button onClick={onRunTeam} title="Save" />
                    <ImgButton onChange={(img)=>imageRef.current = img} />
                </div>
            </div>
            <Loading loading={loading} />
        </div>
    )
}