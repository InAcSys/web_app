import { Routes, Route } from "react-router";
import { RegistrationProvider } from "../../contexts/RegistrationContext";
import Registration from "./Registration";
import TermsAndConditions from "./TermsAndConditions";
import FormLayout from "../../layouts/FormLayout";
import Principal from "./Principal";

export default function RegistrationRoutes() {
  return (
    <RegistrationProvider>
      <FormLayout>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/principal" element={<Principal />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </FormLayout>
    </RegistrationProvider>
  );
}
