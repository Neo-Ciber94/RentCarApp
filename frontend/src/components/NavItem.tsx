import React from "react";
import { NavLink } from "react-router-dom";
import { RouteName } from "../layout";
import nextId from "../utils/nextId";

interface NavItemProps {
  route: RouteName;
  to?: string;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ route, to, onClick }) => {
  const toPath = { pathname: route.path, state: route.name };

  if (to) {
    toPath.pathname = to;
  }

  return (
    <NavLink
      key={nextId()}
      activeClassName="active"
      to={toPath}
      onClick={onClick}
      className="nav-link"
    >
      {route.name}
    </NavLink>
  );
};
