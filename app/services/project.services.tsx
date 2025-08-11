import qs from "~/utils/querystring";

type PaginationParams = {
  page?: number;
  limit?: number;
};

export type Project = {
  id: string;
  repoUrl: string;
  responsibility: string;
  techStack: string;
  category: string;
  gifUrl: string;
  brief: string;
  result: string;
  url: string;
  year: string;
  description: string;
  thumbnail: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export const BACKUP_PROJECTS = [
  {
    repoUrl: "https://github.com/example/delima-bri",
    responsibility:
      '[\n                      "Developing the various Delima client - facing applications in alignment with agile sprint cycles.",\n                      "Maintaining high standards of code quality through reviews and best practices.",\n                      "Integrating frontend components with backend APIs to ensure seamless data flow.",\n                      "Implementing robust client-side security measures to protect user data.",\n                      "Ensuring secure transaction processing and data handling protocols were followed."\n                    ]',
    techStack: '["Microsite", "Nextjs", "Micro-Frontend", "TypeScript"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "Delima is a loan product from Bank BRI, designed to empower rural entrepreneurs by providing accessible financing. The ecosystem is built on a microservice architecture and integrates as a third-party service within partner platforms. The client-side consists of four main web applications: an embeddable Microsite for loan registration and application, a Dashboard for BRI branch offices to monitor and manage loans, a Partner Dashboard for partner companies to track their customers' loan applications, and a promotional Landing Page.",
    result:
      "The Delima digital ecosystem was successfully developed and launched, delivering a comprehensive solution that exceeded the initial project requirements with additional features.",
    url: "/projects/delima",
    year: "2023",
    description: "Development Frontend",
    thumbnail: "/images/project/delima-cover.png",
    title: "Delima BRI",
    id: "9e030a0c-1020-424f-96a4-910ee5317f9e",
    createdAt: "2025-08-05T07:57:46.165Z",
    updatedAt: "2025-08-05T07:57:46.165Z",
  },
  {
    repoUrl: "https://github.com/example/localoka",
    responsibility:
      '[\n                      "Building the Localoka v2 application (revamp).",\n                      "Improving application performance (FCP and LCP).",\n                      "Enhancing application security.",\n                      "Improving the user experience.",\n                      "Adding a chat feature using WebSockets.",\n                      "Adding a notification feature using Server-Sent Events (SSE)."\n                    ]',
    techStack:
      '["Next.js", "TypeScript", "TailwindCSS", "WebSockets", "Server-Sent Events"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "Localoka is a marketplace platform distributed and used within the BRILink ecosystem (for both business owners and customers). Built with Next.js, it consists of a seller dashboard, a mobile app, and a webview. The first version of Localoka faced several challenges, including poor security and slow loading times.",
    result:
      "The Localoka application was successfully developed ahead of schedule. Application performance was significantly improved, reducing load times from nearly 2-3 seconds to under 1 second. Security vulnerabilities were successfully patched. With the remaining time, the team successfully developed an in-house chat feature, which was originally planned to use a third-party service, leading to budget efficiencies in the application's development.",
    url: "/projects/localoka",
    year: "2025",
    description: "Development Frontend",
    thumbnail: "/images/project/localoka-cover.png",
    title: "Localoka",
    id: "e3dfd84f-75ec-4fbf-9d84-930a1e96855f",
    createdAt: "2025-08-05T07:57:46.165Z",
    updatedAt: "2025-08-05T07:57:46.165Z",
  },
  {
    repoUrl: "https://github.com/example/imigrasi-sso",
    responsibility:
      '[\n                      "Fixing existing bugs in the SSO application.",\n                      "Enhancing the application request module.",\n                      "Implementing the profile photo upload flow.",\n                      "Implementing application flagging for grouping purposes."\n                    ]',
    techStack: '["React",  "Javascript",  "Pure CSS"]',
    category: "Development & Maintenance Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "Developed a centralized Single Sign-On (SSO) system for the Directorate General of Immigration to unify authentication across multiple internal applications, enhancing security and user experience for employees.",
    result:
      "The features developed in the SSO resulted in high user satisfaction with the final product.",
    url: "/projects/sso",
    year: "2025",
    description: "Development Frontend",
    thumbnail: "/images/project/sso-3.png",
    title: "Imigrasi SSO",
    id: "04411d6f-9301-450d-8f4a-2b9a3108c0b0",
    createdAt: "2025-08-05T07:57:46.165Z",
    updatedAt: "2025-08-05T07:57:46.165Z",
  },
  {
    repoUrl: "https://github.com/example/interactive-map",
    responsibility:
      '[\n                      "Handled full-stack development, creating both the backend API with Node.js/Express and the frontend with React.",\n                      "Utilized D3.js for powerful and custom data visualizations on the map.",\n                      "Implemented features for filtering, layering, and inspecting data points directly on the map interface.",\n                      "Designed the UI/UX to ensure the tool was intuitive for urban planners and data analysts.",\n                      "Processed and optimized large GeoJSON files for efficient rendering in the browser."\n                    ]',
    techStack: '["D3.js", "React", "Node.js", "GeoJSON", "Express"]',
    category: "Design & Fullstack Development",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "An innovative tool that transforms static GeoJSON data into fully interactive and filterable maps. This project was specifically tailored for analyzing housing data, allowing users to visualize complex datasets spatially.",
    result:
      "Created a powerful data analysis tool that is now used by urban planning researchers to gain new insights from spatial housing data, reducing analysis time from days to minutes.",
    url: "/projects/ism",
    year: "2023",
    description: "Design & Fullstack Development",
    thumbnail: "/images/project/ISMHousing.png",
    title: "Interactive Static Map",
    id: "fb26e7c6-6a49-45c7-b4b0-791980e44cf2",
    createdAt: "2025-08-05T07:57:46.165Z",
    updatedAt: "2025-08-05T07:57:46.165Z",
  },
  {
    repoUrl: "https://github.com/example/apoa",
    responsibility:
      '[\n                      "Building the application from scratch using Next.js.",\n                      "Creating a mapping feature for registered hotels.",\n                      "Developing the client and integrating check-in/checkout features using OCR for passport scanning.",\n                      "Implementing a data export feature.",\n                      "Building a regional office (Kanwil) management feature."\n                    ]',
    techStack:
      '["Next.js", "Mapbox GL", "TailwindCSS", "TypeScript", "OCR"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "APOA (Foreigner Reporting Application) is used by hotels and lodgings to record data on foreign visitors, which is then managed by the Indonesian Ministry of Immigration.",
    result:
      "The APOA application was successfully developed and published to hotel users, receiving a positive response.",
    url: "/projects/apoa",
    year: "2024",
    description: "Development Frontend",
    thumbnail: "/images/project/apoa-map.png",
    title: "APOA Dirjen Imigrasi",
    id: "6173c449-063a-4275-bdde-2b6e97b239d2",
    createdAt: "2025-08-05T07:57:46.165Z",
    updatedAt: "2025-08-05T07:57:46.165Z",
  },
  {
    repoUrl: "https://github.com/example/sisbinkar",
    responsibility:
      '[\n                      "Developing and editing rank features.",\n                      "Implementing features to add and edit job positions, education, training, and awards.",\n                      "Building management features for LHKPN/LHKASN (State Official Wealth Reports).",\n                      "Implementing modules for disciplinary action (Hukdis) management.",\n                      "Developing a complex organizational structure display for web visualization."\n                    ]',
    techStack:
      '["Next.js", "TypeScript", "Chart.js", "D3.js", "PostgreSQL", "TailwindCSS"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "SISBINKAR (Immigration Career Development System) is an internal employee application aimed at monitoring and managing vacant positions in immigration offices; this application also manages comprehensive employee data.",
    result:
      "The required features were developed in a short and effective time with high quality, leading to great user satisfaction with the final product.",
    url: "/projects/sisbinkar",
    year: "2025",
    description: "Development Frontend",
    thumbnail: "/images/project/sisbinkar-1.png",
    title: "Sistem Pembinaan Karir Imigrasi (SISBINKAR)",
    id: "3097b536-5c0e-4dc8-81a9-48ea82a86732",
    createdAt: "2025-08-05T07:57:46.165Z",
    updatedAt: "2025-08-05T07:57:46.165Z",
  },
];

export async function getProjects({ page, limit }: PaginationParams) {
  const queryString = qs({ page, limit });
  try {
    const response = await fetch(
      "http://localhost:8081/api/v1/projects" + queryString
    );

    return response?.json();
  } catch (error) {
    return { code: 200, data: BACKUP_PROJECTS };
  }
}

export async function getProject(id: string) {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/projects/${id}`);

    return response?.json();
  } catch (error) {
    const project = BACKUP_PROJECTS.find((p) => p.id === id);
    return project;
  }
}
