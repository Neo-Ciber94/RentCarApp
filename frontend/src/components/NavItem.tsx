import React from "react";
import { NavLink } from "react-router-dom";
import { RouteName } from "../layout";
import nextId from "../utils/nextId";

interface NavItemProps {
  route: RouteName;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ route, onClick }) => {
  return (
    <NavLink
      key={nextId()}
      activeClassName="active"
      to={{ pathname: route.path, state: route.name }}
      onClick={onClick}
      className="block p-4 lg:inline-block lg:mt-0 text-gray-400 hover:bg-red-600 hover:text-white"
    >
      {route.name}
    </NavLink>
  );
};
