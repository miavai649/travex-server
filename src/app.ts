import express, { Request, Response } from "express";
import notFound from "./app/modules/middleware/notFound";
import globalErrorHandler from "./app/modules/middleware/globalErrorHandler";
const app = express();

app.get("/", (req: Request, res: Response) => {
  const a = "Hello world";

  res.send(a);
});

// global error handler middleware
app.use(globalErrorHandler);

// not found route middleware
app.use(notFound);

export default app;
