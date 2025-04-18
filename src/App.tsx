import { BrowserRouter, Routes, Route } from "react-router";
import { Home, LogIn, Dashboard, Registration } from "./pages";
import TermsAndConditions from "./pages/registration/TermsAndConditions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
