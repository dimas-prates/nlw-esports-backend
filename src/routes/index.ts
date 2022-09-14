import { Router } from "express";
import { HealthCheck } from "./healthCheckRouter";

const routes = Router();

routes.use("/healthCheck", new HealthCheck().check);
export default routes;