import React, { createContext } from "react";
import { AuthService } from "src/services/AuthService";

export const AuthContext = createContext<AuthService>({} as AuthService);
const authService = new AuthService();

export const AuthProvider: React.FC<{}> = (props) => {
  return (
    <AuthContext.Provider value={authService}>
      {props.children}
    </AuthContext.Provider>
  );
};
