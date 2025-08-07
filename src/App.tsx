import { Routes, Route, useNavigate } from "react-router";
import { LogIn, Dashboard, RegistrationRoutes } from "./pages";
import { useAuthContext } from "./contexts/AuthContext";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Monitoring from "./pages/monitoring/Monitoring";
import Calendar from "./pages/calendar/Calendar";
import UsersRoutes from "./pages/users/UsersRoutes";
import { usePopUpContext } from "./contexts/PopUpContext";
import { LMSRoutes } from "./pages/lms/LMSRoutes";
import { ErrorPage } from "./pages/errors/ErrorPage";
import { VerifyAuthorization } from "./components/permission/VerifyAuthorization";
import { HomeRoutes } from "./pages/home/HomeRoutes";
import { InstituteRoutes } from "./pages/institute/InstituteRoutes";
import { useEffect } from "react";
import { FailedPopUp } from "./components";

function App() {
  const { jwt } = useAuthContext();
  const { setPopUp } = usePopUpContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === null) return;
    if (!jwt) {
      setPopUp(
        <FailedPopUp message="No tienes autorización para acceder. Por favor, inicia sesión para continuar." />
      );
      navigate("/log-in");
    }
  }, [jwt]);

  return (
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
  );
}

export default App;
