import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req: any, res: any) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);