import React, { createContext, useState } from "react";

export interface NavbarProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const NavbarContext = createContext<NavbarProps>({} as NavbarProps);

export const NavbarProvider: React.FC<NavbarProps> = (props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ isOpen, setOpen }}>
      {props.children}
    </NavbarContext.Provider>
  );
};
