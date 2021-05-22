import { createRef, useEffect, useLayoutEffect } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { NavDropdown, NavItem } from "../components";
import { Routes } from "./routes";
import nextId from "../utils/nextId";
import { useNavbar } from "../context/NavbarContext";
import { AuthService } from "../services/AuthService";
import "./Header.css";

export default function Header() {
  const { isOpen, setOpen } = useNavbar();

  // A reference used for the menu
  const menuRef = createRef<HTMLDivElement>();

  // Set initial state of the navbar menu
  useLayoutEffect(() => {
    if (!isOpen) {
      const menu = menuRef.current!;
      if (!menu.classList.contains("h-0")) {
        menu.classList.add("h-0");
      }
    }
  });

  // Listen for the changes in the width to change the navbar menu
  useEffect(() => {
    const menu = menuRef.current!;

    const onResize = () => {
      const currentHeight = menu.getBoundingClientRect().height;
      if (window.screen.width > 1024 && currentHeight > 0) {
        if (!menu.classList.contains("h-0")) {
          menu.classList.add("h-0");
        }
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  // Collapse or expand the navbar menu
  const toggleMenu = () => {
    const menu = menuRef.current!;

    menu.classList.toggle("h-0");
    setOpen(!isOpen);
  };

  const currentLocation = useLocation<string>();

  return (
    <nav className="bg-white shadow-md z-10">
      <div className="flex items-center justify-between flex-wrap p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span
              id="logo"
              className="font-semibold text-4xl tracking-tight text-red-600 ml-4"
            >
              Rent Car
            </span>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center text-4xl focus:outline-none rounded hover:text-red-600 hover:border-red-600 focus:border-red-600"
          >
            {isOpen ? (
              <span className="material-icons text-4xl">close</span>
            ) : (
              <span className="material-icons text-4xl">menu</span>
            )}
          </button>
        </div>

        {/* Menu */}
        <div
          id="menu"
          ref={menuRef}
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto transition-all ease-out duration-300 overflow-hidden lg:overflow-visible"
        >
          <div className="text-xl ml-auto block lg:flex lg:flex-row lg:gap-3">
            <NavDropdown key={nextId()} name={"Admin"}>
              <NavLink
                className="p-4 lg:p-2 text-gray-400 hover:bg-red-600 hover:text-white"
                to={`/fuel`}
              >
                Employees
              </NavLink>
              <NavLink
                className="p-4 lg:p-2 text-gray-400 hover:bg-red-600 hover:text-white"
                to={`brands`}
              >
                Brands
              </NavLink>
              <NavLink
                className="p-4 lg:p-2 text-gray-400 hover:bg-red-600 hover:text-white"
                to={`/models`}
              >
                Models
              </NavLink>
              <NavLink
                className="p-4 lg:p-2 text-gray-400 hover:bg-red-600 hover:text-white"
                to={`/fuel`}
              >
                Fuel
              </NavLink>
            </NavDropdown>

            <HomeNavItems />
          </div>
        </div>
      </div>

      {/* Page title */}
      {currentLocation.pathname !== "/" && (
        <div className="bg-red-600 w-full shadow p-4">
          <h1 className="font-bold text-lg text-white select-none">
            {currentLocation.state}
          </h1>
        </div>
      )}
    </nav>
  );
}

const HomeNavItems: React.FC = () => {
  const { setOpen } = useNavbar();

  return (
    <>
      <NavItem
        key={Routes.reservation.name}
        route={Routes.reservation}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.vehicles.name}
        route={Routes.vehicles}
        onClick={() => setOpen(false)}
      />
      <NavAuthLink />
    </>
  );
};

// function getEmployeeNav(fn: () => void) {}

// function getAdminNav(fn: () => void) {}

const NavAuthLink: React.FC = () => {
  const authService = new AuthService();
  const { setOpen } = useNavbar();
  const history = useHistory();

  const logout = () => {
    authService.logout();
    history.push("/");
  };

  if (!authService.isLogged) {
    return (
      <NavItem
        key={Routes.login.name}
        route={Routes.login}
        onClick={() => setOpen(false)}
      />
    );
  } else {
    return (
      <button
        onClick={logout}
        className="btn block p-4 lg:inline-block lg:mt-0 text-gray-400 hover:bg-red-600 hover:text-white focus:outline-none active:bg-red-800"
      >
        Logout
      </button>
    );
  }
};
