import React from "react";
import { NavLink } from "react-router-dom";
import nextId from "../utils/nextId";

interface NavItemProps {
  routeName: string;
  to: string;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ routeName, to, onClick }) => {
  return (
    <NavLink
      key={nextId()}
      activeClassName="active"
      to={to}
      onClick={onClick}
      className="nav-link"
    >
      {routeName}
    </NavLink>
  );
};
