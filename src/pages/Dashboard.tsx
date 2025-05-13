import { useEffect } from "react";
import { NAME_PAGE } from "../utils/constants";
import GeneralLayout from "../layouts/GeneralLayout";

export default function Dashboard() {
  useEffect(() => {
    document.title = `Dashboard - ${NAME_PAGE}`;
  }, []);
  return (
    <GeneralLayout>
      
    </GeneralLayout>
  )
}