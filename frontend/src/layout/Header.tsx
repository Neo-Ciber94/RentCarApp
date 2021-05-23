import { createRef, useContext, useEffect, useLayoutEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NavDropdown, NavItem } from "src/components";
import { Routes } from "./routes";
import { useNavbar } from "src/context/NavbarContext";
import { UserRole } from "@shared/types";
import { AuthContext } from "src/context/AuthContext";
import { observer } from "mobx-react-lite";
import "./Header.css";

export const Header: React.FC = () => {
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
            <CurrentUserNav />
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
};

const CurrentUserNav = observer(() => {
  const authService = useContext(AuthContext);
  const role = authService.currentUser?.role;

  switch (role) {
    case UserRole.Employee:
      return <EmployeeNav />;
    case UserRole.Admin:
      return <AdminNav />;
    default:
      return <HomeNav />;
  }
});

// reservation, vehicles, login
const HomeNav: React.FC = () => {
  const { setOpen } = useNavbar();

  return (
    <>
      <NavItem
        key={Routes.reservations.name}
        route={Routes.reservations}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.vehicles.name}
        route={Routes.vehicles}
        onClick={() => setOpen(false)}
      />
      {/** Login/Logout */}
      <NavLoginAndLogout />
    </>
  );
};

// clients, inspection, rent, reservation, vehicles, login
const EmployeeNav: React.FC = () => {
  const { setOpen } = useNavbar();

  return (
    <>
      <NavItem
        key={Routes.clients.name}
        route={Routes.clients}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.inspections.name}
        route={Routes.inspections}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.rent.name}
        route={Routes.rent}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.reservations.name}
        route={Routes.reservations}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.vehicles.name}
        route={Routes.vehicles}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.profile.name}
        route={Routes.profile}
        onClick={() => setOpen(false)}
      />
      {/** Login/Logout */}
      <NavLoginAndLogout />
    </>
  );
};

// employees, model, brand, fuel, ...employee routes
const AdminNav: React.FC = () => {
  const { setOpen } = useNavbar();

  return (
    <>
      <NavDropdown name="Admin">
        <NavItem
          key={Routes.employees.name}
          route={Routes.employees}
          onClick={() => setOpen(false)}
        />
        <NavItem
          key={Routes.models.name}
          route={Routes.models}
          onClick={() => setOpen(false)}
        />
        <NavItem
          key={Routes.brands.name}
          route={Routes.brands}
          onClick={() => setOpen(false)}
        />
        <NavItem
          key={Routes.fuels.name}
          route={Routes.fuels}
          onClick={() => setOpen(false)}
        />
      </NavDropdown>

      {/** Employee routes */}
      <NavItem
        key={Routes.clients.name}
        route={Routes.clients}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.inspections.name}
        route={Routes.inspections}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.rent.name}
        route={Routes.rent}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.reservations.name}
        route={Routes.reservations}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.vehicles.name}
        route={Routes.vehicles}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.profile.name}
        route={Routes.profile}
        onClick={() => setOpen(false)}
      />
      {/** Login/Logout */}
      <NavLoginAndLogout />
    </>
  );
};

const NavLoginAndLogout = observer(() => {
  const authService = useContext(AuthContext);
  const { setOpen } = useNavbar();
  const history = useHistory();

  const logout = () => {
    authService.logout().then(() => {
      history.push("/");
    });
  };

  if (!authService.isAuthenticated) {
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
        className="btn block text-lg p-2 lg:inline-block lg:mt-0 text-gray-400 hover:bg-red-600 hover:text-white focus:outline-none active:bg-red-800"
      >
        Logout
      </button>
    );
  }
});
