import { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nextId from "../utils/nextId";

export default function Header() {
  const [isOpen, setToggleMenu] = useState(false);

  // A reference used for the menu
  const menuRef = createRef<HTMLDivElement>();

  // Listen for the changes in the width to change the navbar menu
  useEffect(() => {
    const menu = menuRef.current!;

    const onResize = () => {
      const currentHeight = menu.getBoundingClientRect().height;
      if (window.screen.width > 1024 && currentHeight > 0) {
        menu.style.height = "0px";
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

    if (!isOpen) {
      let height = 0;

      const children = Array.from(menu.children);
      for (const e of children) {
        height += e.getBoundingClientRect().height;
      }

      menu.style.height = `${height + 16}px`;
    } else {
      menu.style.height = "0px";
    }

    setToggleMenu(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-5 px-3 shadow-md">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span
            id="logo"
            className="font-semibold text-4xl tracking-tight text-red-600"
          >
            Rent Car
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center text-4xl focus:outline-none p-2 rounded hover:text-red-600 hover:border-red-600 focus:border-red-600"
        >
          {isOpen ? (
            <span className="material-icons text-4xl">close</span>
          ) : (
            <span className="material-icons text-4xl">menu</span>
          )}
        </button>
      </div>

      <div
        id="menu"
        ref={menuRef}
        className="w-full block flex-grow lg:flex lg:items-center lg:w-auto transition-all ease-out duration-300 overflow-hidden lg:overflow-visible"
      >
        <div className="text-2xl ml-auto">
          {NavbarRoutes(["reservation", "vehicles", "login"])}
        </div>
      </div>
    </nav>
  );
}

// TODO: Check is don't break when update because the unique Id
function NavbarRoutes(routes: string[]) {
  return routes.map((route) => {
    return (
      <Link
        key={nextId()}
        to={`/${route.toLowerCase()}`}
        className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-red-600 mr-4"
      >
        {route[0].toLocaleUpperCase() + route.slice(1).toLocaleLowerCase()}
      </Link>
    );
  });
}
