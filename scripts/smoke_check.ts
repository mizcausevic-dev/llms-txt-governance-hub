import { once } from "node:events";

import app from "../src/app";

async function run() {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();

  if (address === null || typeof address === "string") {
    server.close();
    throw new Error("Server did not bind to an ephemeral port.");
  }

  const routes = [
    "/",
    "/manifest-board",
    "/exclusions",
    "/release-lane",
    "/verification",
    "/docs",
    "/api/dashboard/summary",
  ];

  try {
    for (const route of routes) {
      const response = await fetch(`http://127.0.0.1:${address.port}${route}`);
      if (!response.ok) {
        throw new Error(`Smoke check failed for ${route} with ${response.status}`);
      }
    }

    console.log("Smoke checks passed for LLMs.txt Governance Hub routes.");
  } finally {
    server.close();
  }
}

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
