// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: "Adarsh Kumar Sahu",
  firstName: "Adarsh",
  role: "Software Engineer",
  aspiration: "Aspiring AI Engineer",
  location: "Jabalpur, India",
  email: "adarshsahu371@gmail.com",
  linkedin: "https://linkedin.com/in/aks111",
  github: "https://github.com/adarshsahu123",
  resume: "/Adarsh_Kumar_Sahu_Resume.pdf",
  typingLines: [
    "Building with Python & LLMs",
    "Exploring RAG pipelines",
    "Developing & testing real software",
    "Learning AI, one model at a time",
  ],
  intro:
    "Computer Science graduate who builds and tests real software — now steering every step toward AI engineering.",
};

export const about = {
  paragraphs: [
    "I'm a B.Tech Computer Science graduate (7.9 CGPA) from Jabalpur. My path started with web development, moved into Python backend work, and today I build and test a live billing product at a startup.",
    "Along the way I built a RAG-based AI assistant — and that's where things clicked. Making a model answer from real documents showed me what I want to do: build AI systems that are useful and reliable.",
    "I'll be honest about where I stand: my foundations are in Python, SQL and testing, and I'm actively learning the AI stack. I learn by building, and this portfolio grows with me.",
  ],
  stats: [
    { value: "02", label: "Internships" },
    { value: "01", label: "Live product" },
    { value: "7.9", label: "CGPA" },
    { value: "∞", label: "Curiosity" },
  ],
};

export type SkillLevel = "strong" | "working" | "learning";

export const skillGroups: {
  level: SkillLevel;
  title: string;
  caption: string;
  skills: string[];
}[] = [
  {
    level: "strong",
    title: "Confident",
    caption: "Used in real work and internships",
    skills: ["Python", "SQL / MySQL", "OOP", "Git & GitHub", "Manual Testing", "Debugging", "HTML & CSS", "SDLC"],
  },
  {
    level: "working",
    title: "Working knowledge",
    caption: "Comfortable, still sharpening",
    skills: ["JavaScript", "Core Java", "Python Backend", "RAG Basics", "Admin Panels", "VS Code"],
  },
  {
    level: "learning",
    title: "Currently learning",
    caption: "Where I'm investing my time now",
    skills: ["LLM APIs", "Prompt Engineering", "Embeddings", "Vector Databases", "LangChain", "Machine Learning Basics", "NumPy & Pandas", "FastAPI"],
  },
];

export const experience = [
  {
    role: "Developer & Tester",
    company: "Viziqo (Startup)",
    period: "Present",
    current: true,
    points: [
      "Developing a billing software application as part of a startup team, working as both developer and tester.",
      "Manually testing features and workflows to verify they behave as expected, and reporting issues to the team.",
      "Collaborating to fix defects and re-testing fixes before release.",
    ],
  },
  {
    role: "Python Developer Intern",
    company: "MPSEDC",
    period: "Feb 2026 – May 2026",
    current: false,
    points: [
      "Worked on backend technologies using Python in a corporate environment.",
      "Built team collaboration and professional communication skills.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Starial Pvt. Ltd., Jabalpur",
    period: "May 2024 – Jul 2024",
    current: false,
    points: [
      "Completed a 2-month internship in web development.",
      "Managed the admin panel for product operations.",
    ],
  },
];

export const projects = [
  {
    title: "RAG-Based AI Assistant",
    tag: "Featured · AI",
    description:
      "An AI assistant that answers questions from a set of documents by retrieving the most relevant content first, then generating a grounded response.",
    highlights: [
      "Document ingestion → chunking → retrieval → answer generation",
      "Tested with varied questions to check relevance and accuracy",
    ],
    stack: ["Python", "RAG", "LLM", "Embeddings"],
    link: "https://github.com/adarshsahu123",
    featured: true,
  },
  {
    title: "Billing Software",
    tag: "Product · Viziqo",
    description:
      "A billing application built with a startup team, where I work across development and manual testing to keep releases reliable.",
    highlights: ["Feature development and test workflows", "Defect reporting and re-testing before release"],
    stack: ["Development", "Manual Testing", "SDLC"],
    link: null,
    featured: false,
  },
  {
    title: "Product Admin Panel",
    tag: "Web · Starial",
    description:
      "Managed the admin panel used for product operations during my web development internship.",
    highlights: ["Hands-on web development", "Real product operations"],
    stack: ["HTML", "CSS", "JavaScript"],
    link: null,
    featured: false,
  },
];

export type RoadmapStatus = "done" | "now" | "next";

export const roadmap: { title: string; detail: string; status: RoadmapStatus }[] = [
  { title: "Programming foundations", detail: "Python, Java, OOP, SQL", status: "done" },
  { title: "Web & backend", detail: "HTML/CSS/JS, Python backend, two internships", status: "done" },
  { title: "Software in production", detail: "Developing & testing a live billing product", status: "done" },
  { title: "First AI project", detail: "RAG assistant over documents", status: "done" },
  { title: "LLM engineering", detail: "LLM APIs, prompting, embeddings, vector DBs", status: "now" },
  { title: "ML fundamentals", detail: "NumPy, Pandas, core ML concepts", status: "now" },
  { title: "Production AI apps", detail: "FastAPI services, agents, evaluation, deployment", status: "next" },
];

export const education = [
  {
    title: "B.Tech — Computer Science",
    place: "Shri Ram Institute of Science and Technology, Jabalpur",
    period: "",
    score: "CGPA 7.9",
  },
  {
    title: "12th (PCM)",
    place: "Dr. K.L. Papneja Higher Secondary School, Kareli",
    period: "2021 – 2022",
    score: "84.6%",
  },
  {
    title: "10th",
    place: "Dr. K.L. Papneja Higher Secondary School, Kareli",
    period: "2019 – 2020",
    score: "88.5%",
  },
];

export const certifications = [
  "Internship Completion Certificate — MPSEDC (Python Developer)",
  "Web Development Certificate — Starial Pvt. Ltd., Jabalpur",
];
