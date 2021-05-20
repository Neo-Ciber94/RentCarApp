import { createRef, useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import nextId from "../utils/nextId";
import { Routes } from "./routes";
import "./Header.css";

export default function Header() {
  const [isOpen, setToggleMenu] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  // A reference used for the menu
  const menuRef = createRef<HTMLDivElement>();

  // Listen for the changes in the width to change the navbar menu
  useEffect(() => {
    const menu = menuRef.current!;

    const onResize = () => {
      const currentHeight = menu.getBoundingClientRect().height;
      if (window.screen.width > 1024 && currentHeight > 0) {
        if (!menu.classList.contains("h-0")) {
          menu.classList.add("h-0");
        }
        setToggleMenu(false);
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
    setToggleMenu(!isOpen);
  };

  const routes = getCurrentUserNavItems(() => setToggleMenu(false));
  const currentLocation = useLocation();
  const currentRoute = routes.find(
    (e) => e.route.path === currentLocation.pathname
  )?.route;
  console.log(currentLocation);

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
          // style={{ minHeight: menuHeight }}
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto transition-all ease-out duration-300 overflow-hidden lg:overflow-visible"
        >
          <div className="text-xl ml-auto block lg:flex lg:flex-row lg:gap-3">
            <NavDropdown />
            {routes.map((e) => e.component)}
          </div>
        </div>
      </div>

      {/* Page title */}
      {currentRoute && currentRoute.path !== "/" && (
        <div className="bg-red-600 w-full shadow">
          <h1 className="font-bold text-lg text-white">{currentRoute.name}</h1>
        </div>
      )}
    </nav>
  );
}

function getCurrentUserNavItems(fn: () => void) {
  return [
    {
      route: Routes.reservation,
      component: (
        <NavItem
          path={Routes.login.path}
          name={Routes.login.name}
          onClick={fn}
        />
      ),
    },
    {
      route: Routes.vehicles,
      component: (
        <NavItem
          path={Routes.login.path}
          name={Routes.login.name}
          onClick={fn}
        />
      ),
    },
    {
      route: Routes.login,
      component: (
        <NavItem
          path={Routes.login.path}
          name={Routes.login.name}
          onClick={fn}
        />
      ),
    },
  ];
}

function NavItem(props: { path: string; name: string; onClick: () => void }) {
  const { path, name, onClick } = props;

  return (
    <NavLink
      key={nextId()}
      activeClassName="active"
      to={`${path}`}
      onClick={onClick}
      className="block p-4 lg:inline-block lg:mt-0 text-gray-400 hover:bg-red-600 hover:text-white"
    >
      {name}
    </NavLink>
  );
}

function NavDropdown() {
  return (
    <div className="dropdown">
      <button className="text-gray-400 p-4 hover:bg-red-600 hover:text-white dropdown-btn">
        Dropdown
        <i className="fa fa-caret-down ml-2"></i>
      </button>
      <div className="dropdown-content bg-gray-100 lg:bg-white shadow-inner lg:shadow">
        <NavLink
          className="p-4 lg:p-2 text-gray-400 hover:bg-red-600 hover:text-white"
          to="1"
        >
          Link 1
        </NavLink>
        <NavLink
          className="p-4 lg:p-2 text-gray-400 hover:bg-red-600 hover:text-white"
          to="2"
        >
          Link 2
        </NavLink>
        <NavLink
          className="p-4 lg:p-2 text-gray-400 hover:bg-red-600 hover:text-white"
          to="3"
        >
          Link 3
        </NavLink>
      </div>
    </div>
  );
}
