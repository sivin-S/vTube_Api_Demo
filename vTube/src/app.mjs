import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//  CORS Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);



// Common Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import healthCheckRouter from "./routes/healthCheck.routes.mjs";
import userRouter from './routes/user.routes.mjs'
import { errorHandler } from "./middlewares/error.middlewares.mjs";

// Routes
app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/users",userRouter)


// Error Handler should be the last middleware
app.use(errorHandler)

export { app };
