import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/adminhome",
    icon: "📊",
    end: true,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: "📦",
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: "🛍️",
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: "👥",
  },

];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-slate-900 text-white lg:block">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-700 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold">
            E
          </div>

          <span className="text-xl font-bold">
            EcomAdmin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Dashboard
        </p>

        <div className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>

      </nav>

      {/* Bottom */}
      <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800">
          ⚙️
          Settings
        </button>

        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 hover:bg-slate-800">
          🚪
          Logout
        </button>

      </div>
    </aside>
  );
}
