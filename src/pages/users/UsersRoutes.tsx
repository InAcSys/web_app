import { Route, Routes } from "react-router";
import { SimpleHeader } from "../../components/pages/headers/simple-header/SimpleHeader";
import GeneralLayout from "../../layouts/GeneralLayout";
import UsersManagement from "./pages/UsersManagement";

export default function UsersRoutes() {
  return (
    <GeneralLayout header={<SimpleHeader title="Usuarios" />}>
      <Routes>
        <Route path="/management" element={<UsersManagement /> } />
      </Routes>
    </GeneralLayout>
  )
}