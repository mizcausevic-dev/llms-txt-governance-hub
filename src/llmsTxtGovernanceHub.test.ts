import { once } from "node:events";

import { describe, expect, it } from "vitest";

import app from "./app";

describe("LLMs.txt Governance Hub", () => {
  it("returns the governance summary payload", async () => {
    const server = app.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();

    if (address === null || typeof address === "string") {
      server.close();
      throw new Error("Server did not bind to an ephemeral port.");
    }

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/api/dashboard/summary`);
      expect(response.status).toBe(200);

      const body = (await response.json()) as { manifestCount: number; blockedCount: number };
      expect(body.manifestCount).toBe(5);
      expect(body.blockedCount).toBe(2);
    } finally {
      server.close();
    }
  });
});
