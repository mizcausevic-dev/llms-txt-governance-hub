# Architecture

LLMs.txt Governance Hub is a TypeScript + Express application that renders both operator-facing HTML routes and JSON payloads from the same governance model.

## Surfaces

- HTML routes provide the release and policy-control interface
- JSON routes expose the same summary, manifest, exclusion, and release-lane data for downstream tooling

## Data model

The sample data separates three governance layers:

- manifest records
- route exclusions
- release-lane posture

That structure keeps the app focused on publication governance rather than generic SEO reporting.

## Rendering

The UI is rendered server-side as HTML through a shared shell with route-specific content sections. Screenshot proof assets are generated from real browser renders using headless Edge.
