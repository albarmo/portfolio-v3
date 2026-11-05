import type { FC } from "react";
import { PageLayout } from "~/components/layout/PageLayout";
import AreaOfExpertise from "~/components/section/AreaOfExpertise";
import { pageMeta } from "~/utils/meta";

export const meta = () => pageMeta({ title: "About" });

interface SkillCardProps {
  title: string;
  skills: string[];
}

const SkillCard: FC<SkillCardProps> = ({ title, skills }) => (
  <div className="soft-panel p-6">
    <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
      {title}
    </samp>
    <div className="mt-4 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="border border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)]"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default function AboutMePage() {
  const skills = {
    languages: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Dart"],
    frameworks: [
      "React",
      "Next.js",
      "Remix",
      "Vue.js",
      "Node.js",
      "Flutter",
      "Go",
    ],
    styling: [
      "Tailwind CSS",
      "SASS/SCSS",
      "Styled Components",
      "Framer Motion",
    ],
    tools: ["Git", "Figma", "Vite", "Webpack", "Jest", "Vercel"],
  };

  return (
    <PageLayout>
      <div className="pt-20">
        <AreaOfExpertise />

        <section className="section-shell">
          <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
            A FRONTEND ENGINEER WHO CARES ABOUT THE PRODUCT BEHIND THE PIXELS.
          </h1>
        </section>

        <div className="section-shell mt-10 space-y-6 font-mono text-sm leading-7 text-[var(--muted)]">
          <p>
            My journey into web development began with a simple curiosity about
            how an idea could be transformed into something interactive on a
            screen. For me, frontend development is the perfect blend of
            problem-solving logic and design creativity. I find immense
            satisfaction in building products that are not only technically
            solid but also easy and enjoyable for many people to use.
          </p>
          <p>
            With over {new Date().getFullYear() - 2021} years of experience, I
            focus on writing clean, maintainable, and scalable code. I believe
            that web performance and accessibility are not afterthoughts but are
            core to a great user experience. I am always enthusiastic about
            learning new technologies and collaborating within a team to turn a
            shared vision into reality.
          </p>
        </div>

        <section className="section-shell section-pad">
          <h2 className="font-display text-4xl font-black uppercase text-[var(--text)]">
            TECHNOLOGY STACK
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <SkillCard
              title="Language & Framework"
              skills={[...skills.languages, ...skills.frameworks]}
            />
            <SkillCard
              title="Styling & Tools"
              skills={[...skills.styling, ...skills.tools]}
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
