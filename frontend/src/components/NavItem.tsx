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
      className="nav-link"
    >
      {route.name}
    </NavLink>
  );
};
