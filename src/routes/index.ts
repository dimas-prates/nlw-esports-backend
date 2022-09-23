import { Router } from "express";
import { HealthCheck } from "./healthCheckRouter";
import gamesRouter from "./gamesRouter";
const routes = Router();

routes.use("/healthCheck", new HealthCheck().check);
routes.use(gamesRouter);
export default routes;