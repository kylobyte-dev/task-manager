import { Request, Response } from "express";

export async function getTasks(req: Request, res: Response) {
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
}