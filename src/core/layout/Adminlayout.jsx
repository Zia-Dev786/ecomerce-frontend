import { Outlet } from "react-router-dom";
import AdminSidebar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";


export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="lg:ml-64">

        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
