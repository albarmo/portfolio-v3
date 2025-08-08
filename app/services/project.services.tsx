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
      '[\n                      "Developed key features for the cross-platform mobile app using React Native.",\n                      "Managed the application\'s global state for transactions and user data with Redux.",\n                      "Integrated Firebase for real-time notifications and analytics.",\n                      "Collaborated with UI/UX designers to create a user-friendly and intuitive interface for banking agents.",\n                      "Implemented secure transaction processing and data handling protocols."\n                    ]',
    techStack: '["React Native", "Redux", "Firebase", "TypeScript"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "Delima is a mobile application that serves as a digital ecosystem for BRI (Bank Rakyat Indonesia) agents, enabling them to perform financial transactions, manage customers, and access various banking services on the go.",
    result:
      "The Delima app successfully empowered over 100,000 BRI agents, increasing the volume of agent-led transactions by 60%.",
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
      '[\n                      "Led the frontend development using Remix and TypeScript to ensure type safety and scalability.",\n                      "Implemented a pixel-perfect and responsive UI based on Figma designs using Tailwind CSS.",\n                      "Integrated with the backend API to fetch and display dynamic data for listings and user profiles.",\n                      "Developed interactive map features for location discovery.",\n                      "Ensured high performance and fast load times through server-side rendering and code splitting."\n                    ]',
    techStack: '["Remix", "TailwindCSS", "Prisma", "PostgreSQL", "TypeScript"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "Localoka is a web platform designed to help users discover local services, hidden gems, and unique places in their area. The project focused on creating an intuitive and visually appealing user interface for seamless exploration and booking.",
    result:
      "Successfully launched a user-friendly platform that saw a 40% increase in user engagement within the first three months. The intuitive design received highly positive feedback from early adopters.",
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
      '[\n                      "Built a secure and robust authentication flow using OAuth 2.0 and JSON Web Tokens (JWT).",\n                      "Created a centralized login portal and user management dashboard with React and TypeScript.",\n                      "Collaborated with backend teams to integrate the SSO service with various existing applications.",\n                      "Implemented multi-factor authentication (MFA) to improve security.",\n                      "Wrote comprehensive documentation for other developers to adopt the SSO system."\n                    ]',
    techStack: '["React", "Node.js", "OAuth 2.0", "JWT", "TailwindCSS"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "Developed a centralized Single Sign-On (SSO) system for the Directorate General of Immigration to unify authentication across multiple internal applications, enhancing security and user experience for employees.",
    result:
      "The SSO system successfully centralized user authentication for over 10 internal applications, reducing login times by 70% and significantly strengthening the overall security posture.",
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
      '[\n                      "Implemented an interactive map interface using Mapbox GL JS for real-time tracking and data visualization.",\n                      "Developed the application as a Progressive Web App (PWA) to ensure offline capabilities for officers in the field.",\n                      "Built a responsive UI that works seamlessly on both mobile devices and desktops.",\n                      "Integrated with a secure backend to send and receive sensitive reporting data.",\n                      "Focused on performance and low data usage for mobile networks."\n                    ]',
    techStack: '["React", "Mapbox GL JS", "PWA", "TailwindCSS", "TypeScript"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "APOA (Aplikasi Pengawasan Orang Asing) is a mobile-first web application for immigration officers to monitor and report the activities of foreign nationals in Indonesia, featuring real-time mapping and reporting capabilities.",
    result:
      "The application enhanced the field monitoring capabilities of immigration officers, leading to a 50% increase in reporting efficiency.",
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
      '[\n                      "Developed the main dashboard for visualizing employee career data using Next.js and Chart.js.",\n                      "Designed and implemented complex forms for performance reviews and promotion submissions.",\n                      "Built a role-based access control (RBAC) system to manage permissions for employees, managers, and HR staff.",\n                      "Ensured data integrity and a seamless user experience across the application.",\n                      "Optimized application performance for handling large datasets of employee information."\n                    ]',
    techStack:
      '["Next.js", "TypeScript", "Chart.js", "PostgreSQL", "TailwindCSS"]',
    category: "Development Frontend",
    gifUrl:
      "https://i.pinimg.com/originals/2c/a0/d2/2ca0d24329355307cc9848bef965fa88.gif",
    brief:
      "SISBINKAR is a comprehensive career development information system for employees of the Directorate General of Immigration. The platform helps in tracking employee progression, managing promotions, and visualizing career paths.",
    result:
      "Streamlined the career management process, reducing manual paperwork by 90% and providing transparent career path data for all employees.",
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
    return {code: 200, data: BACKUP_PROJECTS}
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
