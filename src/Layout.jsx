import Header from "./components/Header";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <Header />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
