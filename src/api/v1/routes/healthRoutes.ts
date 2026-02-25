import { Router, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const healthRoutes = Router();

healthRoutes.get("/health", (request: Request, response: Response) => {
  response.status(HTTP_STATUS.OK).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});