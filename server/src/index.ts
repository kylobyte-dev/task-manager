import { Client } from "@notionhq/client";
import { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { swaga } from "./test.ts";

interface Task {
  name: string;
}

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_TOKEN });
const host = "localhost";
const app: Express = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const query = await notion.databases.query({
    database_id: process.env.DATABASE_ID || "",
  });

  const tasks: any[] = query.results.map((row) => {
    return row;
    // return { label: "NOT_FOUND", url: "" };
  });

  res.writeHead(200);
  res.send("Hello");
});

app.post("/tasks", async (req: Request, res: Response) => {
  await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: process.env.DATABASE_ID || "",
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: req.body.name,
            },
          },
        ],
      },
    },
  });
  // if ("properties" in response) {
  //   const task = response.properties.
  // }
  // const task: Task = response
  // res.end(JSON.stringify(response));
  res.writeHead(200);
  res.end(JSON.stringify({ data: "Success" }));
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
