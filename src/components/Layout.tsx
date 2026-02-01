import { Outlet } from "react-router";
import Hero from "./Hero";

export default function Layout() {
  return (
    <main className="container">
      <Hero />
      <Outlet />
    </main>
  );
}