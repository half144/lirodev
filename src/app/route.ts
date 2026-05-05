import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const filePath = path.join(process.cwd(), "arquivo.md");
  const content = await readFile(filePath, "utf8");

  return new Response(content, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}

