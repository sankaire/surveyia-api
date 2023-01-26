import express from "express";
import indexRoutes from "./routes/index.routes";

const app = express();

app.use(express.json());

app.use("/api/auth", indexRoutes.user_router);

export default app;
