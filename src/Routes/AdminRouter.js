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
import { AccountsRouter } from "./AccountsRouter";


export const AdminRouter = () =>{
    useEffect(()=>{
        
    }, []);
    return(
        <Layout>
            <Routes>
                <Route path={routes.route().dashboard()} element={<RequireAuthRouter element={<Dashboard/>} isAdmin />} />
                <Route path={routes.route().report()} element={<RequireAuthRouter element={<Report/>} isAdmin />} />
                <Route path={routes.route().adminProfile()} element={<RequireAuthRouter element={<AdminProfile/>} isAdmin />} />
                <Route path={routes.route().adminSettings()} element={<RequireAuthRouter element={<AdminSettings/>} isAdmin />} />
                <Route path={routes.route().supervisorClockin()} element={<RequireAuthRouter element={<SupervisorClockIn/>} isAdmin />} />
                <Route path={routes.route().spreadsheetReport()} element={<RequireAuthRouter element={<SpreadsheetReport/>} isAdmin />} />
                <Route path={routes.route().teams()} element={<RequireAuthRouter element={<TeamRouter/>} isAdmin />} />
                <Route path={routes.route().teamMembers()} element={<RequireAuthRouter element={<TeamMembers/>} isAdmin />} />
                <Route path={routes.route().memberSettings()} element={<RequireAuthRouter element={<MemberSettings/>} isAdmin />} />            
                <Route path={routes.route().spreadSheetSettings()} element={<RequireAuthRouter element={<MemberSpreadSheetSettings/>} isAdmin />} />
                <Route path={routes.route().invoice()} element={<RequireAuthRouter element={<Invoice/>} isAdmin />} />
                <Route path={routes.route().administrator()} element={<RequireAuthRouter element={<AdministratorRouter/>} isAdmin />} />
                <Route path={routes.route().adminSchedule()} element={<RequireAuthRouter element={<ScheduleRouter/>} isAdmin />} />
                <Route path={routes.route().accounts()} element={<RequireAuthRouter element={<AccountsRouter/>} isAdmin />} />
                <Route path="*" element={<NestedPageNotFound />} />
            </Routes>
        </Layout>
    )
}