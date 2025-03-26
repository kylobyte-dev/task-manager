import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

api.get("/", (req: any, res: any) => res.json({
  message: "Hello World",
}));

export const handler = serverless(api);