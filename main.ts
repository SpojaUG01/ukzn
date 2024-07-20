import { serve } from "https://deno.land/std@0.106.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.106.0/http/file_server.ts";
import { join } from "https://deno.land/std@0.106.0/path/mod.ts";

const server = serve({ port: 8000 });
console.log("HTTP webserver running. Access it at: http://localhost:8000/");

for await (const request of server) {
  const url = new URL(request.url, `http://${request.headers.get("host")}`);
  let filePath = url.pathname;

  if (filePath === "/") {
    filePath = "/index.html";
  }

  try {
    const content = await serveFile(request, join(Deno.cwd(), "public", filePath));
    request.respond(content);
  } catch {
    request.respond({ status: 404, body: "404 Not Found" });
  }
}
