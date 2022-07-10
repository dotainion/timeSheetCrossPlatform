import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import logo from './logo.svg';

//css styling
import './themes/fonts.css';
import './themes/variables.css';
import './themes/general.css';
import './themes/htmls.css';
import './themes/responsive.css';
import './themes/animation.css';

//pages
import { Dashboard } from './pages/Dashboard';
import { Teams } from './pages/Teams';
import { routes } from './Routes/Routes';
import { TeamMembers } from './pages/TeamMembers';
import { ProviderWrapper } from './provider/ProviderWrapper';
import { Report } from './pages/Report';
import { ClockIn } from './employee/pages/ClockIn';
import { AuthenticationWrapper } from './provider/AuthenticationWrapper';
import { SignIn } from './account/SignIn';
import { Register } from './account/Register';
import { Administrator } from './pages/Administrator';
import { ManageMembers } from './pages/ManageMembers';
import { AuthRouter } from './AuthRouter';
import { AllMembers } from './pages/AllMembers';
import { MemberSpreadSheetSettings } from './settings/MemberSpreadSheetSettings';
import { MemberSettings } from './settings/MemberSettings';
import { CreateMember } from './pages/CreateMember';
import { ManageTeam } from './pages/MangeTeam';
import { Test } from './Test/Test';
import { SpreadsheetReport } from './pages/SpreadsheetReport';
import { Invoice } from './pages/Invoice';
import { PageNotFound } from './errors/PageNotFound';
import { AutoUpdateWrapper } from './provider/AutoUpdateWrapper';


function App() {
  return (
    <HashRouter>
      <AutoUpdateWrapper>
        <AuthenticationWrapper>
          <ProviderWrapper>
            <Routes>
              <Route path={routes.default} element={<Navigate to={routes.signIn} />} />
              {/** public **/}
              <Route path={routes.signIn} element={<AuthRouter element={<SignIn/>} />} />
              <Route path={routes.register} element={<Register/>} />
              {/** administrator **/}
              <Route path={routes.manageMembers} element={<AuthRouter element={<ManageMembers/>} isAdmin />} />
              <Route path={routes.dashboard} element={<AuthRouter element={<Dashboard/>} isAdmin />} />
              <Route path={routes.administrator} element={<AuthRouter element={<Administrator/>} isAdmin />} />
              <Route path={routes.report} element={<AuthRouter element={<Report/>} isAdmin />} />
              <Route path={routes.spreadsheetReport} element={<AuthRouter element={<SpreadsheetReport/>} isAdmin />} />
              <Route path={routes.teams} element={<AuthRouter element={<Teams/>} isAdmin />} />
              <Route path={routes.teamMembers} element={<AuthRouter element={<TeamMembers/>} isAdmin />} />
              <Route path={routes.members} element={<AuthRouter element={<AllMembers/>} isAdmin />} />
              <Route path={routes.memberSettings} element={<AuthRouter element={<MemberSettings/>} isAdmin />} />            
              <Route path={routes.createMember} element={<AuthRouter element={<CreateMember/>} isAdmin />} />
              <Route path={routes.spreadSheetSettings} element={<AuthRouter element={<MemberSpreadSheetSettings/>} isAdmin />} />
              <Route path={routes.manageTeam} element={<AuthRouter element={<ManageTeam/>} isAdmin />} />
              <Route path={routes.invoice} element={<AuthRouter element={<Invoice/>} isAdmin />} />
              <Route path={'/test'} element={<AuthRouter element={<Test/>} isAdmin />} />
              {/** employees **/}
              <Route path={routes.clockIn} element={<AuthRouter element={<ClockIn/>} />} />
              {/** not found **/}
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </ProviderWrapper>
        </AuthenticationWrapper>
      </AutoUpdateWrapper>
    </HashRouter>
  );
}

export default App;
