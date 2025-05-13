import { BrowserRouter, Routes, Route } from "react-router";
import { Home, LogIn, Dashboard, Registration } from "./pages";
import TermsAndConditions from "./pages/registration/TermsAndConditions";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/registration/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
