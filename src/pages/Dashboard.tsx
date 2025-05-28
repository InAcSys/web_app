import { useEffect } from "react";
import { NAME_PAGE } from "../utils/constants";
import GeneralLayout from "../layouts/GeneralLayout";
import { WelcomeHeader } from "../components/pages/headers/welcome-header/WelcomeHeader";

export default function Dashboard() {
  useEffect(() => {
    document.title = `Dashboard - ${NAME_PAGE}`;
  }, []);
  return (
    <GeneralLayout header={<WelcomeHeader shortname="Denis Gandarillas" role="Director" />}>
      <h2>Bienvenido :D</h2>
    </GeneralLayout>
  )
}