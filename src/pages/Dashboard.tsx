import { useEffect } from "react";
import { NAME_PAGE } from "../utils/constants";

export default function Dashboard() {
  useEffect(() => {
    document.title = `Dashboard - ${NAME_PAGE}`;
  }, []);
  return (
    <></>
  )
}