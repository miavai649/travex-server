import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  const a = "Hello world";

  res.send(a);
});

export default app;
