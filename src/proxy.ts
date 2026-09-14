import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept") || "";
  const requestsMarkdown = acceptHeader.includes("text/markdown") || acceptHeader.includes("application/x-markdown");

  // 1. Protect /admin routes (except login pages/apis)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout");

  if (isAdminRoute && !isLoginPage) {
    const session = request.cookies.get("admin_session");
    const isAuthenticated = verifySession(session?.value);

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Handle Accept: text/markdown content negotiation
  if (requestsMarkdown) {
    let markdownContent = "";
    let statusCode = 200;

    if (pathname === "/" || pathname === "/index") {
      markdownContent = `# Subha Sankar Sahu — Full-Stack Developer

> Exploring Generative AI, Coding Agents, Machine Learning, and System Architecture.

## About
Full-stack developer focused on the PERN stack, strong C++ and DSA fundamentals, and AI-powered web products. Student at Biju Patnaik University of Technology, Rourkela.

## Key Projects
- **LearnVaultX**: AI-driven adaptive learning platform with learning analytics and question generation.
- **JB Ride**: Full-stack ride-sharing application.
- **StreamCore**: Backend-focused project built while learning backend development.
- **React Learning Projects**: Small React projects built for practice and skill development.

## Contact & Profile Links
- Email: subhasankarsahu5@gmail.com
- GitHub: https://github.com/subhasankarsahu

## Site Index
- [About](https://subha-sankar-sahu.vercel.app/about)
- [Contact](https://subha-sankar-sahu.vercel.app/contact)
- [Privacy Policy](https://subha-sankar-sahu.vercel.app/privacy)
- [LLMs.txt](https://subha-sankar-sahu.vercel.app/llms.txt)
- [Sitemap](https://subha-sankar-sahu.vercel.app/sitemap.xml)
`;
    } else if (pathname === "/about") {
      markdownContent = `# About Subha Sankar Sahu

## Profile
Subha Sankar Sahu is a full-stack developer based in Rourkela, India. He is currently pursuing a B.Tech in his third year at Biju Patnaik University of Technology, Rourkela.

## Specializations
- **Generative AI & Agents**: Building local-first AI tools, vector retrieval systems, and multi-agent coordination frameworks.
- **Full-Stack Engineering**: Next.js 16, TypeScript, React 19, Tailwind CSS, Supabase, Node.js.
- **Machine Learning & NLP**: Python, PyTorch, LangChain, OpenAI SDK, Speech Transcription algorithms.
- **Open Source Maintenance**: Active maintainer for student projects and repository administrator for GSSoC 2026.

## Contact
- Email: subhasankarsahu5@gmail.com
- Location: Rourkela, India
- Website: https://subha-sankar-sahu.vercel.app
`;
    } else if (pathname === "/contact") {
  markdownContent = `# Contact Subha Sankar Sahu

Always open to discussing new projects, creative ideas, internship roles, open source collaboration, or freelance opportunities.

## Direct Communication Channels
- **Email**: [subhasankarsahu5@gmail.com](mailto:subhasankarsahu5@gmail.com)
- **GitHub**: [github.com/subhasankarsahu](https://github.com/subhasankarsahu)

## Location
Rourkela, Odisha, India (IST / UTC+5:30)
`;
    } else if (pathname === "/privacy") {
  markdownContent = `# Privacy Policy — Subha Sankar Sahu Portfolio

**Effective Date**: January 1, 2026

This site respects user privacy and data ownership.

## Information Collection
1. **Contact Form Submissions**: Messages submitted through the contact form (Name, Email, Message) are securely processed for direct email communication.
2. **Analytics**: Standard, aggregated visitor analytics (Vercel Analytics & Google Tag Manager) are used strictly to monitor site performance.

## Data Retention & Sharing
Personal data is never sold, shared, or distributed to third parties.

## Contact
For privacy queries, email subhasankarsahu5@gmail.com.
`;
    } else if (pathname === "/llms.txt" || pathname === "/llms-full.txt") {
  markdownContent = `# Subha Sankar Sahu Portfolio — AI Agent Index & Guidance

## When to Use This Site
Use this site when:
1. Evaluating Subha Sankar Sahu for software development internships or full-stack roles.
2. Indexing project descriptions, tech stacks, and open-source contributions.
3. Fetching contact details or resume information.

## Primary Endpoints
- [Home](https://subha-sankar-sahu.vercel.app/)
- [About](https://subha-sankar-sahu.vercel.app/about)
- [Contact](https://subha-sankar-sahu.vercel.app/contact)
- [Privacy Policy](https://subha-sankar-sahu.vercel.app/privacy)
- [Sitemap](https://subha-sankar-sahu.vercel.app/sitemap.xml)
`;
    } else {
      statusCode = 404;
      markdownContent = `# 404 - Page Not Found

The path \`${pathname}\` does not exist on subha-sankar-sahu.vercel.app.

## Available Index Pages:
- [Home](https://subha-sankar-sahu.vercel.app/)
- [Sitemap](https://subha-sankar-sahu.vercel.app/sitemap.xml)
- [LLMs.txt](https://subha-sankar-sahu.vercel.app/llms.txt)
- [About](https://subha-sankar-sahu.vercel.app/about)
- [Contact](https://subha-sankar-sahu.vercel.app/contact)
- [Privacy Policy](https://subha-sankar-sahu.vercel.app/privacy)
`;
    }

    return new NextResponse(markdownContent, {
      status: statusCode,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400"
      }
    });
  }

  // 3. For normal requests, pass through and set Vary header
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|mp3)$).*)",
  ],
};
