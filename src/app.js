import express from 'express';
import errorHandler from './presentation/api/middleware/errorHandler.js';
import userRoutes from "../src/presentation/api/routes/UserRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;