import HomeClient from "@/components/HomeClient";
import { fetchProjects } from "@/lib/supabase";

export const revalidate = 900; // 15-minute Incremental Static Regeneration (ISR)

export default async function Home() {
  let projects: Awaited<ReturnType<typeof fetchProjects>> = [];
  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error("Failed to fetch projects in SSR page:", error);
  }

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Projects by Subha Sankar Sahu",
    "description": "A curated collection of full-stack, backend, React, and AI-driven projects built by Subha Sankar Sahu.",
    "itemListElement": projects.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": p.title,
        "description": p.description,
        "url": p.live_url || p.source_code_url,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Cross-platform, Web",
        "author": {
          "@type": "Person",
          "name": "Subha Sankar Sahu"
        }
      }
    }))
  };

  return (
    <>
      {/* Structured JSON-LD Data for AI Search Engines & Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />

      {/* 
        Semantic Server-Rendered HTML for AI Crawlers, LLM Indexers & Non-JS Clients
        Provides a pristine H1, full biographical profile, complete project breakdown, 
        technology stack, and contact links in pure raw HTML (> 1,500+ characters).
      */}
      <noscript>
        <div style={{ backgroundColor: "#070707", color: "#e0dfd5", padding: "2.5rem 1.5rem", fontFamily: "system-ui, -apple-system, sans-serif", lineHeight: "1.7", maxWidth: "900px", margin: "0 auto" }}>
          <header style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2.2rem", color: "#ffffff", fontWeight: "800", letterSpacing: "-0.03em", margin: "0 0 0.5rem 0" }}>
              Subha Sankar Sahu — Full-Stack Developer
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#a1a1aa", margin: 0 }}>
              Building AI-integrated web products with PERN stack full-stack development, strong DSA and C++ fundamentals, and a focus on software engineering internships. Based in Rourkela, India.
            </p>
          </header>

          <main>
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", color: "#DEDBC8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                About & Engineering Background
              </h2>
              <p style={{ color: "#d4d4d8", marginBottom: "1rem" }}>
                I focus on PERN stack full-stack development, strong DSA and C++ fundamentals, and building AI-integrated web products while working toward software engineering internships.
              </p>
              <p style={{ color: "#d4d4d8" }}>
                I am building practical full-stack projects while strengthening my software engineering fundamentals and preparing for software engineering internships.
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", color: "#DEDBC8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                Featured Projects & Systems Architecture
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {projects.map((project) => (
                  <article key={project.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "1.25rem", color: "#ffffff", fontWeight: "700", margin: "0 0 0.5rem 0" }}>
                      {project.title}
                    </h3>
                    <p style={{ color: "#e4e4e7", margin: "0 0 0.75rem 0", fontSize: "0.95rem" }}>
                      {project.description}
                    </p>
                    {project.problem && (
                      <p style={{ margin: "0 0 0.4rem 0", fontSize: "0.9rem", color: "#a1a1aa" }}>
                        <strong style={{ color: "#ffffff" }}>Problem:</strong> {project.problem}
                      </p>
                    )}
                    {project.solution && (
                      <p style={{ margin: "0 0 0.4rem 0", fontSize: "0.9rem", color: "#a1a1aa" }}>
                        <strong style={{ color: "#ffffff" }}>Solution:</strong> {project.solution}
                      </p>
                    )}
                    {project.impact && (
                      <p style={{ margin: "0 0 0.6rem 0", fontSize: "0.9rem", color: "#a1a1aa" }}>
                        <strong style={{ color: "#ffffff" }}>Impact:</strong> {project.impact}
                      </p>
                    )}
                    <p style={{ fontSize: "0.85rem", color: "#71717a", margin: "0 0 0.75rem 0" }}>
                      <strong style={{ color: "#a1a1aa" }}>Tech Stack:</strong> {project.tech_stack.join(", ")}
                    </p>
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.9rem" }}>
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                          Live Application ↗
                        </a>
                      )}
                      {project.source_code_url && (
                        <a href={project.source_code_url} target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa", textDecoration: "underline" }}>
                          GitHub Repository ↗
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", color: "#DEDBC8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                Core Technical Skills
              </h2>
              <ul style={{ paddingLeft: "1.25rem", color: "#d4d4d8" }}>
                <li style={{ marginBottom: "0.5rem" }}><strong>Frontend Engineering:</strong> Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP Animations, Web Performance Optimization.</li>
                <li style={{ marginBottom: "0.5rem" }}><strong>AI-Integrated Products:</strong> Building web products that incorporate AI capabilities into practical user workflows.</li>
                <li style={{ marginBottom: "0.5rem" }}><strong>Backend & Databases:</strong> Node.js, Python 3, Supabase, PostgreSQL, REST APIs, GraphQL, SQLite, Session Security.</li>
                <li style={{ marginBottom: "0.5rem" }}><strong>DevOps & Automation:</strong> Git, GitHub Actions, Vercel Cron, Linux CLI, Docker, Cloudflare.</li>
              </ul>
            </section>

            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", color: "#DEDBC8", marginBottom: "0.75rem" }}>
                Contact & Communication
              </h2>
              <p style={{ color: "#d4d4d8", marginBottom: "0.5rem" }}>
                Direct Email: <a href="mailto:subhasankarsahu5@gmail.com" style={{ color: "#38bdf8" }}>subhasankarsahu5@gmail.com</a>
              </p>
              <p style={{ color: "#d4d4d8", marginBottom: "0.5rem" }}>
                GitHub Profile: <a href="https://github.com/subhasankarsahu" style={{ color: "#38bdf8" }}>https://github.com/subhasankarsahu</a>
              </p>
              <p style={{ color: "#d4d4d8", marginBottom: "0.5rem" }}>
                Resume: <a href="/Subha_Sankar_Sahu_Resume_Improved.docx" style={{ color: "#38bdf8" }}>Download Subha Sankar Sahu Resume (DOCX)</a>
              </p>
            </footer>
          </main>
        </div>
      </noscript>

      {/* Interactive Cinematic Client Experience */}
      <HomeClient initialProjects={projects} />
    </>
  );
}
