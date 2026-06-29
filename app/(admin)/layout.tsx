"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import { authActions } from "@slices/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
];

function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(authActions.logout());
    router.replace("/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#1e2a4a] flex flex-col h-full">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" fill="white"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-extrabold text-base leading-none">MegaMart</p>
            <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded font-semibold">ADMIN</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-white/10"}`}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <div className="my-3 border-t border-white/10"/>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-100 hover:bg-white/10 transition-colors">
          <span className="text-base">🏪</span> Back to Store
        </Link>
      </nav>

      <div className="p-3 border-t border-white/10">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 transition-colors w-full">
          <span className="text-base">🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}

function TopBar() {
  const user = useSelector(selectAuthUser) as any;
  const name: string = user?.name || user?.email || "Admin";
  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-base font-semibold text-gray-800">Admin Panel</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 hidden sm:block">{name}</span>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
