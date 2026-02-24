import express from "express";
import morgan from "morgan";
import { healthRoutes } from "./api/v1/routes/healthRoutes";


export const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", healthRoutes);

