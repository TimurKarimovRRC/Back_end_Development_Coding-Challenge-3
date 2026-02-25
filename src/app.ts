import express from "express";
import morgan from "morgan";
import { healthRoutes } from "./api/v1/routes/healthRoutes";
import { productRoutes } from "./api/v1/routes/productRoutes";


export const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", healthRoutes);
app.use("/api/v1/productRoutes", productRoutes);