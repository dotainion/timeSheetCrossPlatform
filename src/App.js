import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

//css styling
import './themes/fonts.css';
import './themes/variables.css';
import './themes/general.css';
import './themes/htmls.css';
import './themes/responsive.css';
import './themes/animation.css';

//pages
import { routes } from './Routes/Routes';
import { ProviderWrapper } from './provider/ProviderWrapper';
import { ClockIn } from './employee/pages/ClockIn';
import { AuthenticationWrapper } from './provider/AuthenticationWrapper';
import { SignIn } from './account/SignIn';
import { Register } from './account/Register';
import { RequireAuthRouter } from './Routes/RequireAuthRouter';
import { Test } from './Test/Test';
import { PageNotFound } from './errors/PageNotFound';
import { AutoUpdateWrapper } from './provider/AutoUpdateWrapper';
import { AdminRouter } from './Routes/AdminRouter';
import { Registrations } from './account/Registrations';
import { Recovery } from './account/Recovery';
import { Settings } from './employee/settings/Settings';


function App() {
  return (
    <HashRouter>
      <AutoUpdateWrapper>
        <AuthenticationWrapper>
          <ProviderWrapper>
            <Routes>
              <Route path={routes.default} element={<Navigate to={routes.signIn} />} />
              {/** public **/}
              <Route path={routes.signIn} element={<RequireAuthRouter element={<SignIn/>} />} />
              <Route path={routes.register} element={<Register/>} />
              <Route path={routes.recovery} element={<Recovery/>} />
              <Route path={routes.registration} element={<Registrations/>} />
              {/** administrator **/}
              <Route path={routes.admin()} element={<RequireAuthRouter element={<AdminRouter/>} isAdmin />} />
              <Route path={'/test'} element={<Test/>} />
              {/** employees **/}
              <Route path={routes.clockIn} element={<RequireAuthRouter element={<ClockIn/>} />} />
              <Route path={routes.settings} element={<RequireAuthRouter element={<Settings/>} />} />
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
