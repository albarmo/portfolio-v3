import qs from "~/utils/querystring";

type PaginationParams = {
  page?: number;
  limit?: number;
};

export type BlogPost = {
  id: number| string;
  title: string;
  summary: string;
  author: string;
  date: string;
  slug: string;
  thumbnail: string;
  content: string;
};

export const BACKUP_BLOG_POST:BlogPost[] = [
  {
    id: "1",
    title: "Understanding React Server Components vs. Client Components",
    summary: "A deep dive into the new paradigm introduced in React, exploring how Server Components can drastically improve performance and what it means for your application architecture.",
    author: "Jane Doe",
    date: "August 5, 2025",
    slug: "react-server-vs-client-components",
    thumbnail: "https://placehold.co/600x400/171717/999999?text=Server+vs.+Client",
    content: `
      React Server Components (RSCs) represent one of the biggest shifts in React's architecture. The primary motivation is to combat the ever-growing JavaScript bundle sizes and complex data-fetching waterfalls that can slow down our applications. By moving components to the server, we can send a much lighter, non-interactive HTML payload to the client, resulting in a significantly faster initial page load.

      A Server Component runs exclusively on the server. It can fetch data directly, access the backend filesystem, and it never sends its JavaScript to the client. This makes it perfect for static parts of your UI like text, images, and data displays. In contrast, a Client Component is the traditional React component we all know. It runs on the client, can use state (useState) and effects (useEffect), and handles all user interactivity. You explicitly opt-in to a Client Component by placing a "use client" directive at the top of the file.

      The true power lies in how they work together. The recommended approach is to build your application with Server Components by default and only use Client Components for the interactive "islands" within your UI. This hybrid model gives you the best of both worlds: the performance benefits of server-side rendering and the rich interactivity of a client-side application.
    `
  },
  {
    id: "2",
    title: "Mastering TypeScript Generics for Reusable Components",
    summary: "Take your TypeScript skills to the next level. This guide explains how to use generics to create highly reusable and type-safe React components for any data structure.",
    author: "John Smith",
    date: "July 28, 2025",
    slug: "mastering-typescript-generics",
    thumbnail: "https://placehold.co/600x400/171717/999999?text=TypeScript+Generics",
    content: `
      If you want to write truly reusable and type-safe code in TypeScript, you need to master generics. Generics allow you to create components, functions, and classes that can work with a variety of data types while still maintaining strict type checking. Instead of writing separate components for a list of users, a list of products, and a list of posts, you can write one generic 'List' component.

      Let's consider a simple example. A generic List component might look like this:
      \`\`\`typescript
      interface ListItem {
        id: string | number;
        name: string;
      }
      
      interface ListProps<T extends ListItem> {
        items: T[];
        renderItem: (item: T) => React.ReactNode;
      }

      function List<T extends ListItem>({ items, renderItem }: ListProps<T>) {
        return <ul>{items.map(item => <li key={item.id}>{renderItem(item)}</li>)}</ul>;
      }
      \`\`\`
      This component can now render any array of objects as long as each object has an 'id' and a 'name'. This powerful pattern reduces code duplication and makes your codebase far more maintainable.
    `
  },
  {
    id: "3",
    title: "The 2025 Guide to State Management in Frontend Applications",
    summary: "Redux, Zustand, Jotai, or Signals? The state management landscape is always evolving. We compare the most popular solutions to help you choose the right one for your next project.",
    author: "Emily White",
    date: "July 15, 2025",
    slug: "2025-frontend-state-management-guide",
    thumbnail: "https://placehold.co/600x400/171717/999999?text=State+Management",
    content: `
      Choosing a state management library can be one of the most critical architectural decisions for a new frontend project. For years, Redux was the undisputed king for large-scale applications, offering a predictable state container with powerful dev tools. However, its boilerplate and complexity have led developers to seek simpler alternatives.

      Enter libraries like Zustand and Jotai. Zustand provides a minimal, hook-based API that feels very similar to React's built-in state but with the power of a centralized store. Jotai takes an atom-based approach, allowing you to create small, independent pieces of state that can be composed together, reducing unnecessary re-renders.

      More recently, the concept of Signals (popularized by SolidJS and Preact) has gained traction. Signals offer fine-grained reactivity, updating only the specific parts of the DOM that depend on a piece of state, which can lead to incredible performance. While still emerging in the React ecosystem, they represent a fascinating new direction. For most new projects today, starting with Zustand offers a fantastic balance of power and simplicity.
    `
  },
  {
    id: "4",
    title: "Core Web Vitals: A Practical Guide to Optimizing LCP and FCP",
    summary: "Don't let a slow website hurt your user experience. This article provides actionable steps to diagnose and fix common issues affecting Largest and First Contentful Paint.",
    author: "Michael Brown",
    date: "June 30, 2025",
    slug: "practical-guide-core-web-vitals",
    thumbnail: "https://placehold.co/600x400/171717/999999?text=Optimized+LCP+and+FCP",
    content: `
      Google's Core Web Vitals are a set of metrics that measure real-world user experience for loading performance, interactivity, and visual stability. Scoring well on these metrics is crucial not only for user satisfaction but also for SEO ranking. This guide focuses on two of the most important loading metrics: First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

      To optimize your LCP, focus on what's 'above the fold'. Ensure your hero image or main text block renders as quickly as possible. You can achieve this by preloading critical assets, using modern image formats like WebP or AVIF, and ensuring your CSS is not render-blocking.

      For FCP, the key is to reduce the time to the first byte (TTFB) and eliminate render-blocking resources. This involves optimizing your server response time, minimizing CSS and JavaScript that must be loaded before any content can be shown, and using font-display strategies to avoid invisible text. Performance is not a one-time fix but an ongoing process of measurement and improvement.
    `
  },
  {
    id: "5",
    title: "Building a Design System with Storybook and Tailwind CSS",
    summary: "Learn how to create a robust and maintainable design system from scratch. We'll cover setting up Storybook, integrating Tailwind CSS, and documenting components effectively.",
    author: "Sarah Green",
    date: "June 12, 2025",
    slug: "design-system-storybook-tailwind",
    thumbnail: "https://placehold.co/600x400/171717/999999?text=Design+and+System",
    content: `
      A design system is the single source of truth for your application's UI. It ensures consistency, speeds up development, and improves collaboration between designers and developers. In this guide, we'll build one using two powerful tools: Tailwind CSS for utility-first styling and Storybook for component documentation and isolation.

      The process starts by setting up a new project and running 'npx storybook init'. Once Storybook is running, you can integrate Tailwind by following its installation guide and configuring Storybook's preview.js to import your global CSS file. From there, you can start building your components.

      For example, a Button component can be built using Tailwind classes for styling, and its different states (primary, secondary, disabled, loading) can be documented as separate 'stories' in Storybook. This creates an interactive catalog of your UI components that serves as living documentation for the entire team.
    `
  },
];

export async function getBlogs({ page, limit }: PaginationParams) {
  const queryString = qs({ page, limit });
  try {
    const response = await fetch(
      "http://localhost:8081/api/v1/blogs" + queryString
    );

    return response?.json();
  } catch (error) {
    return {code: 200, data: BACKUP_BLOG_POST}
  }
}

export async function getBlog(id: string) {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/blogs/${id}`);

    return response?.json();
  } catch (error) {
    const blog = BACKUP_BLOG_POST.find((b) => String(b?.id) === String(id));
    return {code: 200, data:blog};
  }
}
