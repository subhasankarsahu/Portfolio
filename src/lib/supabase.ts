import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Instantiate only if credentials exist, otherwise return null representing mock state
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// The Database Schema mapped for the 'projects' table:
// id (uuid)
// title (text)
// description (text)
// live_url (text)
// source_code_url (text)
// tech_stack (text array)
// theme_color (text)

export interface Project {
  id: number;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  live_url: string;
  source_code_url?: string;
  tech_stack: string[];
  theme_color: string;
  is_active?: boolean;
  stars?: number;
  forks?: number;
  issues?: number;
}

let projectsCache: { data: Project[]; timestamp: number } | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "LearnVaultX",
    description: "AI-driven adaptive learning platform with adaptive learning, analytics, AI-powered question generation, and collaborative GitHub development.",
    live_url: "",
    source_code_url: "",
    tech_stack: ["AI", "GitHub"],
    theme_color: "#212121",
    is_active: true
  },
  {
    id: 2,
    title: "JB Ride",
    description: "Full-stack ride-sharing application",
    live_url: "",
    source_code_url: "",
    tech_stack: ["Full-stack Development"],
    theme_color: "#252525",
    is_active: true
  },
  {
    id: 3,
    title: "StreamCore",
    description: "Backend-focused project built while learning backend development.",
    live_url: "",
    source_code_url: "",
    tech_stack: ["Backend Development"],
    theme_color: "#1a1a1a",
    is_active: true
  },
  {
    id: 4,
    title: "React Learning Projects",
    description: "A set of small React projects built for practice and skill development.",
    live_url: "",
    source_code_url: "",
    tech_stack: ["React"],
    theme_color: "#1e1e1e",
    is_active: true
  },
  {
    id: 5,
    title: "CyberGuard",
    description: "AI-Powered Cyber Threat, Phishing & Digital Impersonation Detection and Response System.",
    problem: "Traditional rule-based security tools struggle against AI-generated phishing, deepfakes, and social engineering attacks. CyberGuard combines AI/ML detection engines with explainable, human-readable threat analysis and response recommendations.",
    solution: "AI-powered phishing and scam message detection; deepfake and digital impersonation detection for image and audio; login and account-takeover anomaly detection; unified risk scoring; explainable alerts; recommended response actions; real-time dashboard; mobile notifications and guardian mode; and a lightweight monitoring agent for login and system telemetry.",
    live_url: "",
    source_code_url: "https://github.com/teamvisioncraft875-netizen/CyberGuard/",
    tech_stack: ["Cybersecurity", "Artificial Intelligence", "Machine Learning"],
    theme_color: "#1c2e3f",
    is_active: true
  }
];

export function invalidateProjectsCache() {
  projectsCache = null;
}

export async function fetchProjects() {
  const now = Date.now();
  if (projectsCache && now - projectsCache.timestamp < CACHE_DURATION) {
    return projectsCache.data;
  }

  let rawProjects: Project[] = [];
  if (!supabase) {
    rawProjects = [...DEFAULT_PROJECTS];
  } else {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (error) console.warn("Supabase Fetch Warning, using default projects:", error.message);
        rawProjects = [...DEFAULT_PROJECTS];
      } else {
        rawProjects = data;
      }
    } catch (err) {
      console.warn("Supabase Fetch Exception, using default projects:", err);
      rawProjects = [...DEFAULT_PROJECTS];
    }
  }

  if (rawProjects.length === 0) {
    rawProjects = [...DEFAULT_PROJECTS];
  }

  // Fetch GitHub stats for each project with a source_code_url
  const enrichedProjects = await Promise.all(
    rawProjects.map(async (project) => {
      if (!project.source_code_url) return project;
      
      const githubMatch = project.source_code_url.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!githubMatch) return project;
      
      const owner = githubMatch[1];
      const repo = githubMatch[2].replace(/\.git$/, '').trim();
      
      try {
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        };
        
        if (process.env.GITHUB_TOKEN) {
          headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }
        
        // Fetch repo info with a 3 second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers,
          signal: controller.signal,
          next: { revalidate: 900 } // Next.js level fetch caching
        });
        
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const stats = await res.json();
          return {
            ...project,
            stars: stats.stargazers_count,
            forks: stats.forks_count,
            issues: stats.open_issues_count
          };
        }
      } catch (err) {
        console.warn(`Failed to fetch GitHub stats for ${owner}/${repo}:`, err);
      }
      
      return project;
    })
  );

  projectsCache = {
    data: enrichedProjects,
    timestamp: now
  };

  return enrichedProjects;
}
