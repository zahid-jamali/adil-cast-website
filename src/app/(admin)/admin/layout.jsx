import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Upcoming Shows", href: "/admin/upcoming-shows" },
  { name: "Podcasts", href: "/admin/podcasts" },
  { name: "Stories", href: "/admin/blogs" },
  { name: "Messages", href: "/admin/contact" },
  { name: "Users", href: "/admin/users" },
];

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0B1C2D] text-white flex flex-col">
        <div className="px-6 py-6 text-2xl font-extrabold border-b border-white/10">
          Adil Cast Admin
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10 text-sm text-gray-400">
          © {new Date().getFullYear()} Adil Cast
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
