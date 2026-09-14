'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Globe, Award, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Full Stack Web Development",
    subtitle: "Coursera Certification",
    description: "Completed Coursera certification in Full Stack Web Development.",
    date: "TODO_REPLACE: CERTIFICATION_DATE_HERE",
    icon: Trophy,
    category: "Competition"
  },
  {
    id: 2,
    title: "Python Programming",
    subtitle: "Coursera Certification",
    description: "Completed Coursera certification in Python Programming.",
    date: "TODO_REPLACE: CERTIFICATION_DATE_HERE",
    icon: Award,
    category: "Open Source"
  },
  {
    id: 3,
    title: "AI & Machine Learning Fundamentals",
    subtitle: "Coursera Certification",
    description: "Completed Coursera certification in AI & Machine Learning Fundamentals.",
    date: "TODO_REPLACE: CERTIFICATION_DATE_HERE",
    icon: Globe,
    category: "Academic"
  },
  {
    id: 4,
    title: "Collegiate Hackathons",
    subtitle: "Participant",
    description: "Collaborated with peers to design and build software solutions under time constraints.",
    date: "TODO_REPLACE: ACHIEVEMENT_DATE_HERE",
    icon: Sparkles,
    category: "Innovation"
  }
];

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.achievement-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden py-20 md:py-32 px-4 md:px-8 border-t border-white/5"
    >
      <div className="relative z-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-[#E1E0CC] text-4xl md:text-6xl font-bold tracking-tight">
            Key{' '}
            <span className="font-serif italic font-normal text-primary">Milestones</span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm md:text-base max-w-lg">
            Achievements, open-source roles, and certifications earned along my engineering and developer journey.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ACHIEVEMENTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="achievement-card group"
              >
                <div className="h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-bg-card hover:bg-[#151515] transition-all duration-500 p-6 md:p-8 flex gap-5 md:gap-6 relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  {/* Icon Block */}
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content Block */}
                  <div className="grow flex flex-col justify-between">
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[9px] tracking-widest uppercase font-mono text-primary font-semibold">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono text-white/30">
                          {item.date}
                        </span>
                      </div>

                      {/* Heading */}
                      <h3 className="text-white text-lg md:text-xl font-semibold tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-[#E1E0CC]/70 text-xs font-mono font-medium mb-3 italic">
                        {item.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
