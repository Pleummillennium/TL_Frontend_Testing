import { NavLink } from "react-router";

const navLinks = [
  { label: "My requests", to: "/" },
  { label: "My approve", to: "/approve" },
  { label: "History", to: "/history" },
];

interface NavbarProps {
  userInitials?: string;
}

export default function Navbar({ userInitials = "JM" }: NavbarProps) {
  return (
    <nav className="h-16 border-b border-gray-200 bg-white px-6 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo-tl.svg" alt="" />
        <span className="text-lg font-bold text-blue-600">Portal</span>
      </div>

      {/* Center: Nav links (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive
                  ? "font-semibold text-gray-900"
                  : "font-medium text-gray-500 hover:text-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Right: User avatar */}
      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-sm font-semibold text-white">{userInitials}</span>
      </div>
    </nav>
  );
}
