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


function App() {
  return (
    <HashRouter>
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
            <Route path={routes.teams} element={<AuthRouter element={<Teams/>} isAdmin />} />
            <Route path={routes.TeamMembers} element={<AuthRouter element={<TeamMembers/>} isAdmin />} />
            {/** employees **/}
            <Route path={routes.clockIn} element={<AuthRouter element={<ClockIn/>} />} />
            {/** not found **/}
            <Route path="*" element={<div>Page Not Found.</div>} />
          </Routes>
        </ProviderWrapper>
      </AuthenticationWrapper>
    </HashRouter>
  );
}

export default App;
