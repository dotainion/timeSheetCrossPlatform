import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

import logo from './logo.svg';

//css styling
import './themes/fonts.css';
import './themes/variables.css';
import './themes/general.css';
import './themes/htmls.css';
import './themes/responsive.css';
import './themes/animation.css';

//pages
import { Teams } from './pages/Teams';
import { routes } from './Routes/Routes';
import { TeamMembers } from './pages/TeamMembers';
import { ProviderWrapper } from './provider/ProviderWrapper';
import { Report } from './pages/Report';
import { ClockIn } from './employee/ClockIn';
import { AuthenticationWrapper } from './provider/AuthenticationWrapper';
import { SignIn } from './account/SignIn';
import { Register } from './account/Register';


function App() {
  return (
    <HashRouter>
      <AuthenticationWrapper>
        <ProviderWrapper>
          <Routes>
            <Route path={routes.home} element={<Register/>} />
            <Route path={routes.signIn} element={<SignIn/>} />
            <Route path={routes.home} element={<Home/>} />
            <Route path={routes.home} element={<ClockIn/>} />
            <Route path={routes.report} element={<Report/>} />
            <Route path={routes.teams} element={<Teams/>} />
            <Route path={routes.TeamMembers} element={<TeamMembers/>} />
          </Routes>
        </ProviderWrapper>
      </AuthenticationWrapper>
    </HashRouter>
  );
}

export default App;
