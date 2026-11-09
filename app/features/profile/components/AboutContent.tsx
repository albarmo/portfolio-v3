import { Squiggle } from "@/components/atoms/Squiggle";
import { RainbowArc } from "@/components/organisms/RainbowArc";
import { AreaOfExpertise } from "./AreaOfExpertise";
import { SkillCard } from "./SkillCard";

const CAREER_START_YEAR = 2021;

const SKILLS = {
  languages: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Dart"],
  frameworks: ["React", "Next.js", "Remix", "Vue.js", "Node.js", "Flutter", "Go"],
  styling: ["Tailwind CSS", "SASS/SCSS", "Styled Components", "Framer Motion"],
  tools: ["Git", "Figma", "Vite", "Webpack", "Jest", "Vercel"],
};

export function AboutContent() {

  return (
    <div className="pt-20">
      <AreaOfExpertise />

      <div className="relative isolate overflow-hidden">
        <RainbowArc side="right" />
        <section className="section-shell">
          <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-tight text-foreground sm:text-6xl">
            A FRONTEND ENGINEER WHO CARES ABOUT THE PRODUCT BEHIND THE PIXELS.
          </h1>
          <Squiggle />
        </section>

        <div className="section-shell mt-10 space-y-6 font-mono text-sm leading-7 text-muted">
          <p>
            My journey into web development began with a simple curiosity about
            how an idea could be transformed into something interactive on a
            screen. For me, frontend development is the perfect blend of
            problem-solving logic and design creativity. I find immense
            satisfaction in building products that are not only technically
            solid but also easy and enjoyable for many people to use.
          </p>
          <p>
            With over {new Date().getFullYear() - CAREER_START_YEAR} years of experience, I
            focus on writing clean, maintainable, and scalable code. I believe
            that web performance and accessibility are not afterthoughts but are
            core to a great user experience. I am always enthusiastic about
            learning new technologies and collaborating within a team to turn a
            shared vision into reality.
          </p>
        </div>

        <section className="section-shell section-pad">
          <h2 className="font-display text-4xl font-black uppercase text-foreground">
            TECHNOLOGY STACK
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <SkillCard
              title="Language & Framework"
              skills={[...SKILLS.languages, ...SKILLS.frameworks]}
            />
            <SkillCard
              title="Styling & Tools"
              skills={[...SKILLS.styling, ...SKILLS.tools]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
