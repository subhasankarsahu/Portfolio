// SSS // COMMAND CENTER — Data Store

export interface CareerProfile {
  headline: string;
  subheadline: string;
  availability: string;
  isAvailable: boolean;
  preferredRoles: string[];
  location: string;
  bio: string;
  resumeUrl: string;
  portraitUrl: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  timeLabel: string;
  title: string;
  description: string;
  type: "github" | "project" | "message" | "resume" | "system";
}

export interface AIServiceStatus {
  id: string;
  name: string;
  status: "Connected" | "Configured" | "Standby" | "Offline";
  model: string;
  lastRequest: string;
  latency?: string;
  promptsServed?: number;
}

export interface ContentArticle {
  id: string;
  title: string;
  slug: string;
  category: "Article" | "Case Study" | "Note" | "Announcement";
  status: "Published" | "Draft" | "Archived";
  publishedAt: string;
  readTime: string;
  summary: string;
  content: string;
}

export interface CRMMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  category: "Internship" | "Freelance" | "Collaboration" | "General";
  status: "unread" | "read" | "replied" | "archived";
  admin_notes?: string;
}

export interface GitHubActivityEvent {
  id: string;
  action: string;
  repo: string;
  timeLabel: string;
  type: "pr_merged" | "issue_opened" | "contributor_joined" | "star_received" | "commit_pushed";
}

export interface ActivityDistribution {
  commits: number;
  codeReview: number;
  issues: number;
  pullRequests: number;
}

export interface RepoHealthItem {
  name: string;
  stars: number;
  forks: number;
  openIssues: number;
  openPRs?: number;
  contributors?: number;
  totalCommits?: number;
  status: "Active" | "Healthy" | "Maintenance";
  lastCommit: string;
}

export interface MaintainerMetrics {
  totalProjects: number;
  activeProjects: number;
  totalContributors: number;
  mergedPRs: number;
  openIssues: number;
  openPRs?: number;
  totalCommits?: number;
  totalRepositoriesContributed?: number;
  lastActivity: string;
  prResponseQuality: string;
  issueActivity: string;
  contributorGrowthTrend: string;
  communityScore: string;
  distribution?: ActivityDistribution;
}

let careerData: CareerProfile = {
  headline: "Full-Stack Developer × DSA Enthusiast × AI Product Builder",
  subheadline: "Building AI-driven products, agentic tools, and cinematic web experiences.",
  availability: "Available for Internships & OSS",
  isAvailable: true,
  preferredRoles: ["AI Engineer", "Full Stack Developer", "Frontend Engineer"],
  location: "Rourkela, India",
  bio: "Focused on PERN stack full-stack development, strong DSA and C++ fundamentals, and building AI-integrated web products.",
  resumeUrl: "/Subha_Sankar_Sahu_Resume_Improved.docx",
  portraitUrl: "/developer_portrait.jpg"
};

let activityLogs: ActivityItem[] = [
  {
    id: "act-1",
    timestamp: new Date().toISOString(),
    timeLabel: "Just now",
    title: "GitHub Synchronized",
    description: "Successfully fetched latest contributions & repo stars.",
    type: "github"
  },
  {
    id: "act-2",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    timeLabel: "15m ago",
    title: "Project showcase viewed",
    description: "Agent crawler inspected the project details.",
    type: "project"
  },
  {
    id: "act-3",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    timeLabel: "45m ago",
    title: "New opportunity received",
    description: "Contact submission from GSSoC Organizers.",
    type: "message"
  },
  {
    id: "act-4",
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    timeLabel: "2h ago",
    title: "Resume downloaded",
    description: "Official resume PDF fetched by recruiter agent.",
    type: "resume"
  }
];

let aiServices: AIServiceStatus[] = [
  { id: "ai-1", name: "OpenAI API", status: "Connected", model: "gpt-4o / Realtime SDK", lastRequest: "3m ago", latency: "142ms", promptsServed: 840 },
  { id: "ai-2", name: "GitHub GraphQL", status: "Connected", model: "GraphQL v4 / REST v3", lastRequest: "1m ago", latency: "64ms", promptsServed: 1250 },
  { id: "ai-3", name: "Supabase DB", status: "Connected", model: "PostgreSQL v17", lastRequest: "Just now", latency: "23ms", promptsServed: 3100 },
  { id: "ai-4", name: "Gemini 1.5", status: "Connected", model: "Gemini Pro / Flash", lastRequest: "12m ago", latency: "189ms", promptsServed: 420 },
  { id: "ai-5", name: "ElevenLabs", status: "Configured", model: "v2 Voice Synthesis", lastRequest: "1h ago", latency: "210ms", promptsServed: 190 }
];

let articlesList: ContentArticle[] = [
  {
    id: "art-1",
    title: "Building Practical Full-Stack Projects",
    slug: "building-practical-full-stack-projects",
    category: "Case Study",
    status: "Published",
    publishedAt: "2026-04-10",
    readTime: "6 min read",
    summary: "Notes on learning backend development, adaptive learning systems, and React through hands-on projects.",
    content: "Building practical projects creates a feedback loop between learning concepts and applying them..."
  },
];

