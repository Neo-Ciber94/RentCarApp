type RouteFragment = string | number;

/**
 * Defines the routes of the app.
 */
module Routes {
  export function vehicles(...rest: RouteFragment[]): string {
    return join("/vehicles", ...rest);
  }

  export function rents(...rest: RouteFragment[]): string {
    return join("/rents", ...rest);
  }

  export function reservations(...rest: RouteFragment[]): string {
    return join("/reservations", ...rest);
  }

  export function inspections(...rest: RouteFragment[]): string {
    return join("/inspections", ...rest);
  }

  export function employees(...rest: RouteFragment[]): string {
    return join("/employees", ...rest);
  }

  export function clients(...rest: RouteFragment[]): string {
    return join("/clients", ...rest);
  }

  export function brands(...rest: RouteFragment[]): string {
    return join("/brands", ...rest);
  }

  export function models(...rest: RouteFragment[]): string {
    return join("/models", ...rest);
  }

  export function fuels(...rest: RouteFragment[]): string {
    return join("/fuels", ...rest);
  }

  export function profile(...rest: RouteFragment[]): string {
    return join("/profile", ...rest);
  }

  export function login() {
    return "/login";
  }

  /**
   * Joins the base route with the rest of the path.
   * @param base Base route path.
   * @param rest Rest of the route path.
   * @returns the complete route path.
   */
  export function join(base: string, ...rest: RouteFragment[]): string {
    if (rest.length === 0) {
      return base;
    }

    return `${base}/${rest.join("/")}`;
  }
}

export default Routes;
