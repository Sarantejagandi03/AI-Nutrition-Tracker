import { Activity, Apple, BarChart3, History, LogOut, ScanBarcode, Target } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice.js";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/scanner", label: "Scanner", icon: ScanBarcode },
  { to: "/history", label: "History", icon: History },
  { to: "/goals", label: "Goals", icon: Target }
];

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7faf8]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <div className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-leaf text-white">
            <Apple size={22} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-950">AI Nutrition</p>
            <p className="text-xs text-slate-500">Tracker</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((navItem) => {
            const Icon = navItem.icon;

            return (
              <NavLink
                key={navItem.to}
                to={navItem.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    isActive ? "bg-limewash text-leaf" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`
                }
              >
                <Icon size={18} />
                {navItem.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4">
          <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <button type="button" className="btn-secondary w-full" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf text-white">
              <Activity size={20} />
            </span>
            <span className="text-sm font-bold text-slate-950">AI Nutrition</span>
          </div>
          <button type="button" className="icon-button" onClick={handleLogout} aria-label="Logout">
            <LogOut size={18} />
          </button>
        </div>
        <nav className="mt-3 grid grid-cols-4 gap-1">
          {navItems.map((navItem) => {
            const Icon = navItem.icon;

            return (
              <NavLink
                key={navItem.to}
                to={navItem.to}
                className={({ isActive }) =>
                  `flex h-11 items-center justify-center rounded-md text-xs font-semibold transition ${
                    isActive ? "bg-limewash text-leaf" : "text-slate-600 hover:bg-slate-50"
                  }`
                }
                aria-label={navItem.label}
              >
                <Icon size={18} />
              </NavLink>
            );
          })}
        </nav>
      </header>

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