let crmMessages: CRMMessage[] = [
  {
    id: "msg-1",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    name: "Asad Hussain",
    email: "asad@asadhussain.in",
    message: "Your portfolio projects and full-stack work look interesting. Keep up the good work!",
    category: "Collaboration",
    status: "unread",
    admin_notes: "Follow up about portfolio opportunities next week."
  },
  {
    id: "msg-2",
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    name: "GirlScript Organizers",
    email: "info@gssoc.org",
    message: "Thank you for administering the repositories for GSSoC 2026. Excellent PR review response times and coordination with contributors.",
    category: "General",
    status: "unread"
  },
  {
    id: "msg-3",
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    name: "TechCorp Recruiter",
    email: "careers@techcorp.com",
    message: "We're looking for a Frontend & AI Intern with strong Next.js, Tailwind, and Agentic systems skills. Let us know if you'd be interested.",
    category: "Internship",
    status: "read",
    admin_notes: "Scheduled phone screen for Friday."
  }
];

let githubEvents: GitHubActivityEvent[] = [
  { id: "gh-1", action: "Pushed commits to main branch", repo: "Portfolio", timeLabel: "Just now", type: "commit_pushed" },
  { id: "gh-2", action: "Project showcase synchronized", repo: "LearnVaultX", timeLabel: "1 hr ago", type: "commit_pushed" },
  { id: "gh-3", action: "Project repository reviewed", repo: "StreamCore", timeLabel: "3 hr ago", type: "issue_opened" },
  { id: "gh-4", action: "Learning project updated", repo: "React Learning Projects", timeLabel: "5 hr ago", type: "commit_pushed" }
];

let repoHealthList: RepoHealthItem[] = [
  { name: "LearnVaultX", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 0, status: "Active", lastCommit: "Not synchronized" },
  { name: "JB Ride", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 0, status: "Active", lastCommit: "Not synchronized" },
  { name: "StreamCore", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 0, status: "Active", lastCommit: "Not synchronized" },
  { name: "React Learning Projects", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 0, status: "Active", lastCommit: "Not synchronized" }
];

let maintainerMetrics: MaintainerMetrics = {
  totalProjects: 4,
  activeProjects: 4,
  totalContributors: 0,
  mergedPRs: 0,
  openIssues: 0,
  openPRs: 0,
  totalCommits: 0,
  totalRepositoriesContributed: 4,
  lastActivity: "Just now",
  prResponseQuality: "No synchronized data",
  issueActivity: "No synchronized data",
  contributorGrowthTrend: "No synchronized data",
  communityScore: "N/A",
  distribution: {
    commits: 0,
    codeReview: 0,
    issues: 0,
    pullRequests: 0
  }
};

export function getCareerProfile(): CareerProfile {
  return { ...careerData };
}

export function updateCareerProfile(data: Partial<CareerProfile>): CareerProfile {
  careerData = { ...careerData, ...data };
  return { ...careerData };
}

export function getActivityLogs(): ActivityItem[] {
  return [...activityLogs];
}

export function addActivityLog(log: Omit<ActivityItem, "id" | "timestamp" | "timeLabel">) {
  const newLog: ActivityItem = {
    ...log,
    id: `act-${Date.now()}`,
    timestamp: new Date().toISOString(),
    timeLabel: "Just now"
  };
  activityLogs = [newLog, ...activityLogs].slice(0, 20);
}

export function getAIServices(): AIServiceStatus[] {
  return [...aiServices];
}

export function getArticles(): ContentArticle[] {
  return [...articlesList];
}

export function saveArticle(article: Partial<ContentArticle> & { title: string }): ContentArticle {
  if (article.id) {
    articlesList = articlesList.map(a => a.id === article.id ? { ...a, ...article } as ContentArticle : a);
    return articlesList.find(a => a.id === article.id)!;
  } else {
    const newArt: ContentArticle = {
      id: `art-${Date.now()}`,
      title: article.title,
      slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: article.category || "Article",
      status: article.status || "Published",
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: article.readTime || "5 min read",
      summary: article.summary || "",
      content: article.content || ""
    };
    articlesList = [newArt, ...articlesList];
    return newArt;
  }
}

export function getCRMMessages(): CRMMessage[] {
  return [...crmMessages];
}

export function updateCRMMessage(id: string, updates: Partial<CRMMessage>): CRMMessage | null {
  const index = crmMessages.findIndex(m => String(m.id) === String(id));
  if (index !== -1) {
    crmMessages[index] = { ...crmMessages[index], ...updates };
    return crmMessages[index];
  }
  return null;
}

export function deleteCRMMessage(id: string): boolean {
  const initialLength = crmMessages.length;
  crmMessages = crmMessages.filter(m => String(m.id) !== String(id));
  return crmMessages.length < initialLength;
}

export function setGitHubActivityEvents(events: GitHubActivityEvent[]) {
  if (events && events.length > 0) {
    githubEvents = [...events];
  }
}

export function setRepoHealthItems(items: RepoHealthItem[]) {
  if (items && items.length > 0) {
    repoHealthList = [...items];
  }
}

export function setMaintainerMetrics(metrics: Partial<MaintainerMetrics>) {
  maintainerMetrics = { ...maintainerMetrics, ...metrics };
}

export function getGitHubActivityEvents(): GitHubActivityEvent[] {
  return [...githubEvents];
}

export function getRepoHealthItems(): RepoHealthItem[] {
  return [...repoHealthList];
}

export function getMaintainerMetrics(): MaintainerMetrics {
  return { ...maintainerMetrics };
}
