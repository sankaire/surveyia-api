import express from "express";
import indexRoutes from "./routes/index.routes";
import connect from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connect(process.env.MONGO_URL as string);

app.use(express.json());

app.use("/api/auth", indexRoutes.user_router);

export default app;
