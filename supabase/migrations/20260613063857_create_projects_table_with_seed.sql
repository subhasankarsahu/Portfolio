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
  (1, 'LearnVaultX', 'Full-stack platform for students to upload, organize, and access academic study materials.', 'Students need an organized way to discover and manage academic study materials.', 'Implemented JWT authentication, role-based access control, protected routes, RESTful CRUD APIs, and a responsive React.js interface.', 'Built collaboratively through GitHub with team-based feature development and code reviews.', 'https://www.learnvaultx.online', 'https://github.com/subhasankarsahu/Project_LearnVaultX', ARRAY['React.js','Node.js','Express.js','MongoDB','JWT'], '#212121', true, NULL, NULL, NULL),
  (2, 'JB Ride', 'Freelance cross-platform ride-booking application for iOS and Android.', 'TODO_REPLACE: YOUR_JB_RIDE_PROBLEM_HERE', 'Built a React Native frontend and integrated Node.js and Express.js REST APIs for ride requests and user data.', 'Delivered features based on client requirements within agreed timelines.', '', '', ARRAY['React Native','Node.js','Express.js','MongoDB'], '#252525', true, NULL, NULL, NULL),
  (3, 'StreamCore', 'Production-grade backend for a video streaming platform.', 'Video platforms need secure media management and efficient retrieval of user and interaction data.', 'Implemented authentication, authorization, video upload and management, Cloudinary integration, social features, MongoDB aggregation pipelines, MVC architecture, and REST APIs.', 'Provides a structured backend for videos, comments, likes/dislikes, subscriptions, and watch history.', '', '', ARRAY['Node.js','Express.js','MongoDB','JWT','Cloudinary'], '#1a1a1a', true, NULL, NULL, NULL),
  (4, 'Face Detection Project', 'Computer vision and AI project available on GitHub.', 'TODO_REPLACE: YOUR_FACE_DETECTION_PROBLEM_HERE', 'TODO_REPLACE: YOUR_FACE_DETECTION_SOLUTION_HERE', 'TODO_REPLACE: YOUR_FACE_DETECTION_IMPACT_HERE', '', '', ARRAY['Computer Vision','AI'], '#1e1e1e', true, NULL, NULL, NULL),
  (5, 'React Learning Projects', 'Multiple small React-based applications built for practice and skill development.', 'Built while learning component architecture, state management, hooks, and frontend development concepts.', 'Created multiple small projects to practice React development concepts.', 'Strengthened practical frontend development skills through hands-on work.', '', '', ARRAY['React.js'], '#1b1b2f', true, NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  title=EXCLUDED.title, description=EXCLUDED.description, problem=EXCLUDED.problem,
  solution=EXCLUDED.solution, impact=EXCLUDED.impact, live_url=EXCLUDED.live_url,
  source_code_url=EXCLUDED.source_code_url, tech_stack=EXCLUDED.tech_stack,
  theme_color=EXCLUDED.theme_color, is_active=EXCLUDED.is_active, stars=EXCLUDED.stars,
  forks=EXCLUDED.forks, issues=EXCLUDED.issues;

SELECT setval('projects_id_seq', (SELECT MAX(id) FROM public.projects));
