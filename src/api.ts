import express from "express";
import indexRoutes from "./routes/index.routes";
import connect from "./config/db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

connect(process.env.MONGO_URL as string);

app.use(express.json());
app.use(cors());

app.use("/api/auth", indexRoutes.user_router);
app.use("/api/", indexRoutes.admin_router);

app.use("/", indexRoutes.docs_router);

export default app;
