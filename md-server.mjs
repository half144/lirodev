import http from "node:http";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const port = Number(process.env.PORT || 3010);
const filePath = resolve(process.cwd(), "arquivo.md");

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return;
  }

  if ((req.url || "/") !== "/") {
    res.statusCode = 404;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Not Found");
    return;
  }

  try {
    const content = await readFile(filePath, "utf8");
    res.statusCode = 200;
    res.setHeader("content-type", "text/markdown; charset=utf-8");
    res.end(content);
  } catch {
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Failed to read arquivo.md");
  }
});

server.listen(port);

