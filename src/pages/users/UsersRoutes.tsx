import { Route, Routes } from "react-router";
import { SimpleHeader } from "../../components/pages/headers/simple-header/SimpleHeader";
import GeneralLayout from "../../layouts/GeneralLayout";
import UsersManagement from "./pages/UsersManagement";
import { VerifyAuthorization } from "../../components/permission/VerifyAuthorization";

export default function UsersRoutes() {
  return (
    <GeneralLayout header={<SimpleHeader title="Usuarios" />}>
      <Routes>
        <Route
          path="/management"
          element={
            <VerifyAuthorization authorization="USERS_MANAGEMENT_PAGE">
              <UsersManagement />
            </VerifyAuthorization>
          }
        />
      </Routes>
    </GeneralLayout>
  );
}
