import { serve } from "https://deno.land/std/http/server.ts";
import { router } from "https://deno.land/x/rutt/mod.ts";

await serve(
  router({
    "/next-app/*?": (req) => rewriteReq(req, "localhost:3000"),
    "/*?": (req) => rewriteReq(req, "localhost:4173"),
  })
);

function rewriteReq(req, host) {
  const url = new URL(req.url);
  url.host = host;
  console.log(`Proxying to ${url.toString()}`);
  return fetch(url, req);
}
