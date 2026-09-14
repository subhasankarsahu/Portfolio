"use client";

import { useEffect, useRef } from "react";

interface SkillNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  radius: number;
}

const SKILL_LABELS = [
  "React.js", "Next.js", "JavaScript", "Framer Motion", "Node.js",
  "Express.js", "FastAPI", "Flask", "Python", "PostgreSQL", "MongoDB",
  "Supabase", "SQL", "C++", "C", "Java", "Git", "GitHub", "Docker",
  "Cloudinary", "GSAP", "DSA", "Computer Networks", "Theory of Computation",
  "Software Engineering"
];

const SKILL_CONNECTIONS: Array<[string, string]> = [
  ["React.js", "Next.js"],
  ["React.js", "Framer Motion"],
  ["Next.js", "JavaScript"],
  ["Node.js", "Express.js"],
  ["Node.js", "FastAPI"],
  ["Python", "FastAPI"],
  ["Python", "Flask"],
  ["PostgreSQL", "Supabase"],
  ["PostgreSQL", "SQL"],
  ["MongoDB", "Node.js"],
  ["Git", "GitHub"],
  ["GitHub", "Docker"],
  ["Cloudinary", "Node.js"],
  ["GSAP", "React.js"],
  ["C++", "DSA"],
  ["C", "Computer Networks"],
  ["Java", "Software Engineering"],
  ["Theory of Computation", "Software Engineering"]
];

export default function GsapNeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationId: number;
    let width = 0;
    let height = 0;
    let nodes: SkillNode[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize nodes when resized
      initNodes();
    };

    const initNodes = () => {
      ctx.font = "8px Courier New, Courier, monospace";
      const columns = 3;
      const rows = Math.ceil(SKILL_LABELS.length / columns);
      const horizontalStep = width / (columns + 1);
      const verticalStep = height / (rows + 1);

      nodes = SKILL_LABELS.map((label, index) => {
        const radius = ctx.measureText(label).width / 2 + 9;
        const column = index % columns;
        const row = Math.floor(index / columns);
        return {
          x: horizontalStep * (column + 1),
          y: verticalStep * (row + 1),
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          label,
          radius,
        };
      });

      for (let pass = 0; pass < 80; pass += 1) {
        for (let i = 0; i < nodes.length; i += 1) {
          for (let j = i + 1; j < nodes.length; j += 1) {
            const first = nodes[i];
            const second = nodes[j];
            const dx = second.x - first.x;
            const dy = second.y - first.y;
            const distance = Math.hypot(dx, dy) || 0.01;
            const minimumDistance = first.radius + second.radius + 8;
            if (distance < minimumDistance) {
              const adjustment = (minimumDistance - distance) / distance / 2;
              first.x -= dx * adjustment;
              first.y -= dy * adjustment;
              second.x += dx * adjustment;
              second.y += dy * adjustment;
            }
          }
        }
        nodes.forEach((node) => {
          node.x = Math.max(node.radius + 4, Math.min(width - node.radius - 4, node.x));
          node.y = Math.max(node.radius + 18, Math.min(height - 6, node.y));
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw intentional relationships between related skills.
      const nodeByLabel = new Map(nodes.map((node) => [node.label, node]));
      SKILL_CONNECTIONS.forEach(([firstLabel, secondLabel]) => {
        const first = nodeByLabel.get(firstLabel);
        const second = nodeByLabel.get(secondLabel);
        if (!first || !second) return;
        ctx.strokeStyle = "rgba(222, 219, 200, 0.18)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.stroke();
      });

      const maxDistance = 120;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Draw connections to mouse
        if (mouseRef.current.active) {
          const mDist = Math.hypot(n1.x - mouseRef.current.x, n1.y - mouseRef.current.y);
          if (mDist < maxDistance + 40) {
            const alpha = (1 - mDist / (maxDistance + 40)) * 0.35;
            ctx.strokeStyle = `rgba(222, 219, 200, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // Update positions
        if (!prefersReducedMotion) {
          n1.x += n1.vx;
          n1.y += n1.vy;

          // Mouse push/pull physics
          if (mouseRef.current.active) {
            const dx = n1.x - mouseRef.current.x;
            const dy = n1.y - mouseRef.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
              const force = (120 - dist) / 120 * 0.05;
              n1.vx += (dx / dist) * force;
              n1.vy += (dy / dist) * force;
            }
          }

          // Friction/dampening
          n1.vx *= 0.98;
          n1.vy *= 0.98;

          // Keep measured labels apart as nodes drift.
          for (const n2 of nodes) {
            if (n1 === n2) continue;
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const distance = Math.hypot(dx, dy) || 0.01;
            const minimumDistance = n1.radius + n2.radius + 8;
            if (distance < minimumDistance) {
              const force = (minimumDistance - distance) / distance * 0.01;
              n1.vx += dx * force;
              n1.vy += dy * force;
            }
          }

          // Boundary bounce with padding
          const pad = 10;
          if (n1.x < pad || n1.x > width - pad) n1.vx *= -1;
          if (n1.y < pad || n1.y > height - pad) n1.vy *= -1;

          // Clamp velocity
          const speedLimit = 1.2;
          const currentSpeed = Math.hypot(n1.vx, n1.vy);
          if (currentSpeed > speedLimit) {
            n1.vx = (n1.vx / currentSpeed) * speedLimit;
            n1.vy = (n1.vy / currentSpeed) * speedLimit;
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#DEDBC8";
        ctx.fill();

        // Draw node text label
        ctx.font = "8px Courier New, Courier, monospace";
        ctx.fillStyle = "rgba(225, 224, 204, 0.7)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const labelWidth = ctx.measureText(n1.label).width;
        const labelY = n1.y - n1.radius - 4;
        ctx.fillStyle = "rgba(7, 7, 7, 0.86)";
        ctx.fillRect(n1.x - labelWidth / 2 - 3, labelY - 6, labelWidth + 6, 12);
        ctx.fillStyle = "rgba(225, 224, 204, 0.82)";
        ctx.fillText(n1.label, n1.x, labelY);
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[430px] md:h-[500px] border border-white/5 rounded-2xl md:rounded-3xl bg-[#070707] overflow-hidden"
    >
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
          Interactive Neural Skills Map
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-crosshair"
      />
    </div>
  );
}
