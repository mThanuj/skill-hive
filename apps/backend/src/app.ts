import express, { Application } from "express";

import "dotenv/config";
import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  }),
);

export { app };
