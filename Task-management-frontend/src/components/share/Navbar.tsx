import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react"; // optional icons, can remove
import { useTheme } from "../../utils/useTheme";
import { Button } from "../ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const routes = [
    { path: "/", label: "Dashboard" },
    { path: "/projects", label: "Projects" },
    { path: "/teams", label: "Teams" },
    { path: "/tasks", label: "Tasks" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background  border-b shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        <div className="flex items-center gap-1 font-semibold text-lg">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center  text-sm">
            S
          </div>
          <span>martTask</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive && "text-primary"}`
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden gap-4 md:flex">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
            <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
          </Button>
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
            JD
          </div>
        </div>
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

      {open && (
        <nav className="md:hidden  border-t">
          <div className="flex flex-col p-4 space-y-3">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium block py-2 ${isActive && "text-primary"}`
                }
              >
                {route.label}
              </NavLink>
            ))}

            <div className="flex items-center gap-3 pt-4 border-t">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 text-xs">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
