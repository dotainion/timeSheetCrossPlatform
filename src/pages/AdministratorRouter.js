import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NestedPageNotFound } from "../errors/NestedPageNotFound";
import { LayoutPageHandler } from "../layout/LayoutPageHandler";
import { routes } from "../Routes/Routes";
import { ManageMembers } from "./ManageMembers";
import { ManageTeam } from "./MangeTeam";
import { MembersSpreadsheets } from "./MembersSpreadsheets";


export const AdministratorRouter = () =>{
    const navigate = useNavigate();

    const subMenu = [
        {
            title: 'Manage Members',
            icon: MdManageAccounts,
            onClick: ()=>navigate(routes.route().manageMembers()),
        },{
            title: 'Create a Team',
            icon: MdManageAccounts,
            onClick: ()=>navigate(routes.route().manageTeam()),
        },{
            title: 'Google Sheets',
            icon: AiOutlineGoogle,
            onClick: ()=>navigate(routes.route().membersSpreadsheets()),
        }
    ];
    return(
        <LayoutPageHandler subMenu={subMenu}>
            <Routes>
                <Route path={routes.route().membersSpreadsheets()} element={<MembersSpreadsheets/>} />
                <Route path={routes.route().manageTeam()} element={<ManageTeam/>} />
                <Route path={routes.route().manageMembers()} element={<ManageMembers/>} />
                <Route path="*" element={<NestedPageNotFound />} />
            </Routes>
        </LayoutPageHandler>
    )
}