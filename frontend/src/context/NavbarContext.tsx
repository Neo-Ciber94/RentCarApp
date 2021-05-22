import React, { createContext, useContext, useState } from "react";

export interface NavbarProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const NavbarContext = createContext<NavbarProps>({} as NavbarProps);

export const NavbarProvider: React.FC<{ open?: boolean }> = (props) => {
  const [isOpen, setOpen] = useState(props.open || false);

  return (
    <NavbarContext.Provider value={{ isOpen, setOpen }}>
      {props.children}
    </NavbarContext.Provider>
  );
};

export function useNavbar() {
  return useContext(NavbarContext);
}
