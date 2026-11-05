export const EXPERIENCES = [
  {
    company: "Bit Group Asia",
    location: "Jakarta, Indonesia",
    logo: "/images/company/bitgroup.png",
    className:
      "bg-cloud text-ink md:col-span-7 md:row-span-2 md:min-h-[46rem]",
    roles: [
      {
        title: "Head of Group Frontend Developer",
        period: "Aug 2026 - Present",
        description:
          "Strategic Head of Frontend Engineering. Scaling web architectures and empowering high-performing developer teams.",
      },
      {
        title: "Frontend Developer",
        period: "Aug 2025 - Present",
        description: undefined,
      },
    ],
  },
  {
    company: "PT. Entrepreneur Trust Digital",
    location: "Jakarta, Indonesia",
    className: "bg-soft text-ink md:col-span-5",
    roles: [
      {
        title: "Frontend Developer",
        period: "Apr 2023 - Aug 2025",
        description: "Bank Rakyat Indonesia (BRI) App Engineering Team.",
      },
    ],
  },
  {
    company: "Feedloop",
    logo: "/images/company/feedloop.jpg",
    className: "bg-ink text-cloud md:col-span-5",
    roles: [
      {
        title: "Software Engineer",
        period: "Apr 2021 - Mar 2023",
        description: undefined,
      },
    ],
  },
  {
    company: "Everidea Interactive",
    logo: "/images/company/everidea.webp",
    className: "bg-cloud text-ink md:col-span-6",
    roles: [
      {
        title: "Frontend Web Developer",
        period: "Mar 2021 - Apr 2021",
        description: undefined,
      },
    ],
  },
  {
    company: "Gerakan Nasional 1000 Startup Digital",
    location: "Jakarta, Indonesia",
    logo: "/images/company/1000-startup.png",
    className: "bg-accent text-ink md:col-span-6",
    glow: "rgba(255,255,255,0.4)",
    roles: [
      {
        title: "Frontend Developer",
        period: "Feb 2021 - Mar 2021",
        description: undefined,
      },
    ],
  },
];

export type Experience = (typeof EXPERIENCES)[number] & { glow?: string };
