import cors from "cors";
import express, { Application, Request, Response } from "express";
import notFound from "./app/modules/middleware/notFound";
import globalErrorHandler from "./app/modules/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import router from "./app/modules/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// module routes
app.use("/api", router);

// test routes
app.get("/", (req: Request, res: Response) => {
  const a = "Hello world";

  res.send(a);
});

// global error handler middleware
app.use(globalErrorHandler);

// not found route middleware
app.use(notFound);

export default app;
