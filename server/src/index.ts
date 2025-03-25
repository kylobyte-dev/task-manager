import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import { Client } from "@notionhq/client";
import { CreatePageResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
const bodyParser = require('body-parser');
const cors = require('cors');

interface Task {
  name: string;
}

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_TOKEN });
const host = "localhost";
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    // Will respond to queries to the domain root (like http://localhost/)
    case "/":
      const query = await notion.databases.query({
        database_id: process.env.DATABASE_ID || '',
      });

      const tasks: any[] = query.results.map((row) => {

        return row;
        // return { label: "NOT_FOUND", url: "" };
      });

      res.writeHead(200);
      res.end(JSON.stringify(query.results));
      break;

    // Only supports the / route
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  await notion.pages.create({
    "parent": {
        "type": "database_id",
        "database_id": process.env.DATABASE_ID || ''
    },
    "properties": {
        "Name": {
            "title": [
                {
                    "text": {
                        "content": req.body.name
                    }
                }
            ]
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
})

app.listen(8000, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});