import { BrowserRouter, Routes, Route } from "react-router";
import { Home, LogIn, Dashboard, InstituteRegistration } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/registration/*" element={<InstituteRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
