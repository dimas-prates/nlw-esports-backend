import express from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.disable("x-powered-by");
app.use(helmet());
app.use(compression());
app.use(routes);

export default app;