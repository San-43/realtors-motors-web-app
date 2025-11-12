import React, { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import logo from "../assets/logo.jpg"; // Import correcto del logo


// Header dinamico que refleja el estado de autenticación, mantiene NavLink y estilos actuales
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn, checkingStatus } = useAuthStatus();

  const baseClasses =
    "inline-block cursor-pointer py-3 text-sm font-semibold border-b-[3px] transition-colors duration-150";

  // Reutilizamos la misma función de clases para todos los NavLinks
  const getClasses = ({ isActive }) =>
    [
      baseClasses,
      isActive
        ? "text-black border-b-red-500"
        : "text-gray-400 border-b-transparent hover:text-gray-600",
    ].join(" ");

  // Etiqueta y ruta dinámica del último item del menú
  const authLink = useMemo(
    () => ({
      label: loggedIn ? "Profile" : "Sign In",
      to: loggedIn ? "/profile" : "/sign-in",
    }),
    [loggedIn]
  );

  // Mientras se verifica el estado, evitamos parpadeo mostrando etiqueta neutra
  const authLabel = checkingStatus ? "..." : authLink.label;

  // Determinar si debemos resaltar manualmente (cuando ruta actual es /profile o /sign-in)
  const isAuthActive =
    location.pathname === "/profile" || location.pathname === "/sign-in";

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
              {/** Para mantener NavLink, usamos 'to' dinámico. Añadimos lógica para que se marque activo también cuando cambia la ruta auth. */}
              <NavLink
                to={authLink.to}
                className={(navData) =>
                  getClasses({
                    ...navData,
                    isActive: navData.isActive || isAuthActive,
                  })
                }
              >
                {authLabel}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
