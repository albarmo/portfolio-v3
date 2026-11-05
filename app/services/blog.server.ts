import { getDb } from "@/services/db.server";

export type BlogPost = {
  id: number | string;
  title: string;
  summary: string;
  author: string;
  date: string;
  slug: string;
  thumbnail: string;
  content: string;
};

type PaginationParams = {
  page?: number;
  limit?: number;
};

export const BACKUP_BLOG_POST: BlogPost[] = [
  {
    id: "6",
    title: "Frontend Development Standardization: Why Consistency Matters",
    summary:
      "A comprehensive look at why teams need standardization across structure, naming, components, and API patterns — and how to enforce them effectively.",
    author: "Albar Moerhamsa",
    date: "June 29, 2026",
    slug: "frontend-development-standardization",
    thumbnail: "/images/blog/frontend-development-standardization.svg",
    content: `
Frontend development without standards is like a city without zoning laws — things get built, but over time the chaos makes everything harder to maintain, extend, or even understand.

Standardization in frontend development means agreeing on the way your team writes code, structures folders, names files, handles data, and ships features. It's not about restricting creativity; it's about reducing cognitive load. When every developer on the team can open any file and immediately understand what it does and where it belongs, you've achieved something valuable.

## The Core Principles

Good frontend standards rest on a few core principles:

**Clean Code** — Code should read like prose. Variable names, component names, and function names should communicate intent without requiring a comment.

**Consistent Structure** — Every project should have a predictable folder layout. When a new developer joins, they shouldn't need a guided tour to understand where things live.

**Reusable Components** — Build UI components once, use them everywhere. A Button is a Button — not a UserApprovalButton that's tightly coupled to a specific API call.

**Typed Data** — TypeScript is non-negotiable in modern frontend. It's your first layer of documentation and your fastest feedback loop for catching bugs before runtime.

**Clear Responsibility** — Each file, component, and function should do exactly one thing well. If you can't describe a component's job in one sentence, it's doing too much.

## Why Teams Resist Standards

The most common objection is "it slows us down." In the short term, writing a proper service layer and typed interfaces does take more time than hacking a fetch call directly into a component. But every shortcut today is technical debt tomorrow.

The second objection is "everyone has their own style." This is true — but codebases aren't personal projects. They're shared responsibility. Style consistency isn't about personal preference; it's about the next developer who reads your code at 2am trying to fix a production bug.

## The Definition of Done

Standards only work if the team agrees on what "done" actually means. A feature is done when it:

- Fulfills the requirement
- Has loading, empty, and error states
- Is responsive
- Has no TypeScript errors
- Has no console errors
- Has no hardcoded credentials

Without this shared definition, "done" means "it works on my machine" — which isn't good enough.
    `,
  },
  {
    id: "7",
    title: "Building Reusable React Components: The Right Way",
    summary:
      "Learn how to design components with single responsibility, proper typing, and clear interfaces — and why separating UI from business logic matters.",
    author: "Albar Moerhamsa",
    date: "June 22, 2026",
    slug: "building-reusable-react-components",
    thumbnail: "/images/blog/building-reusable-react-components.svg",
    content: `
One of the most common mistakes in React development is mixing business logic with UI rendering inside the same component. This might seem harmless at first — the component works, after all — but it creates a tightly coupled, untestable, and unreusable piece of code.

## The Single Responsibility Principle

Every component should have one job. A Button renders a button and handles click events. A UserCard renders user information. A UserTable renders a list of users. None of them should be making API calls directly.

**Bad:**
\`\`\`tsx
export function Button() {
  const submitUser = async () => {
    await fetch("/api/users");
  };
  return <button onClick={submitUser}>Submit</button>;
}
\`\`\`

This Button is now permanently tied to the user API. You can't reuse it for anything else.

**Good:**
\`\`\`tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function Button({ children, onClick, disabled = false, type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
\`\`\`

This Button works anywhere in your application.

## Size Guidelines

Components should stay manageable:

- **Small**: 20–80 lines — simple, pure UI
- **Medium**: 80–150 lines — composed UI with some state
- **Large**: up to ~200 lines — complex sections

If a component exceeds 200 lines, it's a signal to break it apart. A UserPage that renders a filter, table, and modal should be decomposed into UserFilter, UserTable, and UserFormModal — each in its own file.

## Props Design

Props are the public API of your component. Design them intentionally:

- Use typed interfaces, never raw \`any\`
- Name boolean props naturally: \`isLoading\`, \`isDisabled\`, \`hasError\` — not \`loading\`, \`disabled\`, or \`flag\`
- If props exceed ~6 fields, consider passing a single object instead of individual values

\`\`\`tsx
// Hard to read
<UserForm id={id} name={name} email={email} phone={phone} role={role} status={status} />

// Better
<UserForm user={user} />
\`\`\`

## Where Components Live

The project structure should reflect component responsibility:

- \`components/ui/\` — Base UI components (Button, Input, Badge). No business logic.
- \`components/layout/\` — Layout shells (Navbar, Sidebar, Footer).
- \`components/shared/\` — Reusable cross-feature components (StatusBadge, ConfirmDialog).
- \`features/feature-name/components/\` — Feature-specific components that aren't shared.

This separation makes it immediately clear what a component does, who owns it, and whether it can be reused.
    `,
  },
  {
    id: "8",
    title: "TypeScript in Frontend Development: Stop Using `any`",
    summary:
      "Practical guidance on TypeScript best practices — proper typing for components, services, and utilities — and why eliminating `any` makes your codebase safer.",
    author: "Albar Moerhamsa",
    date: "June 15, 2026",
    slug: "typescript-stop-using-any",
    thumbnail: "/images/blog/typescript-stop-using-any.svg",
    content: `
TypeScript's value proposition is simple: it tells you about bugs before they reach your users. But that promise is only fulfilled if you actually use it properly. The most common way to undermine TypeScript is the \`any\` type.

## The Problem With \`any\`

\`any\` is a type-system escape hatch. When you annotate something as \`any\`, you're telling TypeScript "trust me, I know what I'm doing" — and TypeScript immediately stops checking that variable entirely.

\`\`\`ts
// Bad — TypeScript won't catch any errors here
function formatUser(data: any) {
  return data.nmae; // typo — no error!
}
\`\`\`

\`\`\`ts
// Good — TypeScript catches the typo immediately
type User = { id: string; name: string; email: string };

function formatUser(data: User) {
  return data.nmae; // Error: Property 'nmae' does not exist on type 'User'
}
\`\`\`

## Use \`unknown\` Instead

When you genuinely don't know the type — like in a catch block or when parsing external JSON — use \`unknown\` instead of \`any\`. It forces you to narrow the type before using it:

\`\`\`ts
function handleError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected error occurred";
}
\`\`\`

## Where to Put Types

Types should live close to where they're used:

- **Shared types** → \`src/types/\` (used across multiple features)
- **Feature types** → \`src/features/feature-name/types/\` (scoped to one feature)
- **Component-local types** → top of the same file

\`\`\`ts
// src/types/user.ts
export type UserStatus = "active" | "inactive" | "blocked";

export type User = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
};
\`\`\`

## Typing Component Props

Every React component must have typed props. No exceptions.

\`\`\`tsx
type UserCardProps = {
  name: string;
  email: string;
  role?: string;
  isActive: boolean;
};

export function UserCard({ name, email, role, isActive }: UserCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      {role && <span>{role}</span>}
      <span>{isActive ? "Active" : "Inactive"}</span>
    </div>
  );
}
\`\`\`

## Typing API Responses

Every API call should return a typed value. Don't let raw API responses flow untyped through your app:

\`\`\`ts
type ApiResponse<T> = {
  data: T;
  message: string;
  code: number;
};

async function getUsers(): Promise<ApiResponse<User[]>> {
  const res = await fetch("/api/users");
  return res.json();
}
\`\`\`

TypeScript is only as useful as you make it. When used consistently, it becomes your fastest bug-finding tool — and your best form of documentation.
    `,
  },
  {
    id: "9",
    title: "API Service Layers: Separating Business Logic from UI Components",
    summary:
      "Why direct fetch calls inside components are an anti-pattern — and how to build a proper service layer that makes your code testable, reusable, and maintainable.",
    author: "Albar Moerhamsa",
    date: "June 8, 2026",
    slug: "api-service-layer-react",
    thumbnail: "/images/blog/api-service-layer-react.svg",
    content: `
One of the most pervasive anti-patterns in React codebases is the API call buried directly inside a component's useEffect. It works. It's fast to write. And it creates a maintenance nightmare.

## The Problem

When you put a fetch call directly in a component, that component becomes tightly coupled to your API. You can't reuse it with different data. You can't test it without mocking the entire network. And when the API changes, you have to find every component that calls it.

\`\`\`tsx
// Anti-pattern
useEffect(() => {
  fetch("/api/users")
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
\`\`\`

## The Service Layer

The solution is a dedicated service module for each resource. All API calls for users go through a user service:

\`\`\`ts
// features/user-management/services/user-service.ts
import { apiClient } from "@/lib/api-client";
import type { User, CreateUserPayload } from "../types/user-type";

export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get("/users");
  return response.data;
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const response = await apiClient.post("/users", payload);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(\`/users/\${id}\`);
}
\`\`\`

## The Centralized API Client

The service layer calls a single, centralized API client — never raw fetch:

\`\`\`ts
// lib/api-client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = {
  async get<T>(url: string): Promise<{ data: T }> {
    const response = await fetch(\`\${BASE_URL}\${url}\`, {
      headers: { Authorization: \`Bearer \${getToken()}\` },
    });
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  },
  // post, put, delete...
};
\`\`\`

This means: base URL in one place, authentication in one place, error handling in one place. When you change how auth tokens work, you change it once.

## Composing with Query Hooks

The service layer composes cleanly with React Query or TanStack Query:

\`\`\`ts
// features/user-management/hooks/use-user-query.ts
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user-service";

export function useUserQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
\`\`\`

Your component then becomes clean, readable, and free of any data-fetching concerns:

\`\`\`tsx
export function UserList() {
  const { data: users, isLoading, isError } = useUserQuery();
  if (isLoading) return <UserTableSkeleton />;
  if (isError) return <ErrorState message="Failed to load users" />;
  if (!users?.length) return <EmptyState message="No users found" />;
  return <UserTable users={users} />;
}
\`\`\`

This is clean code. Each layer has one job. The component renders. The hook manages state. The service fetches. The client handles HTTP.
    `,
  },
  {
    id: "10",
    title: "Form Handling Done Right: Validation, UX, and Error Feedback",
    summary:
      "A practical guide to building production-quality forms with React Hook Form and Zod — covering validation, loading states, error messages, and accessibility.",
    author: "Albar Moerhamsa",
    date: "June 1, 2026",
    slug: "form-handling-react-hook-form-zod",
    thumbnail: "/images/blog/form-handling-react-hook-form-zod.svg",
    content: `
Forms are one of the most important UI surfaces in any application — and one of the most commonly done wrong. Poor forms frustrate users, create bugs, and erode trust. Good forms are fast, informative, and forgiving.

## The Anatomy of a Good Form

A production-quality form needs all of these:

- **Default values** — Pre-populate fields when editing existing data
- **Validation schema** — Clear, typed rules for what constitutes valid input
- **Error messages** — Specific, human-readable feedback at the field level
- **Loading state** — Disable submission during pending requests
- **Success feedback** — Confirm the action completed
- **Error feedback** — Inform the user if something went wrong server-side

## Schema Validation with Zod

Zod gives you a type-safe way to declare your form's shape and validation rules:

\`\`\`ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Role is required"),
});

export type UserFormValues = z.infer<typeof userSchema>;
\`\`\`

The schema serves double duty: it validates your form AND generates your TypeScript types automatically.

## Connecting to React Hook Form

\`\`\`tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function UserForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "", role: "" },
  });

  const onSubmit = async (values: UserFormValues) => {
    await createUser(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
\`\`\`

## Error Messages That Help

Error messages should be specific and actionable:

**Bad:**
- "Invalid input"
- "Error"
- "Failed"

**Good:**
- "Name is required"
- "Please enter a valid email address"
- "Password must be at least 8 characters"

The goal is for a user to read the error and know exactly what to fix — without needing to guess.

## Confirmation for Destructive Actions

Any form action that can't be undone — deleting data, sending a final submission, resetting a password — must include a confirmation step. "Are you sure?" dialogs prevent costly accidents.

## The Submit Button Rule

Never allow double-submission. Disable the submit button while a request is in flight:

\`\`\`tsx
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Saving..." : "Save"}
</Button>
\`\`\`

This is both a UX best practice and a defense against duplicate database entries.
    `,
  },
  {
    id: "11",
    title: "State Management Strategy: When to Use Local, Global, and Server State",
    summary:
      "Not all state is equal. Learn the clear boundaries between local, global, and server state — and how to pick the right tool for each without over-engineering.",
    author: "Albar Moerhamsa",
    date: "May 25, 2026",
    slug: "state-management-local-global-server",
    thumbnail: "/images/blog/state-management-local-global-server.svg",
    content: `
State management is one of the most over-engineered aspects of frontend development. Teams reach for Redux on day one because it's "industry standard" — and end up with hundreds of lines of boilerplate for a form that only needs \`useState\`.

The key insight is that not all state is the same. There are three fundamentally different kinds of state, and each has its own best tool.

## Local State

Local state is owned by a single component and doesn't need to be shared. This is the vast majority of state in most applications.

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [searchQuery, setSearchQuery] = useState("");
\`\`\`

If state never leaves one component, keep it with \`useState\`. Don't put it in a global store — that's premature complexity.

## Global State

Global state is shared across multiple pages or features that don't have a direct parent-child relationship. Classic examples:

- Current authenticated user/session
- Theme preference (dark/light)
- Sidebar open/closed
- User permissions
- Global notification queue

For this, Zustand is an excellent choice. It's minimal, hook-based, and doesn't require the setup overhead of Redux:

\`\`\`ts
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
\`\`\`

## Server State

Server state is data that lives on a server — a list of users, a product catalog, a report. Many developers make the mistake of fetching this data and storing it in their global Redux or Zustand store. This creates a secondary cache that's difficult to keep synchronized with the real data.

The right tool is React Query (TanStack Query), which manages the full lifecycle of server data: fetching, caching, background revalidation, and error handling.

\`\`\`ts
const { data: users, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: getUsers,
  staleTime: 1000 * 60 * 5, // consider fresh for 5 minutes
});
\`\`\`

## The Decision Rule

Before reaching for a state management solution, ask:
1. Is this used by only one component? → \`useState\`
2. Is this data from the server? → React Query
3. Is this shared across many unrelated components? → Zustand/Context

Following this hierarchy prevents the two most common mistakes: storing server data in a global store (duplication), and storing local state in a global store (over-engineering).
    `,
  },
  {
    id: "12",
    title: "Git Workflow Standards for Frontend Teams",
    summary:
      "Practical standards for branch naming, commit messages, and pull request descriptions that make code review faster and git history actually useful.",
    author: "Albar Moerhamsa",
    date: "May 18, 2026",
    slug: "git-workflow-standards-frontend",
    thumbnail: "/images/blog/git-workflow-standards-frontend.svg",
    content: `
Git is not just version control — it's communication. Every commit message, branch name, and pull request description is a message to your future self and your teammates. Treat it that way.

## Branch Naming

Branches should encode their purpose:

\`\`\`
feature/user-management
fix/login-validation
hotfix/production-auth-error
refactor/dashboard-layout
chore/update-dependencies
\`\`\`

The prefix (\`feature\`, \`fix\`, \`hotfix\`, \`refactor\`, \`chore\`) immediately communicates the nature of the work. A reviewer scanning branch names can triage pull requests before even opening them.

## Commit Messages

Use the conventional commits format: \`type: message\`

\`\`\`
feat: add user management page
fix: handle login error response
refactor: simplify dashboard layout
style: adjust button spacing
chore: update dependencies
docs: add API integration guide
test: add unit tests for formatDate
\`\`\`

A good commit message explains the *what*, not the *how*. The code already shows the how. The message should tell a future developer why this change existed and what problem it solved.

**The rules:**
- One commit, one change. Don't bundle a bug fix with a refactor.
- Never commit \`.env\` files.
- Never commit \`console.log\` debug statements.
- Never commit build artifacts unless required.

## Pull Request Descriptions

A PR description is documentation. It should tell a reviewer what changed, why, and how to test it:

\`\`\`
Title: [Feature] Add user management page

Description:
Adds the user management section with list, create, edit, and delete functionality.

Changes:
- Added user list table with pagination and search
- Added create/edit form with Zod validation
- Added delete confirmation dialog
- Connected to /api/users endpoints

Testing:
- Create a new user via the form
- Edit an existing user
- Delete a user and confirm via dialog
- Verify empty state when no users exist
\`\`\`

## The Pre-Merge Checklist

Before any PR is merged, verify:

- [ ] No TypeScript errors (\`tsc --noEmit\`)
- [ ] No lint errors (\`eslint\`)
- [ ] Build passes (\`npm run build\`)
- [ ] No console errors in browser
- [ ] Loading, empty, and error states present
- [ ] No hardcoded credentials
- [ ] Responsive layout checked

This checklist transforms code review from a bug hunt into a quality gate. When developers trust that these checks pass before a PR lands, the review can focus on architecture and logic instead of style and typos.
    `,
  },
  {
    id: "1",
    title: "Understanding React Server Components vs. Client Components",
    summary:
      "A deep dive into the new paradigm introduced in React, exploring how Server Components can drastically improve performance and what it means for your application architecture.",
    author: "Albar Moerhamsa",
    date: "August 5, 2025",
    slug: "react-server-vs-client-components",
    thumbnail: "/images/blog/react-server-vs-client-components.svg",
    content: `
      React Server Components (RSCs) represent one of the biggest shifts in React's architecture. The primary motivation is to combat the ever-growing JavaScript bundle sizes and complex data-fetching waterfalls that can slow down our applications. By moving components to the server, we can send a much lighter, non-interactive HTML payload to the client, resulting in a significantly faster initial page load.

      A Server Component runs exclusively on the server. It can fetch data directly, access the backend filesystem, and it never sends its JavaScript to the client. This makes it perfect for static parts of your UI like text, images, and data displays. In contrast, a Client Component is the traditional React component we all know. It runs on the client, can use state (useState) and effects (useEffect), and handles all user interactivity. You explicitly opt-in to a Client Component by placing a "use client" directive at the top of the file.

      The true power lies in how they work together. The recommended approach is to build your application with Server Components by default and only use Client Components for the interactive "islands" within your UI. This hybrid model gives you the best of both worlds: the performance benefits of server-side rendering and the rich interactivity of a client-side application.
    `,
  },
  {
    id: "2",
    title: "Mastering TypeScript Generics for Reusable Components",
    summary:
      "Take your TypeScript skills to the next level. This guide explains how to use generics to create highly reusable and type-safe React components for any data structure.",
    author: "Albar Moerhamsa",
    date: "July 28, 2025",
    slug: "mastering-typescript-generics",
    thumbnail: "/images/blog/mastering-typescript-generics.svg",
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
    `,
  },
  {
    id: "3",
    title: "The 2025 Guide to State Management in Frontend Applications",
    summary:
      "Redux, Zustand, Jotai, or Signals? The state management landscape is always evolving. We compare the most popular solutions to help you choose the right one for your next project.",
    author: "Albar Moerhamsa",
    date: "July 15, 2025",
    slug: "2025-frontend-state-management-guide",
    thumbnail: "/images/blog/2025-frontend-state-management-guide.svg",
    content: `
      Choosing a state management library can be one of the most critical architectural decisions for a new frontend project. For years, Redux was the undisputed king for large-scale applications, offering a predictable state container with powerful dev tools. However, its boilerplate and complexity have led developers to seek simpler alternatives.

      Enter libraries like Zustand and Jotai. Zustand provides a minimal, hook-based API that feels very similar to React's built-in state but with the power of a centralized store. Jotai takes an atom-based approach, allowing you to create small, independent pieces of state that can be composed together, reducing unnecessary re-renders.

      More recently, the concept of Signals (popularized by SolidJS and Preact) has gained traction. Signals offer fine-grained reactivity, updating only the specific parts of the DOM that depend on a piece of state, which can lead to incredible performance. While still emerging in the React ecosystem, they represent a fascinating new direction. For most new projects today, starting with Zustand offers a fantastic balance of power and simplicity.
    `,
  },
  {
    id: "4",
    title: "Core Web Vitals: A Practical Guide to Optimizing LCP and FCP",
    summary:
      "Don't let a slow website hurt your user experience. This article provides actionable steps to diagnose and fix common issues affecting Largest and First Contentful Paint.",
    author: "Albar Moerhamsa",
    date: "June 30, 2025",
    slug: "practical-guide-core-web-vitals",
    thumbnail: "/images/blog/practical-guide-core-web-vitals.svg",
    content: `
      Google's Core Web Vitals are a set of metrics that measure real-world user experience for loading performance, interactivity, and visual stability. Scoring well on these metrics is crucial not only for user satisfaction but also for SEO ranking. This guide focuses on two of the most important loading metrics: First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

      To optimize your LCP, focus on what's 'above the fold'. Ensure your hero image or main text block renders as quickly as possible. You can achieve this by preloading critical assets, using modern image formats like WebP or AVIF, and ensuring your CSS is not render-blocking.

      For FCP, the key is to reduce the time to the first byte (TTFB) and eliminate render-blocking resources. This involves optimizing your server response time, minimizing CSS and JavaScript that must be loaded before any content can be shown, and using font-display strategies to avoid invisible text. Performance is not a one-time fix but an ongoing process of measurement and improvement.
    `,
  },
  {
    id: "5",
    title: "Building a Design System with Storybook and Tailwind CSS",
    summary:
      "Learn how to create a robust and maintainable design system from scratch. We'll cover setting up Storybook, integrating Tailwind CSS, and documenting components effectively.",
    author: "Albar Moerhamsa",
    date: "June 12, 2025",
    slug: "design-system-storybook-tailwind",
    thumbnail: "/images/blog/design-system-storybook-tailwind.svg",
    content: `
      A design system is the single source of truth for your application's UI. It ensures consistency, speeds up development, and improves collaboration between designers and developers. In this guide, we'll build one using two powerful tools: Tailwind CSS for utility-first styling and Storybook for component documentation and isolation.

      The process starts by setting up a new project and running 'npx storybook init'. Once Storybook is running, you can integrate Tailwind by following its installation guide and configuring Storybook's preview.js to import your global CSS file. From there, you can start building your components.

      For example, a Button component can be built using Tailwind classes for styling, and its different states (primary, secondary, disabled, loading) can be documented as separate 'stories' in Storybook. This creates an interactive catalog of your UI components that serves as living documentation for the entire team.
    `,
  },
];

async function seedBlogs() {
  const db = await getDb();
  const col = db.collection<BlogPost>("blogs");
  await col.createIndex({ id: 1 }, { unique: true });
  await col.createIndex({ slug: 1 }, { unique: true });
  const ops = BACKUP_BLOG_POST.map((blog) => ({
    updateOne: {
      filter: { id: blog.id },
      update: { $setOnInsert: blog },
      upsert: true,
    },
  }));
  await col.bulkWrite(ops, { ordered: false });
}

export async function getBlogs({
  page = 1,
  limit = 10,
}: PaginationParams): Promise<{ code: number; data: BlogPost[] }> {
  try {
    const db = await getDb();
    await seedBlogs();
    const col = db.collection<BlogPost>("blogs");
    const skip = (page - 1) * limit;
    const data = await col
      .find({}, { projection: { _id: 0 } })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    return { code: 200, data: data as BlogPost[] };
  } catch {
    return { code: 200, data: BACKUP_BLOG_POST };
  }
}

export async function getBlog(
  id: string
): Promise<{ code: number; data: BlogPost | null | undefined }> {
  try {
    const db = await getDb();
    await seedBlogs();
    const col = db.collection<BlogPost>("blogs");
    const data = await col.findOne(
      { $or: [{ id: id }, { slug: id }] } as Parameters<typeof col.findOne>[0],
      { projection: { _id: 0 } }
    );
    return { code: 200, data: data as BlogPost | null };
  } catch {
    const blog = BACKUP_BLOG_POST.find(
      (b) => String(b.id) === String(id) || b.slug === id
    );
    return { code: 200, data: blog };
  }
}
