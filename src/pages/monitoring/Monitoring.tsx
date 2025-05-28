import { Route, Routes } from "react-router";
import { SimpleHeader } from "../../components/pages/headers/simple-header/SimpleHeader";
import GeneralLayout from "../../layouts/GeneralLayout";
import Dashboard from "./pages/Dashboard";

export default function Monitoring() {
  return (
    <GeneralLayout header={<SimpleHeader title="Sistema de monitorización" />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </GeneralLayout>
  )
}