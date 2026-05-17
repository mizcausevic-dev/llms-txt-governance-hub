import express from "express";

import { exclusionBoard, manifestBoard, payload, releaseBoard, summary } from "./services/governanceService";
import {
  renderDocs,
  renderExclusions,
  renderManifestBoard,
  renderOverview,
  renderReleaseLane,
  renderVerification,
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5149);

app.get("/", (_req, res) => {
  res.type("html").send(renderOverview());
});

app.get("/manifest-board", (_req, res) => {
  res.type("html").send(renderManifestBoard());
});

app.get("/exclusions", (_req, res) => {
  res.type("html").send(renderExclusions());
});

app.get("/release-lane", (_req, res) => {
  res.type("html").send(renderReleaseLane());
});

app.get("/verification", (_req, res) => {
  res.type("html").send(renderVerification());
});

app.get("/docs", (_req, res) => {
  res.type("html").send(renderDocs());
});

app.get("/api/dashboard/summary", (_req, res) => {
  res.json(summary());
});

app.get("/api/manifests", (_req, res) => {
  res.json(manifestBoard());
});

app.get("/api/exclusions", (_req, res) => {
  res.json(exclusionBoard());
});

app.get("/api/releases", (_req, res) => {
  res.json(releaseBoard());
});

app.get("/api/sample", (_req, res) => {
  res.json(payload());
});

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`LLMs.txt Governance Hub listening on http://127.0.0.1:${port}`);
  });
}

export default app;
