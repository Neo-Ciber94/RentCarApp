export interface RouteName {
  path: string;
  name: string;
}

export module Routes {
  // Main routes
  export const reservation: RouteName = {
    path: "/reservations",
    name: "Reservation",
  };
  export const vehicles: RouteName = { path: "/vehicles", name: "Vehicles" };
  export const login: RouteName = { path: "/login", name: "Login" };

  // Employee routes
  export const profile: RouteName = { path: "/profile", name: "Profile" };
  export const clients: RouteName = { path: "/clients", name: "Clients" };
  export const inspections: RouteName = {
    path: "/inspections",
    name: "Inspections",
  };
  export const rent: RouteName = { path: "/rents", name: "Rent" };

  // Admin routes
  export const brands: RouteName = { path: "/brands", name: "Brands" };
  export const models: RouteName = { path: "/models", name: "Models" };
  export const employees: RouteName = { path: "/employees", name: "Employees" };
  export const fuels: RouteName = { path: "/fuels", name: "Fuels" };
}
