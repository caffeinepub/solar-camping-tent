import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BarChart3,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Package,
  RefreshCw,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  AdminActorProvider,
  useAdminActorContext,
} from "../hooks/AdminActorContext";
import { isAuthenticated, logout } from "../hooks/useAdminAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const navItems = [
  {
    label: "Dashboard",
    path: "/admin-dashboard",
    icon: LayoutDashboard,
    ocid: "admin.nav.dashboard.link",
  },
  {
    label: "Orders",
    path: "/admin-orders",
    icon: ShoppingCart,
    ocid: "admin.nav.orders.link",
  },
  {
    label: "Customers",
    path: "/admin-customers",
    icon: Users,
    ocid: "admin.nav.customers.link",
  },
  {
    label: "Products",
    path: "/admin-products",
    icon: Package,
    ocid: "admin.nav.products.link",
  },
  {
    label: "Analytics",
    path: "/admin-analytics",
    icon: BarChart3,
    ocid: "admin.nav.analytics.link",
  },
];

function AdminLayoutInner({
  children,
  pageTitle = "Admin Panel",
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/admin-login" });
    }
  }, [navigate]);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin-login" });
  };

  const handleNavClick = (path: string) => {
    setCurrentPath(path);
    setSidebarOpen(false);
    navigate({ to: path as "/" });
  };

  if (!isAuthenticated()) return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700/60">
        <img
          src="/assets/generated/soltrek-logo-transparent.dim_400x200.png"
          alt="SolTrek"
          className="h-10 w-auto object-contain brightness-0 invert opacity-90"
        />
        <div className="mt-1.5 text-xs font-bold tracking-widest uppercase text-slate-400">
          Admin Console
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              type="button"
              data-ocid={item.ocid}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              <Icon
                className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}
                style={{ width: "18px", height: "18px" }}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-700/60">
        <button
          type="button"
          data-ocid="admin.nav.logout.button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-150"
        >
          <LogOut style={{ width: "18px", height: "18px" }} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-slate-900 border-r border-slate-700/40 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/60 z-40 lg:hidden cursor-default"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-slate-900 border-r border-slate-700/40 z-50 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <X style={{ width: "20px", height: "20px" }} />
        </button>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 h-14 flex items-center px-4 sm:px-6 gap-4">
          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="admin.nav.menu.toggle"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu style={{ width: "20px", height: "20px" }} />
          </button>

          <div className="flex-1">
            <h1 className="text-base font-bold text-slate-900">{pageTitle}</h1>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Admin
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          <AdminContentArea>{children}</AdminContentArea>
        </main>
      </div>
    </div>
  );
}

/* ── Inner component that reads actor state and shows loading/error ── */
function AdminContentArea({ children }: { children: React.ReactNode }) {
  const { actor, actorError, retryActor } = useAdminActorContext();

  if (actorError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-sm w-full">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-semibold mb-1">Connection Failed</p>
          <p className="text-red-500 text-sm mb-5">
            Unable to connect to the backend. Please check your connection and
            try again.
          </p>
          <button
            type="button"
            onClick={retryActor}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-slate-500 text-sm font-medium">
            Connecting to backend…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/* ── AdminLayout wraps everything in AdminActorProvider ── */
export default function AdminLayout({ children, pageTitle }: AdminLayoutProps) {
  return (
    <AdminActorProvider>
      <AdminLayoutInner pageTitle={pageTitle}>{children}</AdminLayoutInner>
    </AdminActorProvider>
  );
}
