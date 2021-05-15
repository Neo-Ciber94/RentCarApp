import { Request, Response } from "express";
import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { authenticateUser } from "./authenticateUser";

@Middleware({ type: "before" })
export class Authentication implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: (err?: any) => any) {
    authenticateUser(request).then((authorized) => {
      if (authorized) {
        next();
      } else {
        response.sendStatus(401);
      }
    });
  }
}
