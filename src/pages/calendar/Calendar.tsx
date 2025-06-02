import { useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import { SubRouteHeader } from "../../components/pages/headers/subroute-header/SubRouteHeader";
import { Route, Routes } from "react-router";

export default function Calendar() {
  const [subRoute] = useState("");

  return (
    <GeneralLayout
      header={<SubRouteHeader title="Calendario" subRoute={subRoute} />}
    >
      <Routes>
        <Route path="/" element={<p>En proceso :D</p>} />
      </Routes>
    </GeneralLayout>
  );
}
