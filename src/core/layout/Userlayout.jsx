import { Outlet } from "react-router-dom";
import Navbar from "../../features/home/component/Navbar";


export default function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* <Footer /> */}

    </div>
  );
}
