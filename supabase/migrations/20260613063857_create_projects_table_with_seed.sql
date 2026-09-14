-- Projects table for the portfolio showcase.
CREATE TABLE IF NOT EXISTS public.projects (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    title TEXT NOT NULL, description TEXT NOT NULL, problem TEXT, solution TEXT,
    impact TEXT, live_url TEXT NOT NULL, source_code_url TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}', theme_color TEXT NOT NULL DEFAULT '#1a1a1a',
    is_active BOOLEAN NOT NULL DEFAULT TRUE, stars INTEGER, forks INTEGER, issues INTEGER
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin full access" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed: Subha Sankar Sahu portfolio projects. Empty URL fields are intentional.
INSERT INTO public.projects
  (id, title, description, problem, solution, impact, live_url, source_code_url, tech_stack, theme_color, is_active, stars, forks, issues)
VALUES
  (1, 'LearnVaultX', 'AI-driven adaptive learning platform. Features: adaptive learning engine, learning analytics, AI-powered question generation, built collaboratively via GitHub.', NULL, NULL, NULL, '', '', ARRAY['AI','GitHub'], '#212121', true, NULL, NULL, NULL),
  (2, 'JB Ride', 'Full-stack ride-sharing application', NULL, NULL, NULL, '', '', ARRAY['Full-stack Development'], '#252525', true, NULL, NULL, NULL),
  (3, 'StreamCore', 'Backend-focused project built while learning backend development.', NULL, NULL, NULL, '', '', ARRAY['Backend Development'], '#1a1a1a', true, NULL, NULL, NULL),
  (4, 'React Learning Projects', 'A set of small React projects built for practice and skill development.', NULL, NULL, NULL, '', '', ARRAY['React.js'], '#1b1b2f', true, NULL, NULL, NULL),
  (5, 'CyberGuard', 'AI-Powered Cyber Threat, Phishing & Digital Impersonation Detection and Response System.', 'Traditional rule-based security tools struggle against AI-generated phishing, deepfakes, and social engineering attacks. CyberGuard combines AI/ML detection engines with explainable, human-readable threat analysis and response recommendations.', 'AI-powered phishing and scam message detection; deepfake and digital impersonation detection for image and audio; login and account-takeover anomaly detection; unified risk scoring; explainable alerts; recommended response actions; real-time dashboard; mobile notifications and guardian mode; and a lightweight monitoring agent for login and system telemetry.', NULL, '', 'https://github.com/teamvisioncraft875-netizen/CyberGuard/', ARRAY['Cybersecurity','Artificial Intelligence','Machine Learning'], '#1c2e3f', true, NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, problem=EXCLUDED.problem,
  solution=EXCLUDED.solution, impact=EXCLUDED.impact, live_url=EXCLUDED.live_url,
  source_code_url=EXCLUDED.source_code_url, tech_stack=EXCLUDED.tech_stack,
  theme_color=EXCLUDED.theme_color, is_active=EXCLUDED.is_active, stars=EXCLUDED.stars,
  forks=EXCLUDED.forks, issues=EXCLUDED.issues;

SELECT setval('projects_id_seq', (SELECT MAX(id) FROM public.projects));
