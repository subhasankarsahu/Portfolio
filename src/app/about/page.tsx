import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Link from "next/link";
import { ArrowLeft, Award, Code2, GraduationCap, Sparkles, Terminal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Subha Sankar Sahu | Full-Stack Developer",
  description: "Learn about Subha Sankar Sahu, a full-stack developer focused on the PERN stack, C++, DSA, and AI-powered web products.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col justify-between selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="w-full max-w-5xl mx-auto px-6 pt-32 pb-20 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70 hover:text-primary mb-8 font-mono transition-colors">
          <ArrowLeft size={14} /> Back to Overview
        </Link>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E1E0CC] mb-6">
          About <span className="font-serif italic font-normal text-white">Subha Sankar Sahu</span>
        </h1>

        <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-light mb-12 max-w-3xl">
          Full-stack developer based in Rourkela, India, focused on the PERN stack, C++, DSA fundamentals, and AI-powered web products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 border-t border-b border-white/10 py-12">
          {/* Background & Education */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-primary">
              <GraduationCap size={20} />
              <h2 className="text-xl font-semibold uppercase tracking-wider text-white">Education & Background</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Currently pursuing a <strong>B.Tech, 3rd Year</strong> at <strong>Biju Patnaik University of Technology, Rourkela</strong>. Combining rigorous computer science theory with hands-on software engineering projects and open-source contribution.
            </p>
          </div>

          {/* Technical Specializations */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-primary">
              <Code2 size={20} />
              <h2 className="text-xl font-semibold uppercase tracking-wider text-white">Technical Specializations</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Deep interest in autonomous agent architectures, local-first LLM inference, vector retrieval databases, speech transcription algorithms (VAD), and modern full-stack web applications built with TypeScript, Next.js, React 19, and Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Terminal size={22} className="text-primary" /> Core Principles & Engineering Philosophy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-primary">User-Centric AI</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Building AI tools that empower users with zero server latency, local-first privacy, and intuitive multi-window interfaces.
              </p>
            </div>
            <div className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-primary">Cinematic Aesthetics</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Combining high-level engineering logic with sleek dark design, GSAP animations, and micro-interactions.
              </p>
            </div>
            <div className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-primary">Open Source First</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Building practical projects, learning in public, and contributing to open-source communities.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership & Credentials */}
        <section className="my-12 bg-white/2 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Award size={22} className="text-primary" /> Open Source & Achievements
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Building LearnVaultX, JB Ride, StreamCore, and React learning projects while developing practical full-stack and AI-integrated web engineering skills.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a href="https://github.com/subhasankarsahu" target="_blank" rel="noopener noreferrer" className="bg-primary text-black font-semibold text-xs rounded-full px-5 py-2.5 hover:bg-white transition-colors">
              Explore GitHub Profile
            </a>
            <a href="/contact" className="border border-white/20 text-white font-semibold text-xs rounded-full px-5 py-2.5 hover:border-primary transition-colors">
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
