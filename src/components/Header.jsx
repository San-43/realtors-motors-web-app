import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const baseClasses =
    "inline-block cursor-pointer py-3 text-sm font-semibold border-b-[3px] transition-colors duration-150";

  const getClasses = ({ isActive }) =>
    [
      baseClasses,
      isActive
        ? "text-black border-b-red-500"
        : "text-gray-400 border-b-transparent hover:text-gray-600",
    ].join(" ");
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <nav>
          <ul className="flex space-x-10">
            <li>
              <NavLink to="/" className={getClasses} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/offers" className={getClasses}>
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign-in" className={getClasses}>
                Sign In
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
