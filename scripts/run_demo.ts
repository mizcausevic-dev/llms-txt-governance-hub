console.log(
  JSON.stringify(
    {
      product: "LLMs.txt Governance Hub",
      purpose:
        "AEO governance repo for managing llms.txt manifests, route exclusions, freshness windows, and release posture before answer surfaces widen.",
      routes: ["/", "/manifest-board", "/exclusions", "/release-lane", "/verification", "/docs"],
      priorities: [
        "Keep weak or volatile routes out of public answer-engine retrieval",
        "Turn llms.txt changes into a governed release process",
        "Make freshness windows and blocked sections visible",
        "Separate support-safe surfaces from campaign and pricing volatility",
      ],
    },
    null,
    2,
  ),
);
