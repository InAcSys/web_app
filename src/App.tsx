import { BrowserRouter, Routes, Route } from "react-router";
import { Home, LogIn, Dashboard, RegistrationRoutes } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/Profile";
import Settings from "./pages/settings/Settings";
import Monitoring from "./pages/monitoring/Monitoring";
import Calendar from "./pages/calendar/Calendar";
import UsersRoutes from "./pages/users/UsersRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/registration/*" element={<RegistrationRoutes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/*" element={<UsersRoutes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/monitoring/*" element={<Monitoring />} />
          <Route path="/calendar/*" element={<Calendar />} />

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
