import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { routes } from "../Routes/Routes";
import { BreadCrumbs } from "../widgets/BreadCrumbs";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import { VscAdd } from 'react-icons/vsc';
import { Modal } from "../container/Modal";
import { Teams as _Teams_ } from '../module/logic/Teams';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineClose } from "react-icons/ai";
import $ from 'jquery';
import { IoIosPeople } from 'react-icons/io';
import bgImg from '../images/team-bg.webp';
import { NoRecords } from "../components/NoRecords";
import teamIcon from '../images/team-icon.png';
import { ModalXl } from "../container/ModalXl";
import { ConfirmXl } from "../widgets/ConfirmXl";
import { Loading } from "../components/Loading";
import { useProvider } from "../provider/ProviderWrapper";
import { ButtonCard } from "../widgets/ButtonCard";
import { useAuth } from "../provider/AuthenticationWrapper";
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';
import img from '../images/stone.jpg';
import { BiMessageRoundedDetail } from 'react-icons/bi';


const team = new _Teams_();

export const Teams = () =>{
    const { user } = useAuth();
    const { teams, addToTeam } = useProvider();

    const [deleteMembersAlso, setDeleteMembersAlso] = useState();
    const [openAlert, setOpenAlert] = useState({state: false, data: null, cardRef: null});

    const navigate = useNavigate();

    const navigateToCreateTeam = () =>{
        const admin = routes.route().admin().replace('*', '') ;
        const team =  routes.route().teams().replace('*', '') ;
        const manage =  routes.route().manageTeam();
        navigate(`${admin}${team}${manage}`);
    }

    const onDeleteTeam = (teamId, cardRef) =>{
        team.delete(teamId, deleteMembersAlso);
        $(cardRef).remove();
    }

    return(
        <div className="overflow-hidden h-100">
            <div className="team-list-container">
                <div className="team-button-cards-container" style={{backgroundImage: `url(${bgImg})`}}>
                    <ButtonCard onClick={navigateToCreateTeam} title={'Add Team'} add />
                </div>
                <ButtonCardContainer>
                    {
                        teams.length?
                        teams.map((obj, key)=>(
                            <ButtonCard 
                                image={img}
                                title={obj.name}
                                //subTitle={<div onClick={()=>console.log(obj)}>hello</div>}
                                body={obj.description}
                                footer={<div className="text-muted">Role: {'none'}</div>}
                                onClick={()=>navigate(`${routes.nested().teamMembers()}:${obj.id}:${obj.name}`, {state: obj})}
                                menu={[
                                    {
                                        title: 'Edit',
                                        action: ()=>navigate(`${routes.nested().manageTeam()}:${obj.id}`, {state: obj})
                                    },{
                                        title: 'Delete',
                                        action: (e)=>setOpenAlert({state: true, data: obj, cardRef: e.ref})
                                    }
                                ]}
                                key={key}
                            />
                        )):
                        <NoRecords 
                            image={teamIcon}
                            btnName = "Add Team"
                            title="Welcome to Time Sheet App"
                            messages={[
                                'Lets get started with creating your first team',
                                'Create your first team by clicking the card  with the plus +.'
                            ]}
                            onClick={navigateToCreateTeam}
                        />
                    }
                </ButtonCardContainer>
            </div>

            <ConfirmXl
                isOpen={openAlert.state}
                title="Warning! This will permanently delete all data conresponding to this team."
                switchMsg="Delete members assocciated with this team."
                switchOnMsg="Members to this team will be deleted."
                message="deleting {'Team Name'}"
                onSwitch={setDeleteMembersAlso}
                onClose={()=>setOpenAlert({state: false, data: null, cardRef: null})}
                onConfirm={()=>onDeleteTeam(openAlert.data.id, openAlert.cardRef)}
            />

        </div>
    )
}