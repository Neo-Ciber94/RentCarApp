import { UserRole } from "@shared/types";
import { BASE_API } from "src/config";
import { UserSession, User } from "src/entities";
import { Request } from "express";

// prettier-ignore
export async function authenticateUser(request: Request, allowedRoles: UserRole[] = []) {
  if (needsAuthentication(request, request.url)) {
    const sessionId = request.sessionID;
    const userId = request.session.userId;

    if (userId) {

      // Get the current session
      const userSession = await UserSession.findOne({
        where: { id: sessionId },
        relations: ["user"],
      });

      // If the session have an user, the user is logged
      if (userSession && userSession.user) {
        return hasValidRole(userSession.user, allowedRoles);
      }
    }

    return false;
  }

  return true;
}

function hasValidRole(user: User, roles: UserRole[]) {
  if (roles.length === 0) {
    return true;
  }

  console.assert(user.role);
  return roles.includes(user.role);
}

function needsAuthentication(request: Request, url: string) {
  const authUrl = `${BASE_API}/auth`;

  // GET from vehicles don't need authentication
  if (url === `${BASE_API}/vehicles` && request.method === "GET") {
    return false;
  }

  // FIXME: Only for create reservations
  if (
    url === `${BASE_API}/clients` ||
    (url === `${BASE_API}/reservations` && request.method === "POST")
  ) {
    return false;
  }

  if (url.startsWith(authUrl)) {
    // Split the string removing any query params
    const urlRest = url.slice(authUrl.length).split("?")[0];

    switch (urlRest) {
      case "/signup":
      case "/login":
      case "/user":
        return false;
    }
  }

  return true;
}
