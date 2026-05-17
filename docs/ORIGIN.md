# Why We Built This

Teams started publishing `llms.txt` because they wanted more deliberate control over how large language models discover, summarize, and prioritize their content. The problem is that most organizations treated the file like a convenience layer instead of a governed release surface.

That creates a familiar failure mode. The support center stays factual and reasonably fresh, while campaign pages, pricing language, comparison claims, and partner proof move much faster. Without policy boundaries, those unstable sections get exposed alongside the safer material. Once they are reachable by answer-engine retrieval, they stop behaving like internal content debt and start behaving like public trust debt.

LLMs.txt Governance Hub exists to make that boundary visible. Instead of asking only whether a manifest file exists, it asks whether the sections inside it are evidence-safe, fresh enough, intentionally exposed, and still owned by a real review lane.

The design philosophy is simple:

- operator-first, so release pressure is visible at a glance
- evidence-aware, so blocked or volatile sections stay explicit
- freshness-conscious, so old proof does not quietly ride along into AI-facing surfaces
- release-native, so manifest edits are treated like production changes instead of casual content tweaks

This first version focuses on the core governance questions:
- which manifests are healthy
- which routes are still intentionally excluded
- which release lanes are blocked by evidence or freshness posture
- what should be inspected before the next public push

The roadmap from here is practical:
- diffing `llms.txt` revisions between releases
- approval workflows for widening public exposure
- integration with citation-gap and entity-coverage surfaces
- machine-readable policy exports for broader AEO release orchestration
