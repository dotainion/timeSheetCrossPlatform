import React, { useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from "../layout/Layout";
import { AllMembers } from "../pages/AllMembers";
import { Dashboard } from "../pages/Dashboard";
import { Invoice } from "../pages/Invoice";
import { ManageMembers } from "../pages/ManageMembers";
import { ManageTeam } from "../pages/MangeTeam";
import { MembersSpreadsheets } from "../pages/MembersSpreadsheets";
import { Report } from "../pages/Report";
import { SpreadsheetReport } from "../pages/SpreadsheetReport";
import { TeamMembers } from "../pages/TeamMembers";
import { Teams } from "../pages/Teams";
import { MemberSettings } from "../settings/MemberSettings";
import { MemberSpreadSheetSettings } from "../settings/MemberSpreadSheetSettings";
import { RequireAuthRouter } from "./RequireAuthRouter";
import { PageNotFound } from "../errors/PageNotFound"
import { routes } from "./Routes";
import { NestedPageNotFound } from "../errors/NestedPageNotFound";
import { Messages } from "../messages/Messages";
import { TeamRouter } from "./TeamRouter";
import { AdministratorRouter } from "./AdministratorRouter";
import { SupervisorClockIn } from "../pages/SupervisorClockIn";
import { AdminProfile } from "../profiles/AdminProfile";
import { AdminSettings } from "../settings/AdminSettings";
import { ScheduleRouter } from "./ScheduleRouter";
import { LayoutPageHandler } from "../layout/LayoutPageHandler";
import { AddAccounts } from "../pages/AddAccounts";
import { Accounts } from "../pages/Accounts";
import { ManageAccount } from "../pages/ManageAccount";


export const AccountsRouter = () =>{
    useEffect(()=>{
        
    }, []);
    return(
        <LayoutPageHandler>
            <Routes>
                <Route path="*" element={<Accounts />} />
                <Route path={routes.nested().newAccount()} element={<AddAccounts />} />
                <Route path={routes.nested().manageAccount()} element={<ManageAccount />} />
            </Routes>
        </LayoutPageHandler>
    )
}