import { useLocation } from "react-router-dom";

const titles = {
  "/admin": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/products": "Products",
  "/admin/customers": "Customers",
  "/admin/posts": "Posts",
};

export default function AdminHeader() {
  const location = useLocation();

  const title = titles[location.pathname] || "Admin Panel";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">

      <div>
        <h1 className="text-xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="hidden text-xs text-slate-500 sm:block">
          Manage your ecommerce store
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="rounded-lg p-2 hover:bg-slate-100">
          🔔
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
