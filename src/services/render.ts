import { exclusionBoard, manifestBoard, releaseBoard, summary } from "./governanceService";

const pageTitle = "LLMs.txt Governance Hub";

function shell(active: string, title: string, intro: string, content: string) {
  const current = summary();

  const links = [
    { href: "/", label: "Overview" },
    { href: "/manifest-board", label: "Manifest board" },
    { href: "/exclusions", label: "Exclusions" },
    { href: "/release-lane", label: "Release lane" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" },
  ];

  const nav = links
    .map(
      (link) =>
        `<a class="nav-link${link.href === active ? " is-active" : ""}" href="${link.href}">${link.label}</a>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111f;
        --panel: #0b1728;
        --panel-strong: #0d1d33;
        --panel-soft: #102038;
        --line: rgba(136, 170, 230, 0.16);
        --text: #eef4ff;
        --muted: #8ea2c7;
        --accent: #79bcff;
        --accent-strong: #6c72ff;
        --watch: #f5c96b;
        --blocked: #ff7a90;
        --good: #6ad3b0;
        --shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: Inter, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top center, rgba(104, 118, 255, 0.16), transparent 34%),
          linear-gradient(180deg, #07111f 0%, #08101b 100%);
        color: var(--text);
      }

      a { color: inherit; text-decoration: none; }

      .page {
        max-width: 1460px;
        margin: 0 auto;
        padding: 30px 28px 46px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 18px 22px;
        border: 1px solid var(--line);
        border-radius: 30px;
        background: rgba(8, 18, 33, 0.88);
        box-shadow: var(--shadow);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 16px;
        min-width: 0;
      }

      .brand-mark {
        width: 52px;
        height: 52px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        font-weight: 800;
        font-size: 24px;
        color: white;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
      }

      .brand-copy strong {
        display: block;
        font-size: 14px;
        letter-spacing: 0.01em;
      }

      .brand-copy span {
        display: block;
        margin-top: 3px;
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.18em;
      }

      .nav {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .nav-link {
        padding: 14px 18px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.02);
        color: #d2ddf4;
        font-weight: 700;
        font-size: 14px;
      }

      .nav-link.is-active {
        background: linear-gradient(135deg, #39a8ec 0%, #6970ff 100%);
        color: white;
        border-color: transparent;
      }

      .hero {
        margin-top: 22px;
        padding: 28px 28px 24px;
        border-radius: 32px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(11, 23, 40, 0.98) 0%, rgba(10, 20, 35, 0.96) 100%);
        box-shadow: var(--shadow);
      }

      .eyebrow {
        margin: 0 0 12px;
        color: var(--accent);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 12ch;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(42px, 5vw, 78px);
        line-height: 0.96;
        letter-spacing: -0.045em;
      }

      .intro {
        max-width: 70ch;
        margin: 14px 0 0;
        color: #b8c7e4;
        font-size: 18px;
        line-height: 1.45;
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 18px;
        margin-top: 24px;
      }

      .metric-card,
      .panel,
      .lane-card,
      .manifest-card,
      .exclusion-card {
        border-radius: 24px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.035);
      }

      .metric-card {
        padding: 18px 18px 16px;
        min-height: 170px;
      }

      .metric-card h2,
      .panel h2,
      .lane-card h2 {
        margin: 0;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        color: var(--accent);
      }

      .metric-card strong {
        display: block;
        margin-top: 16px;
        font-size: 58px;
        line-height: 0.95;
      }

      .metric-card p {
        margin: 12px 0 0;
        color: var(--muted);
        line-height: 1.45;
        font-size: 15px;
      }

      .section-grid {
        display: grid;
        grid-template-columns: 1.4fr 1fr;
        gap: 20px;
        margin-top: 22px;
      }

      .panel {
        padding: 22px;
      }

      .panel p {
        color: var(--muted);
        line-height: 1.55;
      }

      .manifest-list,
      .release-list,
      .exclusion-list {
        display: grid;
        gap: 16px;
        margin-top: 16px;
      }

      .manifest-card,
      .exclusion-card {
        padding: 18px 18px 16px;
      }

      .manifest-top,
      .exclusion-top {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 16px;
      }

      .manifest-top strong,
      .exclusion-top strong {
        display: block;
        font-size: 28px;
        line-height: 1;
      }

      .manifest-meta,
      .exclusion-meta {
        margin-top: 8px;
        color: var(--muted);
        font-size: 14px;
      }

      .badge {
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-weight: 800;
      }

      .status-blocked,
      .status-active {
        color: var(--blocked);
        background: rgba(255, 122, 144, 0.12);
      }

      .status-watch,
      .status-expiring {
        color: var(--watch);
        background: rgba(245, 201, 107, 0.12);
      }

      .status-release-ready,
      .status-remove {
        color: var(--good);
        background: rgba(106, 211, 176, 0.12);
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-top: 16px;
      }

      .subcard {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.03);
      }

      .subcard h3 {
        margin: 0;
        color: #e9f0ff;
        font-size: 17px;
      }

      .subcard p,
      .subcard ul {
        color: var(--muted);
        line-height: 1.5;
      }

      .subcard ul {
        margin: 10px 0 0;
        padding-left: 18px;
      }

      .lane-card {
        padding: 18px 18px 16px;
      }

      .lane-card h3 {
        margin: 14px 0 6px;
        font-size: 26px;
      }

      .lane-meta {
        color: var(--muted);
        display: grid;
        gap: 6px;
        font-size: 14px;
      }

      .footer-note {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-top: 18px;
        color: var(--muted);
        font-size: 14px;
      }

      .footer-note strong {
        color: #dbe8ff;
      }

      @media (max-width: 1120px) {
        .metrics,
        .section-grid,
        .card-grid {
          grid-template-columns: 1fr 1fr;
        }

        .topbar {
          align-items: start;
          flex-direction: column;
        }
      }

      @media (max-width: 820px) {
        .page {
          padding: 18px 14px 34px;
        }

        .metrics,
        .section-grid,
        .card-grid {
          grid-template-columns: 1fr;
        }

        .nav {
          width: 100%;
          justify-content: start;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="topbar">
        <div class="brand">
          <div class="brand-mark">LT</div>
          <div class="brand-copy">
            <strong>${pageTitle}</strong>
            <span>Manifest control + release posture</span>
          </div>
        </div>
        <div class="nav">${nav}</div>
      </div>

      <section class="hero">
        <p class="eyebrow">Verification-safe llms.txt governance</p>
        <h1>${title}</h1>
        <p class="intro">${intro}</p>

        <div class="metrics">
          <div class="metric-card">
            <h2>Managed manifests</h2>
            <strong>${current.manifestCount}</strong>
            <p>Public and review-gated answer surfaces currently tracked inside the governance lane.</p>
          </div>
          <div class="metric-card">
            <h2>Blocked lanes</h2>
            <strong>${current.blockedCount}</strong>
            <p>Manifest surfaces still carrying claims that should not be released into answer-engine retrieval.</p>
          </div>
          <div class="metric-card">
            <h2>Expiring exclusions</h2>
            <strong>${current.expiringCount}</strong>
            <p>Excluded routes that need a review decision before they quietly drift into public crawl territory.</p>
          </div>
          <div class="metric-card">
            <h2>Release-ready</h2>
            <strong>${current.releaseReadyCount}</strong>
            <p>Surfaces with enough freshness and evidence posture to move safely through the current release lane.</p>
          </div>
        </div>
      </section>

      ${content}
    </div>
  </body>
</html>`;
}

export function renderOverview() {
  const manifests = manifestBoard().slice(0, 3);
  const exclusions = exclusionBoard().slice(0, 2);
  const current = summary();

  return shell(
    "/",
    "Keep llms.txt releases inside evidence and freshness guardrails.",
    "This hub tracks which answer-surface manifests are open, which sections are intentionally blocked, and where freshness or policy posture should stop a release before it weakens AI-facing trust.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>Lead recommendation</h2>
          <p>${current.leadRecommendation}</p>
          <div class="manifest-list">
            ${manifests
              .map(
                (item) => `
                  <article class="manifest-card">
                    <div class="manifest-top">
                      <div>
                        <strong>${item.surface}</strong>
                        <div class="manifest-meta">${item.owner} · ${item.policyMode} policy · updated ${item.lastUpdatedDays} days ago</div>
                      </div>
                      <span class="badge status-${item.status}">${item.status}</span>
                    </div>
                    <div class="card-grid">
                      <div class="subcard">
                        <h3>Blocked sections</h3>
                        <p>${item.blockedSections.length ? item.blockedSections.join(", ") : "No blocked sections."}</p>
                      </div>
                      <div class="subcard">
                        <h3>Next action</h3>
                        <p>${item.nextAction}</p>
                      </div>
                    </div>
                  </article>`,
              )
              .join("")}
          </div>
        </div>

        <div class="panel">
          <h2>Exclusion pressure</h2>
          <p>Route-level exclusions are useful only when they stay deliberate. This lane keeps the crawl boundary visible.</p>
          <div class="exclusion-list">
            ${exclusions
              .map(
                (item) => `
                  <article class="exclusion-card">
                    <div class="exclusion-top">
                      <div>
                        <strong>${item.route}</strong>
                        <div class="exclusion-meta">${item.owner} · review in ${item.reviewWindowDays} days</div>
                      </div>
                      <span class="badge status-${item.status}">${item.status}</span>
                    </div>
                    <p>${item.reason}</p>
                  </article>`,
              )
              .join("")}
          </div>
          <div class="footer-note">
            <span>Average freshness age: <strong>${current.averageFreshnessDays} days</strong></span>
            <span>Goal: keep public answer surfaces inside explicit review windows.</span>
          </div>
        </div>
      </section>
    `,
  );
}

export function renderManifestBoard() {
  const manifests = manifestBoard();

  return shell(
    "/manifest-board",
    "See which manifests are safe to expose and which ones still need containment.",
    "The manifest board turns llms.txt into a governed release surface instead of a static file that quietly drifts out of policy.",
    `
      <section class="panel" style="margin-top: 22px;">
        <h2>Manifest review lane</h2>
        <div class="manifest-list">
          ${manifests
            .map(
              (item) => `
                <article class="manifest-card">
                  <div class="manifest-top">
                    <div>
                      <strong>${item.surface}</strong>
                      <div class="manifest-meta">${item.owner} · ${item.policyMode} policy · freshness window ${item.freshnessWindowDays} days</div>
                    </div>
                    <span class="badge status-${item.status}">${item.status}</span>
                  </div>
                  <div class="card-grid">
                    <div class="subcard">
                      <h3>Exposed sections</h3>
                      <p>${item.exposedSections.join(", ")}</p>
                    </div>
                    <div class="subcard">
                      <h3>Blocked sections</h3>
                      <p>${item.blockedSections.length ? item.blockedSections.join(", ") : "No blocked sections."}</p>
                    </div>
                    <div class="subcard">
                      <h3>Lead risk</h3>
                      <p>${item.leadRisk}</p>
                    </div>
                    <div class="subcard">
                      <h3>Next action</h3>
                      <p>${item.nextAction}</p>
                    </div>
                  </div>
                </article>`,
            )
            .join("")}
        </div>
      </section>
    `,
  );
}

export function renderExclusions() {
  const items = exclusionBoard();

  return shell(
    "/exclusions",
    "Track the routes you are intentionally holding out of public answer-engine retrieval.",
    "Exclusions matter when they stay fresh, justified, and reviewable. Otherwise they become hidden policy debt.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>Exclusion register</h2>
          <div class="exclusion-list">
            ${items
              .map(
                (item) => `
                  <article class="exclusion-card">
                    <div class="exclusion-top">
                      <div>
                        <strong>${item.route}</strong>
                        <div class="exclusion-meta">${item.owner} · review window ${item.reviewWindowDays} days</div>
                      </div>
                      <span class="badge status-${item.status}">${item.status}</span>
                    </div>
                    <p>${item.reason}</p>
                  </article>`,
              )
              .join("")}
          </div>
        </div>
        <div class="panel">
          <h2>Governance rules</h2>
          <div class="card-grid">
            <article class="subcard">
              <h3>Use exclusions intentionally</h3>
              <p>Routes should be excluded because they are unstable, unsupported, or unsafe to summarize, not because they are inconvenient to govern.</p>
            </article>
            <article class="subcard">
              <h3>Expire them on purpose</h3>
              <p>Each exclusion should carry an owner and a review window so the policy surface does not drift into permanent ambiguity.</p>
            </article>
            <article class="subcard">
              <h3>Separate volatility from secrecy</h3>
              <p>Campaign pages, pricing calculators, and dynamic comparison claims are often volatile rather than private. Treat them as release risks.</p>
            </article>
            <article class="subcard">
              <h3>Reconnect to the release lane</h3>
              <p>An exclusion should always point back to the evidence or approval work needed before the route can safely re-enter the public manifest.</p>
            </article>
          </div>
        </div>
      </section>
    `,
  );
}

export function renderReleaseLane() {
  const lanes = releaseBoard();

  return shell(
    "/release-lane",
    "Move llms.txt changes through a release lane that makes evidence, freshness, and approvals visible.",
    "This lane keeps answer-surface publishing tied to actual review posture instead of letting the manifest change silently alongside content edits.",
    `
      <section class="panel" style="margin-top: 22px;">
        <h2>Release sequence</h2>
        <div class="release-list">
          ${lanes
            .map(
              (item) => `
                <article class="lane-card">
                  <h2>${item.lane}</h2>
                  <h3>${item.surface}</h3>
                  <div class="lane-meta">
                    <span>Evidence coverage: ${item.evidenceCoverage}</span>
                    <span>Freshness state: ${item.freshnessState}</span>
                    <span>Approval state: ${item.approvalState}</span>
                    <span>Next step: ${item.nextStep}</span>
                  </div>
                </article>`,
            )
            .join("")}
        </div>
        <div class="footer-note">
          <span>Release rule: <strong>do not widen answer surfaces faster than proof can follow</strong></span>
          <span>Shipping safely matters more than publishing everything.</span>
        </div>
      </section>
    `,
  );
}

export function renderVerification() {
  const current = summary();

  return shell(
    "/verification",
    "See what the current governance posture proves about release safety, exclusions, and freshness.",
    "The verification view condenses the llms.txt estate into the questions that matter most before you publish or widen an answer surface.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>Release proof</h2>
          <div class="card-grid">
            <article class="subcard">
              <h3>Managed manifests</h3>
              <p>${current.manifestCount} manifests are tracked with owners, freshness windows, and release posture.</p>
            </article>
            <article class="subcard">
              <h3>Blocked surfaces</h3>
              <p>${current.blockedCount} lanes should stay behind review until the evidence catches up with the public claims.</p>
            </article>
            <article class="subcard">
              <h3>Freshness pressure</h3>
              <p>The average supporting age is ${current.averageFreshnessDays} days, which means some public surfaces are already leaning on older proof.</p>
            </article>
            <article class="subcard">
              <h3>Release-ready state</h3>
              <p>${current.releaseReadyCount} manifest is currently ready to widen without adding new governance risk.</p>
            </article>
          </div>
        </div>
        <div class="panel">
          <h2>What to inspect next</h2>
          <p>${current.leadRecommendation}</p>
          <div class="card-grid">
            <article class="subcard">
              <h3>Pricing and benchmark claims</h3>
              <p>Keep them out of the public surface until the supporting source pack is refreshed and approved.</p>
            </article>
            <article class="subcard">
              <h3>Campaign answer pack</h3>
              <p>Volatile inventory and promo language should not slip into public retrieval just because the page exists.</p>
            </article>
            <article class="subcard">
              <h3>Partner and ROI proof</h3>
              <p>These are the classic places where marketing language runs ahead of evidence. The manifest should make that visible.</p>
            </article>
            <article class="subcard">
              <h3>Support manifest</h3>
              <p>This is the model lane: fresh, factual, and stable enough to expose with minimal release friction.</p>
            </article>
          </div>
        </div>
      </section>
    `,
  );
}

export function renderDocs() {
  return shell(
    "/docs",
    "Understand the routes, payloads, and release posture exposed by the governance hub.",
    "The app ships both an operator-facing HTML surface and JSON payloads for summary, manifests, exclusions, and release lanes.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>HTML routes</h2>
          <div class="card-grid">
            <article class="subcard"><h3>/</h3><p>Overview of the llms.txt governance estate.</p></article>
            <article class="subcard"><h3>/manifest-board</h3><p>Manifest-by-manifest review lane and blocked sections.</p></article>
            <article class="subcard"><h3>/exclusions</h3><p>Route exclusions, review windows, and policy rationale.</p></article>
            <article class="subcard"><h3>/release-lane</h3><p>Evidence and approval posture by release lane.</p></article>
            <article class="subcard"><h3>/verification</h3><p>Current release safety snapshot.</p></article>
            <article class="subcard"><h3>/docs</h3><p>Route and payload reference.</p></article>
          </div>
        </div>
        <div class="panel">
          <h2>JSON routes</h2>
          <div class="card-grid">
            <article class="subcard"><h3>/api/dashboard/summary</h3><p>High-level governance posture and lead recommendation.</p></article>
            <article class="subcard"><h3>/api/manifests</h3><p>Manifest records sorted by policy pressure.</p></article>
            <article class="subcard"><h3>/api/exclusions</h3><p>Route-level crawl exclusions and review windows.</p></article>
            <article class="subcard"><h3>/api/releases</h3><p>Release-lane evidence and approval posture.</p></article>
            <article class="subcard"><h3>/api/sample</h3><p>All summary and governance surfaces in one payload.</p></article>
          </div>
        </div>
      </section>
    `,
  );
}
