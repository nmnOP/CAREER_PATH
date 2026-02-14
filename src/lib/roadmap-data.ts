export interface SkillNode {
  id: string;
  label: string;
  description: string;
  estimatedHours: number;
  resources: { title: string; url: string }[];
  status: "locked" | "active" | "in-progress" | "completed";
  children: string[];
  level: number;
}

export interface Roadmap {
  id: string;
  title: string;
  dreamJob: string;
  nodes: SkillNode[];
  createdAt: string;
}

export const MOCK_ROADMAP: Roadmap = {
  id: "1",
  title: "Full-Stack Web Developer",
  dreamJob: "Full-Stack Web Developer",
  createdAt: new Date().toISOString(),
  nodes: [
    {
      id: "html-css",
      label: "HTML & CSS",
      description: "Learn the building blocks of the web: semantic HTML and modern CSS layouts.",
      estimatedHours: 40,
      resources: [
        { title: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { title: "CSS Tricks Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
      ],
      status: "completed",
      children: ["javascript"],
      level: 0,
    },
    {
      id: "javascript",
      label: "JavaScript",
      description: "Master JavaScript fundamentals: variables, functions, DOM manipulation, async/await.",
      estimatedHours: 80,
      resources: [
        { title: "JavaScript.info", url: "https://javascript.info" },
        { title: "Eloquent JavaScript", url: "https://eloquentjavascript.net" },
      ],
      status: "completed",
      children: ["react", "node"],
      level: 1,
    },
    {
      id: "react",
      label: "React",
      description: "Build interactive UIs with components, hooks, state management, and routing.",
      estimatedHours: 60,
      resources: [
        { title: "React Docs", url: "https://react.dev" },
      ],
      status: "in-progress",
      children: ["typescript", "testing"],
      level: 2,
    },
    {
      id: "node",
      label: "Node.js & Express",
      description: "Server-side JavaScript with REST APIs, middleware, and database integration.",
      estimatedHours: 50,
      resources: [
        { title: "Node.js Docs", url: "https://nodejs.org/en/docs" },
      ],
      status: "active",
      children: ["databases"],
      level: 2,
    },
    {
      id: "typescript",
      label: "TypeScript",
      description: "Add type safety to your JavaScript with interfaces, generics, and strict typing.",
      estimatedHours: 30,
      resources: [
        { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/" },
      ],
      status: "locked",
      children: ["fullstack"],
      level: 3,
    },
    {
      id: "testing",
      label: "Testing",
      description: "Write unit tests, integration tests, and E2E tests with Jest and Cypress.",
      estimatedHours: 25,
      resources: [
        { title: "Testing Library", url: "https://testing-library.com" },
      ],
      status: "locked",
      children: ["fullstack"],
      level: 3,
    },
    {
      id: "databases",
      label: "Databases",
      description: "Learn SQL and NoSQL databases: PostgreSQL, MongoDB, ORMs.",
      estimatedHours: 40,
      resources: [
        { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com" },
      ],
      status: "locked",
      children: ["fullstack"],
      level: 3,
    },
    {
      id: "fullstack",
      label: "Full-Stack Projects",
      description: "Combine everything to build and deploy production-ready applications.",
      estimatedHours: 100,
      resources: [],
      status: "locked",
      children: [],
      level: 4,
    },
  ],
};
