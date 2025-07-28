import { BrowserRouter, Routes, Route } from "react-router";
import { LogIn, Dashboard, RegistrationRoutes } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Monitoring from "./pages/monitoring/Monitoring";
import Calendar from "./pages/calendar/Calendar";
import UsersRoutes from "./pages/users/UsersRoutes";
import { PopUpProvider } from "./contexts/PopUpContext";
import { LMSRoutes } from "./pages/lms/LMSRoutes";
import { ErrorPage } from "./pages/errors/ErrorPage";
import { VerifyAuthorization } from "./components/permission/VerifyAuthorization";
import { HomeRoutes } from "./pages/home/HomeRoutes";
import { InstituteRoutes } from "./pages/institute/InstituteRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PopUpProvider>
          <Routes>
            <Route path="/*" element={<HomeRoutes />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/registration/*" element={<RegistrationRoutes />} />
            {/* Required log in */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            {/* Required authorization */}
            <Route
              path="/users/*"
              element={
                <VerifyAuthorization authorization="USERS_PAGE">
                  <UsersRoutes />
                </VerifyAuthorization>
              }
            />
            <Route
              path="/monitoring/*"
              element={
                <VerifyAuthorization authorization="MONITORING_PAGE">
                  <Monitoring />
                </VerifyAuthorization>
              }
            />
            <Route path="/calendar/*" element={<Calendar />} />
            <Route
              path="/lms/*"
              element={
                <VerifyAuthorization authorization="LMS_PAGE">
                  <LMSRoutes />
                </VerifyAuthorization>
              }
            />
            <Route path="/institute/*" element={<InstituteRoutes />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </PopUpProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
