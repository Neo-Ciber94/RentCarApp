import { Response } from "express";

export function handleError(error: any, response: Response) {
  console.error(error);
  return response.sendStatus(500);
}
