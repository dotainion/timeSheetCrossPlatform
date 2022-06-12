import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../container/Modal";
import { CgProfile } from 'react-icons/cg';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Input } from "../widgets/Input";
import { Search } from "../components/Search";
import { Roles } from "../infrastructure/Roles";
import { Layout } from "../layout/Layout";
import { Teams } from "../module/logic/Teams";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Users } from "../module/logic/Users";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";

const roles = new Roles();
const _teams_ = new Teams();
const _members_ = new Users();

export const AsignMembers = () =>{
    const { user } = useAuth();

    const [selection, setSelection] = useState([]);
    const [teams, setTeams] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const membersList = useRef();

    const updateRole = async(role, userId) =>{
        _members_.updateUser({role: role}, userId);
    }

    const updateTeam = async(teamId, userId) =>{
        _members_.updateUser({teamId: teamId}, userId);
    }

    const onSearch = (search) =>{
        setLoading(true);
        let maches = [];
        let unMaches = [];
        if(!search) return;
        let s = search?.toLowerCase();
        for(let item of membersList.current || []){
            const fName = item.firstName?.toLowerCase()?.includes(s);
            const lName = item.lastName?.toLowerCase()?.includes(s)
            if (fName || lName) maches.push(item);
            else unMaches.push(item);
        }
        membersList.current = [...maches, ...unMaches];
        setMembers([...maches, ...unMaches]);
        setLoading(false);
    }

    const seletedMembers = (mbrs) =>{
        let maches = [];
        let unMaches = [];
        if(!location.state)return mbrs;
        for(let obj of mbrs){
            if (obj.id == location.state){
                let mbrObj = JSON.parse(JSON.stringify(obj));
                mbrObj['selected'] = true;
                maches.push(mbrObj);
            }else unMaches.push(obj);
        }
        return [...maches, ...unMaches];
    }

    const initialize = async() =>{
        setLoading(true);
        membersList.current = [];
        const tTeams = await _teams_.getByClientId(user?.clientId);
        let tMembers = await _members_.getByClientId(user?.clientId);
        tMembers = seletedMembers(tMembers);
        membersList.current = tMembers;
        setTeams(tTeams);
        setMembers(tMembers);
        setLoading(false);
    }

    useEffect(initialize, []);

    return(
        <Layout>
            <div className="all-member-container">
                <div data-search>
                    <Search onSearch={onSearch} />
                </div>
                <div className="all-members-scroll">
                    {members.map((usr, key)=>(
                        <div className="all-member-card" style={{backgroundColor: usr?.selected && 'lightblue'}} key={key}>
                            <div data-profile>
                                <div data-image>
                                    <CgProfile/>
                                </div>
                                <div>
                                    <span>{usr?.firstName}</span>&nbsp;
                                    <span>{usr?.lastName}</span>
                                    <div>{usr?.email}</div>
                                </div>
                            </div>
                            <div>
                                <select onChange={(e)=>updateRole(e.target.value, usr?.id)} defaultValue={usr?.role}>
                                    {roles.roles().map((role, key)=>(
                                        <option key={key}>{role?.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select onChange={(e)=>updateTeam(e.target.value, usr?.id)} defaultValue={usr?.teamId}>
                                    <option>unassign</option>
                                    {teams.map((role, key)=>(
                                        <option value={role?.id} key={key}>{role?.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Loading loading={loading} />
        </Layout>
    )
}