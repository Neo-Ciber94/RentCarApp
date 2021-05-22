import React from "react";
import { NavLink } from "react-router-dom";
import nextId from "../utils/nextId";

interface NavItemProps {
  path: string;
  name: string;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ path, name, onClick }) => {
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
};
