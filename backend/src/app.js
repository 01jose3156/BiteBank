import express from 'express';
import cors from 'cors';
import errorHandler from './presentation/api/middleware/errorHandler.js';
import userRoutes from "../src/presentation/api/routes/UserRoutes.js";
import transactionRoutes from "./presentation/api/routes/transactionRoutes.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true, 
    })
);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);

export default app;