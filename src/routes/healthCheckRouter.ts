import { Request, Response } from "express";

export class HealthCheck {
  async check(req: Request, res: Response) {
    const healthCheck = {
      uptime: process.uptime(),
      responseTime: process.hrtime(),
      message: "OK",
      timeStamp: Date.now()
    };
    return res.json(healthCheck);
  }
}
