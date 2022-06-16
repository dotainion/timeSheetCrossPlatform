import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MemberCard } from "../components/MemberCard";
import { Layout } from "../layout/Layout";
import { routes } from "../Routes/Routes";
import { BsFillPersonFill } from 'react-icons/bs';
import { VscAdd } from 'react-icons/vsc';
import bgImg from '../images/member-bg.jpg';
import { NoRecords } from "../components/NoRecords";
import memberIcon from '../images/member-icon.png';
import { Users } from "../module/logic/Users";
import { ModalXl } from "../container/ModalXl";
import { Input } from "../widgets/Input";
import { Button } from "../widgets/Button";
import { Teams } from "../module/logic/Teams";
import $ from 'jquery';
import { ConfirmXl } from "../widgets/ConfirmXl";
import { Loading } from "../components/Loading";
import { useProvider } from "../provider/ProviderWrapper";
import { Roles } from "../infrastructure/Roles";
import { BiImport } from 'react-icons/bi';
import { ButtonCard } from "../widgets/ButtonCard";


const uTeam = new Teams();
const users = new Users();

export const TeamMembers = () =>{
    const { members, initializeMembers } = useProvider();

    const [team, setTeam] = useState();
    const [loading, setLoading] = useState(true);
    const [openSetting, setOpenSetting] = useState({state: false, data: null});

    const location = useLocation();
    const navigate = useNavigate();


    const navOption = [
        {
            title: 'Teams',
            action: ()=>navigate(routes.teams)
        }
    ];

    useEffect(async()=>{
        const id = location.pathname.split(':')?.[2];

        let teamObject;
        if(location.state) teamObject = location.state
        else teamObject = await uTeam.getById(id);

        if(!teamObject?.id){
            return;
        }

        setTeam(teamObject);

        await initializeMembers(teamObject?.id);
        setLoading(false);

        return () =>{

        }
    }, [location]);
    return(
        <Layout options={navOption} title={`Members of team '${team?.name}'.`}>
            <div>
                <div className="team-button-cards-container" style={{backgroundImage: `url(${bgImg})`}}>
                    <ButtonCard onClick={()=>navigate(routes.createMember.replace('teamId', `teamId:${team?.id}`))} title={'Add Member'} add />
                    <ButtonCard onClick={()=>navigate(routes.members)} title={'Import Member'} imports />
                </div>
                {
                    members.length?
                    members.map((usr, key)=>(
                        <MemberCard
                            icon={<BsFillPersonFill/>}
                            name={`${usr.firstName} ${usr.lastName}`}
                            gender={usr.gender}
                            number={usr.number}
                            supervisor="None"
                            role={usr.role}
                            useHover={true}
                            onClick={(e)=>navigate(`${routes.report.replace('memberId', `memberId:${usr.id}`)}`, {state: usr})}
                            menu={[
                                {
                                    title: 'Spreadsheet Settings',
                                    action: (e)=>navigate(`${routes.spreadSheetSettings.replace('userId', `userId:${usr.id}`)}`)
                                },{
                                    title: 'User Settings',
                                    action: (e)=>navigate(`${routes.memberSettings.replace('userId', `userId:${usr.id}`)}`)
                                },{
                                    title: 'Re Assign',
                                    action: (e)=>navigate(routes.members, {state: usr.id})
                                },{
                                    title: 'Report',
                                    action: (e)=>navigate(`${routes.report.replace('memberId', `memberId:${usr.id}`)}`, {state: usr})
                                }
                            ]}
                            key={key}
                        />
                    )):
                    <NoRecords 
                        image={memberIcon}
                        btnName="Add Member"
                        title="Welcome to Time Sheet App"
                        messages={[
                            'Lets get started with creating your first member to the team',
                            'Create your first member by clicking the card  with the plus +.'
                        ]}
                        onClick={()=>{}}
                    />
                }
            </div>
            <Loading loading={loading} />
        </Layout>
    )
}