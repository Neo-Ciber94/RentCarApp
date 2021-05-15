import { UserRole } from "@shared/types";
import { API_URL } from "src/config";
import { UserSession, User } from "src/entities";
import { Request } from "express";

// prettier-ignore
export async function authenticateUser(request: Request, allowedRoles: UserRole[] = []) {
  if (needsAuthentication(API_URL, request.url)) {
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

  return roles.includes(user.role);
}

function needsAuthentication(apiUrl: string, url: string) {
  const authUrl = `${apiUrl}/auth`;

  if (url.startsWith(authUrl)) {
    // Split the string removing any query params
    const urlRest = url.slice(authUrl.length).split("?")[0];

    switch (urlRest) {
      case "/signup":
      case "/login":
        return false;
    }
  }

  return true;
}
