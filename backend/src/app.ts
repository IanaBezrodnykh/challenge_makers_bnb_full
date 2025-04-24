import express, { Express, Application } from "express";
import dotenv from "dotenv";
// import exampleRouter from "./routes/example.js"; // can delete this later
import appRouter from "./routes/appRouter.js";
import cors from "cors";
import { globalErrorHandler } from "./errorHandlers/errorHandlers.js";

//For env File
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

// app.use("/example", exampleRouter); // can delete this later:

// our routes:
app.use("/", appRouter);

app.use(globalErrorHandler); // this needs to change

export default app;
