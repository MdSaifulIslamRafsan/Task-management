import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { Button } from "../ui/button";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import type { TErrorMessage } from "../../Types/errorMessageTypes";
import { useLogoutMutation } from "../../redux/features/auth/authApi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const [removeRefreshToken] = useLogoutMutation();

  const { theme, setTheme } = useTheme();

  const routes = [
    { path: "/", label: "Dashboard" },
    { path: "/projects", label: "Projects" },
    { path: "/teams", label: "Teams" },
    { path: "/tasks", label: "Tasks" },
  ];

  const handleLogout = async () => {
    try {
      await removeRefreshToken({}).unwrap();
      dispatch(logout());
      toast.success("Logout successful");
    } catch (error) {
      toast.error((error as TErrorMessage).message || "Logout failed");
    }
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-1 font-semibold text-lg">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm">
            S
          </div>
          <span>martTask</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-primary" : ""
                }`
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden gap-4 md:flex items-center">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
            <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
          </Button>

          {/* Profile Avatar + Dropdown */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium cursor-pointer"
            >
              JD
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-neutral-900 border rounded-md shadow-md p-2">
                <button
                  onClick={handleLogout}
                  className="text-sm w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
            <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
          </Button>
          <Button variant="outline" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden border-t">
          <div className="flex flex-col p-4 space-y-3">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium block py-2 ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                {route.label}
              </NavLink>
            ))}
            <div className="mt-3">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
            {/* Mobile Profile */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 text-xs cursor-pointer"
                  >
                    JD
                  </div>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
