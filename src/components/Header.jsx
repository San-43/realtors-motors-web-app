import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/logo.jpg";
export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);
  const baseClasses =
    "inline-block cursor-pointer py-3 text-sm font-semibold border-b-[3px] transition-colors duration-150";
  const getClasses = ({ isActive }) =>
    [
      baseClasses,
      isActive
        ? "text-black border-b-red-500"
        : "text-gray-400 border-b-transparent hover:text-gray-600",
    ].join(" ");
  const authTo = pageState === "Profile" ? "/profile" : "/sign-in";
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={logo}
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <nav>
          <ul className="flex space-x-10">
            <li>
              <NavLink to="/" end className={getClasses}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/offers" className={getClasses}>
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink to={authTo} className={getClasses}>
                {pageState}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
