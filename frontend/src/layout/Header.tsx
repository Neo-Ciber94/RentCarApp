import { createRef, useContext, useEffect, useLayoutEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NavDropdown, NavItem } from "src/components";
import { useNavbar } from "src/context/NavbarContext";
import { UserRole } from "@shared/types";
import { AuthContext } from "src/context/AuthContext";
import { observer } from "mobx-react-lite";
import "./Header.css";
import Routes from "src/routes/Routes";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { isOpen, setOpen } = useNavbar();
  const location = useLocation();

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

  return (
    <nav className="bg-white shadow-md z-10">
      <div className="flex items-center justify-between flex-wrap py-2 sm:p-4">
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
          ref={menuRef}
          className="w-full mt-2 flex-grow lg:flex lg:items-center lg:w-auto transition-all ease-out duration-300 overflow-hidden lg:overflow-visible"
        >
          <div className="text-xl py-3 ml-auto block lg:flex lg:flex-row lg:gap-3">
            <CurrentUserNav />
          </div>
        </div>
      </div>

      {/* Page title */}
      {location.pathname !== "/" && title && <HeaderTitle title={title} />}
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

function HeaderTitle(props: { title: string }) {
  return (
    <div className="bg-red-600 w-full shadow p-4">
      <h1 className="font-bold text-lg text-white select-none">
        {props.title}
      </h1>
    </div>
  );
}

// reservation, vehicles, login
const HomeNav = observer(() => {
  const { setOpen } = useNavbar();
  const authService = useContext(AuthContext);

  const toPath = authService.isAuthenticated
    ? Routes.reservations()
    : Routes.reservations("new");

  return (
    <>
      <NavItem
        key={Routes.reservations()}
        to={toPath}
        routeName={"Reservations"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.vehicles()}
        to={Routes.vehicles()}
        routeName="Vehicles"
        onClick={() => setOpen(false)}
      />
      {/** Login/Logout */}
      <NavLoginAndLogout />
    </>
  );
});

// clients, inspection, rent, reservation, vehicles, login
const EmployeeNav: React.FC = () => {
  const { setOpen } = useNavbar();

  return (
    <>
      <NavItem
        key={Routes.clients()}
        to={Routes.clients()}
        routeName={"Clients"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.inspections()}
        to={Routes.inspections()}
        routeName={"Inspections"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.rents()}
        to={Routes.rents()}
        routeName={"Rents"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.reservations()}
        to={Routes.reservations()}
        routeName={"Reservations"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.vehicles()}
        to={Routes.vehicles()}
        routeName={"Vehicles"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.profile()}
        to={Routes.profile()}
        routeName={"Profile"}
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
          key={Routes.employees()}
          to={Routes.employees()}
          routeName={"Employees"}
          onClick={() => setOpen(false)}
        />
        <NavItem
          key={Routes.models()}
          to={Routes.models()}
          routeName={"Models"}
          onClick={() => setOpen(false)}
        />
        <NavItem
          key={Routes.brands()}
          to={Routes.brands()}
          routeName={"Brands"}
          onClick={() => setOpen(false)}
        />
        <NavItem
          key={Routes.fuels()}
          to={Routes.fuels()}
          routeName={"Fuels"}
          onClick={() => setOpen(false)}
        />
      </NavDropdown>

      {/** Employee routes */}
      <NavItem
        key={Routes.clients()}
        to={Routes.clients()}
        routeName={"Clients"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.inspections()}
        to={Routes.inspections()}
        routeName={"Inspections"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.rents()}
        to={Routes.rents()}
        routeName={"Rents"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.reservations()}
        to={Routes.reservations()}
        routeName={"Reservations"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.vehicles()}
        to={Routes.vehicles()}
        routeName={"Vehicles"}
        onClick={() => setOpen(false)}
      />
      <NavItem
        key={Routes.profile()}
        to={Routes.profile()}
        routeName={"Profile"}
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
        key={Routes.login()}
        to={Routes.login()}
        routeName={"Login"}
        onClick={() => setOpen(false)}
      />
    );
  } else {
    return (
      <button onClick={logout} className="nav-link rounded-lg">
        Logout
      </button>
    );
  }
});
