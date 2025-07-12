import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import { NavBar } from "../../components/menu/navbar/NavBar";
import { ErrorPage } from "../errors/ErrorPage";

export function HomeRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<h1>hOLA :d</h1>} />
        <Route path="/contact" element={<h1>hOLA :d</h1>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
