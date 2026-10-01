/* ═══════════════════════════════════════════════
   CIIGUS — content.js
   All editable website content lives here.
   Change text, add services / work / values etc.
═══════════════════════════════════════════════ */

export const site = {
  name: "Ciigus Software",
  url: "https://www.ciigus.com", // canonical production domain (ciigus.com redirects here)
  ogImage: "/og-image.jpg",
  ogImageAlt: "Ciigus Software — We build software that moves businesses forward.",
};

// Per-route <title> and meta description. Also drives the sitemap and the
// prerendered HTML files that link-preview crawlers read.
export const pageMeta = {
  "/": {
    title: "Ciigus Software | Web & Mobile App Development in Sri Lanka",
    description: "Ciigus Software builds ERP & business systems, AI & computer vision, and websites & e-commerce for growing businesses in Sri Lanka and worldwide.",
  },
  "/services": {
    title: "Software Development Services | Ciigus Software",
    description: "ERP & business systems, AI & computer vision, websites & e-commerce, restaurant systems, SEO, mobile & desktop apps, and branding & marketing.",
  },
  "/work": {
    title: "Our Work & Projects | Ciigus Software",
    description: "Business systems, e-commerce websites and AI solutions by Ciigus Software, from a construction ERP and LogMaster to AI defect detection and tea clone ID.",
  },
  "/about": {
    title: "About Us | Ciigus Software",
    description: "Ciigus Software is a Sri Lankan team of developers, QA engineers, business analysts and project managers building clean, scalable software.",
  },
  "/packages": {
    title: "Pricing & Packages | Ciigus Software",
    description: "Website and software packages from LKR 35,000. Compare the Starter, Growth and Enterprise packages to find the right fit for your business.",
  },
  "/contact": {
    title: "Contact Us | Ciigus Software",
    description: "Tell us about your project. Email ciigussoftware@gmail.com or WhatsApp 078 261 2328. We typically respond within 24 hours.",
  },
  "/privacy": {
    title: "Privacy Policy | Ciigus Software",
    description: "How Ciigus Software collects, uses and protects the information you send through the contact forms on this website.",
  },
  "/terms": {
    title: "Terms of Service | Ciigus Software",
    description: "The terms that apply to your use of the Ciigus Software website, including pricing information, intellectual property and liability.",
  },
};

export const notFoundMeta = {
  title: "Page Not Found | Ciigus Software",
  description: "The page you're looking for doesn't exist or has moved.",
};

export const techStack = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', invert: true },
  { name: 'ClickUp', logo: '/assets/tech/clickup.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'OpenCV', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
];

export const heroDesc =
  "From ERP & business systems to AI & computer vision and websites & e-commerce, Ciigus builds software for businesses ready to grow.";

export const footerAbout =
  "A Sri Lanka-based software company building ERP & business systems, AI & computer vision, and websites & e-commerce for clients worldwide.";

// The single source for service names: the footer, contact form, Packages
// page and both services sections all read from this list.
// workCategory links "See projects" to /work?category=…; projectsLink overrides it.
export const services = [
  {
    id: "erp-business-systems",
    title: "ERP & Business Systems",
    desc: "Replace spreadsheets and paperwork with one system for projects, stock, payroll and costs, with live dashboards and reports to run on. We've delivered ERP and inventory systems for construction and plywood businesses.",
    features: ["ERP", "Inventory", "Payroll & HR", "Dashboards & reports"],
    proof: "Construction ERP, Plywood Inventory System, LogMaster, Payroll System",
    workCategory: "Business Systems",
    image: "/assets/Services/business-dashboard-analytics-software.webp",
    featured: true,
  },
  {
    id: "ai-computer-vision",
    title: "AI & Computer Vision",
    desc: "Cameras and AI that check what people check by hand: defects on a production line, certificates in a stack, products on a conveyor. Each model is trained on your own images, so it recognises your products, not a demo set.",
    features: ["Quality inspection", "Defect detection", "Document verification", "Image identification"],
    proof: "Plywood Defect Detection, Vaccine Verification, Tea Clone Identification, Cream Bottle Side Identification",
    workCategory: "AI Solutions",
    image: "/assets/Services/ai-computer-vision-quality-inspection.webp",
    featured: true,
  },
  {
    id: "websites-ecommerce",
    title: "Websites & E-commerce",
    desc: "Business websites and online stores with product catalogues, carts, payments and order management you can run yourself.",
    features: ["Online stores", "Product catalogues", "Payments", "Order management"],
    proof: "Greenhouse store, Printer Supplies store, Plywood company website",
    workCategory: "E-commerce & Web",
    image: "/assets/Services/websites-ecommerce-online-store.webp",
  },
  {
    id: "restaurant-hospitality",
    title: "Restaurant & Hospitality Systems",
    desc: "Restaurant websites, QR digital menus you can update anytime, and ordering systems that cut printing costs and keep prices current.",
    features: ["Restaurant websites", "QR digital menus", "Online ordering"],
    proof: "Ella restaurant website + QR menu",
    workCategory: "E-commerce & Web",
    image: "/assets/Services/restaurant-digital-menu-ordering-system.webp",
  },
  {
    id: "seo-search-visibility",
    title: "SEO & Search Visibility",
    desc: "Technical audits, on-page SEO and site structure that lift your Google rankings for the searches your customers actually make.",
    features: ["On-page SEO", "Technical audits", "Google rankings"],
    proof: "Plywood company website + SEO",
    workCategory: "E-commerce & Web",
    image: "/assets/Services/seo-search-visibility-service-sri-lanka.webp",
  },
  {
    id: "mobile-desktop-apps",
    title: "Mobile & Desktop Applications",
    desc: "Android and iOS apps for your customers and staff, and Windows or macOS software for teams that work on their own machines.",
    features: ["Android", "iOS", "Windows", "macOS"],
    image: "/assets/Services/ciigus-mobile-app-development-android-ios.webp",
  },
  {
    id: "branding-content-marketing",
    title: "Branding, Content & Marketing",
    desc: "Brand identities, graphic design, social media campaigns and AI-produced promo videos, so your launch looks as strong as the product behind it.",
    features: ["Brand identity", "Graphic design", "Social media", "AI video"],
    proof: "Ella restaurant branding",
    image: "/assets/Services/branding-content-marketing.webp",
  },
  {
    id: "timber-plywood",
    title: "Industry Solutions: Timber & Plywood",
    desc: "Software for every stage of a timber and plywood business: LogMaster for the log yard, inventory for the factory, AI defect detection on the line, and a website that brings in enquiries.",
    features: ["LogMaster", "Inventory", "Defect detection", "Website + SEO"],
    proof: "LogMaster, Plywood Inventory System, Plywood Defect Detection, Plywood company website",
    projectsLink: "/work#timber-plywood",
    image: "/assets/Services/industry-management-system-software.webp",
    highlight: true,
  },
];

const serviceName = (id) => services.find((s) => s.id === id).title;

export const servicesSection = {
  label: "What We Do",
  titleLines: ["Everything your business", "needs, built right."],
  desc: "ERP and business systems, AI and computer vision, websites and online stores, plus the apps, SEO and branding around them.",
  viewAll: "View all services",
  learnMore: "Learn more",
  pause: "Pause scrolling",
  play: "Resume scrolling",
};
export const journeySteps = [
  { id: 1, emoji: '💡', title: 'Client Idea', desc: 'You bring the vision.' },
  { id: 2, emoji: '🔍', title: 'Discovery & Requirements', desc: 'We learn your goals and map out exactly what to build.' },
  { id: 3, emoji: '🗺️', title: 'Planning', desc: 'Roadmap, architecture, and sprint plan defined.' },
  { id: 4, emoji: '🎨', title: 'Design', desc: 'Wireframes and UI mockups approved by you.' },
  { id: 5, emoji: '💻', title: 'Development', desc: 'Frontend, backend, and APIs built by our team.' },
  { id: 6, emoji: '🧪', title: 'Testing & QA', desc: 'Every feature tested before it ships.' },
  { id: 7, emoji: '🚀', title: 'Deployment', desc: 'Live on production with zero-downtime release.' },
  { id: 8, emoji: '🛠️', title: 'Maintenance & Support', desc: 'We stay with you after launch.' },
];

export const workCategories = ["Business Systems", "E-commerce & Web", "AI Solutions"];

export const workStatuses = {
  completed: "Completed",
  live: "Live",
  "in-development": "In Development",
};

// Each project: category is one of workCategories, status a key of workStatuses.
// tech: list of technologies (the popup's Tech Stack section appears once filled).
// link: live URL (adds a "Visit Live Site" button). image: screenshot path that
// replaces the designed cover, e.g. "/assets/work/logmaster-01-dashboard.webp"
// (optimized WebP only; PNG originals stay out of git).
// featured: shown first in the home page carousel. industry: used for the
// "industries served" count. No client names.
export const workItems = [
  {
    id: "construction-erp",
    industry: "Construction",
    title: "Construction ERP System",
    category: "Business Systems",
    status: "completed",
    desc: "An ERP system for managing construction sites: projects, materials, labour, costs and reporting in one place.",
    tech: [],
    link: "",
    image: "/assets/work/construction-erp-01-dashboard.webp",
    featured: false,
  },
  {
    id: "plywood-inventory",
    industry: "Timber & Plywood",
    title: "Plywood Inventory Management System",
    category: "Business Systems",
    status: "completed",
    desc: "Inventory system for a plywood manufacturer to track raw materials, production stock and sales.",
    tech: [],
    link: "",
    image: "",
    featured: false,
  },
  {
    id: "logmaster",
    industry: "Timber & Plywood",
    title: "LogMaster — Timber Industry Platform",
    category: "Business Systems",
    status: "in-development",
    desc: "A digital management system for Sri Lankan timber and plywood businesses — replacing pen-and-paper with smart workflows for log tracking, supplier management, and billing.",
    tech: [],
    link: "",
    image: "",
    featured: true,
    cta: { label: "Request a demo", message: "Hi, I'm interested in a LogMaster demo." },
  },
  {
    id: "payroll",
    title: "Payroll Management System",
    category: "Business Systems",
    status: "in-development",
    desc: "A payroll platform for Sri Lankan businesses that automates salary, EPF/ETF and APIT calculations.",
    tech: [],
    link: "",
    image: "",
    featured: false,
  },
  {
    id: "greenhouse-ecommerce",
    industry: "Agriculture",
    title: "Greenhouse E-commerce Website",
    category: "E-commerce & Web",
    status: "completed",
    desc: "An online store for a greenhouse business, with product catalogue, cart and order management.",
    tech: [],
    link: "",
    image: "/assets/work/greenhouse-store-01-home.webp",
    featured: false,
  },
  {
    id: "printer-supplies-ecommerce",
    industry: "Retail",
    title: "Printer Supplies E-commerce Website",
    category: "E-commerce & Web",
    status: "completed",
    desc: "An online shop for a printer and printing supplies store, with product categories, search and ordering.",
    tech: [],
    link: "",
    image: "/assets/work/printer-store-01-home.webp",
    featured: false,
  },
  {
    id: "plywood-website-seo",
    industry: "Timber & Plywood",
    title: "Plywood Company Website + SEO",
    category: "E-commerce & Web",
    status: "completed",
    desc: "A company website for a plywood manufacturer, with search engine optimisation to improve Google rankings and bring in enquiries.",
    tech: [],
    link: "",
    image: "/assets/work/plywood-website-01-home.webp",
    featured: false,
  },
  {
    id: "restaurant-ella",
    industry: "Hospitality",
    title: "Restaurant Website + QR Digital Menu — Ella",
    category: "E-commerce & Web",
    status: "live",
    desc: "A restaurant website with branding and a QR-based digital menu that replaces printed menus and can be updated anytime.",
    tech: [],
    link: "",
    image: "/assets/work/restaurant-ella-01-website.webp",
    featured: false,
  },
  {
    id: "ai-vaccine-verification",
    industry: "Healthcare",
    title: "AI Vaccine Verification System",
    category: "AI Solutions",
    status: "completed",
    desc: "An AI-based system that verifies vaccine certificates automatically, reducing manual checking and errors.",
    tech: [],
    link: "",
    image: "/assets/work/vaccine-verification-01-result.webp",
    featured: true,
  },
  {
    id: "plywood-defect-detection",
    industry: "Timber & Plywood",
    title: "AI Plywood Sheet Defect Detection",
    category: "AI Solutions",
    status: "completed",
    desc: "A computer vision system that inspects plywood sheets and detects surface defects such as cracks, knots and holes, helping quality control.",
    tech: [],
    link: "",
    image: "",
    featured: true,
  },
  {
    id: "cream-bottle-side-identification",
    industry: "Manufacturing",
    title: "Cream Bottle Side Identification System",
    category: "AI Solutions",
    status: "completed",
    desc: "A computer vision system that identifies which side of a cream bottle is facing the camera on a production line, for correct labelling and packaging.",
    tech: [],
    link: "",
    image: "/assets/work/cream-bottle-01-detection.webp",
    featured: false,
  },
  {
    id: "tea-clone-identification",
    industry: "Agriculture",
    title: "AI Tea Clone Identification System",
    category: "AI Solutions",
    status: "completed",
    desc: "An AI system that identifies tea plant clone varieties from leaf images, supporting Sri Lanka's tea industry.",
    tech: [],
    link: "",
    image: "",
    featured: true,
  },
];

const deliveredProjects = workItems.filter((p) => p.status !== "in-development");

export const workStats = {
  delivered: deliveredProjects.length,
  aiBuilt: deliveredProjects.filter((p) => p.category === "AI Solutions").length,
  industries: new Set(workItems.map((p) => p.industry).filter(Boolean)).size,
  inDevelopment: workItems.length - deliveredProjects.length,
};

export const stats = [
  { val: String(workStats.delivered), lbl: "Projects Delivered" },
  { val: String(workStats.inDevelopment), lbl: "In Development" },
  { val: "100%", lbl: "Client Focused" },
];

export const workCategorySlugs = {
  "Business Systems": "business-systems",
  "E-commerce & Web": "ecommerce-web",
  "AI Solutions": "ai-solutions",
};

export const workFilterAll = "All";

export const industryFocus = {
  label: "Industry Focus",
  title: "Digital solutions for the timber & plywood industry",
  desc: "From the log yard to Google search, we build software for every stage of a timber and plywood business.",
  items: [
    { projectId: "logmaster", title: "LogMaster platform", desc: "Log tracking, supplier management and billing in one system." },
    { projectId: "plywood-inventory", title: "Inventory management", desc: "Raw materials, production stock and sales, tracked in one place." },
    { projectId: "plywood-defect-detection", title: "AI defect detection", desc: "Computer vision that spots cracks, knots and holes in plywood sheets." },
    { projectId: "plywood-website-seo", title: "Website + SEO", desc: "A company website built to rank on Google and bring in enquiries." },
  ],
  viewLabel: "View project",
  demoLabel: "Request a LogMaster demo",
  contactLabel: "Talk to us",
};

export const servicesPage = {
  hero: {
    label: "Services",
    title: "Software that runs",
    highlight: "real businesses.",
    desc: "ERP systems that replace the paperwork, AI that inspects and verifies, and online stores that sell. Designed, built and supported by one team in Sri Lanka.",
    primaryCta: { label: "Start a Project", to: "/contact" },
    secondaryCta: { label: "See Our Work", to: "/work" },
    indexLabel: "What we build",
  },
  grid: {
    label: "What we do",
    title: "Eight ways we build for your business",
    desc: "Each card shows the projects behind the service. Ask about any of them and we'll tell you how it would work for you.",
  },
  card: { builtFor: "Built for", seeProjects: "See projects", askAbout: "Ask about this", highlightLabel: "Industry focus" },
  spotlight: {
    label: "Industry spotlight",
    title: industryFocus.title,
    desc: industryFocus.desc,
    demoLabel: industryFocus.demoLabel,
    projectsLabel: "See timber projects",
    projectsLink: "/work#timber-plywood",
  },
  process: {
    label: "How we work",
    title: "From first call to long-term support",
    steps: [
      { title: "Discover", desc: "We learn how your business runs today, map the workflows and agree a clear scope, timeline and quote." },
      { title: "Design", desc: "Wireframes and screen designs you can click through and approve before development starts." },
      { title: "Build", desc: "We develop in short sprints with regular demos, then test every feature before launch." },
      { title: "Support", desc: "We launch, train your team and stay on for fixes and improvements as you grow." },
    ],
  },
  why: {
    label: "Why Ciigus",
    title: "Proof, not promises",
    points: [
      { value: workStats.delivered, label: "Projects delivered", desc: "ERP systems, AI tools, websites and online stores." },
      { value: workStats.aiBuilt, label: "AI systems built", desc: "Computer vision for inspection, verification and identification." },
      { value: workStats.industries, label: "Industries served", desc: "Including construction, timber & plywood, tea, healthcare and hospitality." },
      { value: workStats.inDevelopment, label: "Platforms in development", desc: "LogMaster for the timber industry and a Sri Lankan payroll system." },
    ],
  },
  finalCta: {
    title: "Have a process that still runs on paper?",
    desc: "Tell us how it works today and we'll show you what it could look like.",
    primary: { label: "Start a Project", to: "/contact" },
    whatsapp: { label: "Chat on WhatsApp", message: "Hi Ciigus Software, I'd like to discuss a project." },
  },
};

export const roles = [
  "Developers",
  "QA Engineers",
  "Business Analysts",
  "Project Managers",
  "UI/UX Designers",
];

export const values = [
  {
    icon: "🏗️",
    title: "Clean Architecture",
    desc: "We build systems designed to last — scalable, maintainable, and easy to extend as your business grows.",
  },
  {
    icon: "🎨",
    title: "UI/UX Quality",
    desc: "Great software feels as good as it works. We invest in interfaces that users actually enjoy.",
  },
  {
    icon: "⚡",
    title: "Agile Workflows",
    desc: "We ship iteratively, communicate clearly, and adapt fast — keeping clients in the loop every step of the way.",
  },
  {
    icon: "🚀",
    title: "Long-Term Thinking",
    desc: "From commissioned projects today to SaaS platforms tomorrow — we build with the future in mind.",
  },
];

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export const packages = [
  {
    id: "starter",
    name: "Starter Package",
    price: "LKR 35,000–60,000",
    popular: false,
    bestFor: "Small businesses, startups",
    covers: [serviceName("websites-ecommerce"), serviceName("seo-search-visibility")],
    features: [
      "Business website (up to 5 pages)",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form",
      "1 month free support",
    ],
  },
  {
    id: "growth",
    name: "Growth Package",
    price: "LKR 80,000–150,000",
    popular: true,
    bestFor: "Growing businesses",
    covers: [serviceName("websites-ecommerce"), serviceName("mobile-desktop-apps"), serviceName("erp-business-systems")],
    features: [
      "Everything in Starter",
      "Custom web app or mobile app",
      "Admin dashboard",
      "Payment gateway integration",
      "API integrations",
      "3 months free support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    price: "Custom Pricing",
    popular: false,
    bestFor: "Large businesses, complex systems",
    covers: [serviceName("erp-business-systems"), serviceName("timber-plywood")],
    features: [
      "Everything in Growth",
      "Full custom software (ERP, payroll, SaaS)",
      "Dedicated project manager",
      "Multi-phase delivery",
      "6 months support + SLA",
    ],
  },
];

export const packagesNote = `${serviceName("ai-computer-vision")} and ${serviceName("branding-content-marketing")} projects are quoted individually. Tell us what you need and we'll send a proposal.`;

export const packagesFaq = [
  {
    q: "How is pricing determined for a project?",
    a: "Pricing depends on scope — number of pages or screens, custom features, integrations, and timeline. The ranges above cover most projects; we give an exact quote after a short discovery call.",
  },
  {
    q: "Do I need to pay the full amount upfront?",
    a: "No. We typically split payment into milestones — an initial deposit to start, and remaining payments tied to delivery stages.",
  },
  {
    q: "What happens after the free support period ends?",
    a: "You can continue on a maintenance retainer, or reach out on an as-needed basis for paid support and updates.",
  },
  {
    q: "Can I upgrade from Starter to Growth later?",
    a: "Yes — most projects are built to scale. We can extend an existing Starter site into a Growth-tier product without starting over.",
  },
  {
    q: "How long does a typical project take?",
    a: "A Starter site usually takes 1-3 weeks. Growth projects run 4-8 weeks. Enterprise systems are scoped in phases with timelines defined during planning.",
  },
];

export const contact = {
  email: "ciigussoftware@gmail.com",
  whatsapp: "94782612328", // wa.me format: country code + number, no "+", spaces or leading 0
  whatsappDisplay: "078 261 2328",
  location: "Colombo, Sri Lanka",
  responseTime: "We typically respond within 24 hours",
};

export const floatingWhatsApp = {
  message: "Hi Ciigus Software, I'd like to know more about your services.",
  label: "Chat with Ciigus Software on WhatsApp (opens in a new tab)",
  tooltip: "Chat with us on WhatsApp",
};

export const enquiryForm = {
  subject: "New enquiry from Ciigus website",
  fromName: "Ciigus Website",
  submitLabel: "Send Message",
  sendingLabel: "Sending…",
  whatsappLabel: "Send via WhatsApp",
  success: "Thanks! Your message has been sent. We'll get back to you soon.",
  error: "Sorry, your message couldn't be sent. Please try again in a moment.",
  errorFallback: "Or message us on WhatsApp",
  whatsappIntro: "Hi Ciigus!",
  whatsappDefault: "I'd like to talk about a project.",
  validation: {
    name: "Please enter your name.",
    email: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
    message: "Please tell us a little about your project.",
  },
};

export const socialLinks = [
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61560167747196", brand: "#1877F2" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ciigus-software-8362a241b/", brand: "#0A66C2" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/ciigussoftware/", brand: "#bc1888" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

const legalReviewNote =
  "This page is a general template provided for convenience. It is not legal advice and should be reviewed by a qualified professional before you rely on it.";

export const privacyPolicy = {
  label: "Legal",
  title: "Privacy Policy",
  updated: "1 October 2026",
  reviewNote: legalReviewNote,
  intro:
    "Ciigus Software (\"Ciigus\", \"we\", \"us\") is a software development business based in Sri Lanka. This policy explains what information we collect through this website, how we use it, and the choices you have.",
  sections: [
    {
      heading: "Information we collect",
      body: ["When you send us an enquiry through a contact form on this website, we collect the details you enter:"],
      list: [
        "Your name",
        "Your email address",
        "Your phone number (optional)",
        "The service you're interested in (optional)",
        "Your message",
      ],
      after: [
        "If you contact us on WhatsApp or by email instead, we receive the details you choose to share through those services.",
      ],
    },
    {
      heading: "How your enquiry is delivered",
      body: [
        "Contact form submissions are sent through Web3Forms, a third-party form-delivery service, which forwards them by email to our inbox at ciigussoftware@gmail.com (a Google Gmail account). Web3Forms and Google handle your message only to deliver and store it for us, under their own privacy policies.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "We use the information you send only to reply to your enquiry and, if you decide to work with us, to discuss and deliver your project.",
        "We do not add you to marketing lists, and we do not sell, rent or share your personal information with third parties. It passes only through the services needed to deliver your message, described above.",
      ],
    },
    {
      heading: "Cookies and analytics",
      body: [
        "This website does not use analytics or advertising cookies, and it does not track you across other websites.",
        "Like most websites, it loads some resources from third-party providers (for example Google Fonts and the jsDelivr content network), and our hosting provider keeps standard server logs. These providers receive technical information such as your IP address and browser type as part of normal web requests.",
      ],
    },
    {
      heading: "How long we keep your information",
      body: [
        "We keep enquiry emails for as long as we need them to respond to you and to maintain normal business records. You can ask us to delete your enquiry at any time.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask us to access, correct or delete the personal information you have sent us, or to stop contacting you. Email us and we will respond within a reasonable time. Sri Lanka's Personal Data Protection Act, No. 9 of 2022, may give you additional rights.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: ["We may update this policy from time to time. The \"Last updated\" date above shows when it last changed."],
    },
    {
      heading: "Contact us",
      body: ["If you have any questions about this policy or your information, contact us:"],
      showContact: true,
    },
  ],
};

export const termsOfService = {
  label: "Legal",
  title: "Terms of Service",
  updated: "1 October 2026",
  reviewNote: legalReviewNote,
  intro:
    "These terms apply to your use of the Ciigus Software website. By using the website, you agree to them. If you don't agree, please don't use the website.",
  sections: [
    {
      heading: "About this website",
      body: [
        "This website provides information about Ciigus Software and our services. Its content is for general information only and may change without notice.",
      ],
    },
    {
      heading: "Quotes and pricing",
      body: [
        "Package prices and timelines shown on this website are indicative ranges, not binding offers. A project is confirmed only by a written proposal or agreement that sets out its scope, price and timeline.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The website's content, including its text, graphics, logos and design, belongs to Ciigus Software or is used with permission. You may not copy or reuse it for commercial purposes without our written consent. Third-party names and logos, such as technology logos, belong to their respective owners.",
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        "Please don't misuse the website or its contact forms, for example by sending spam, attempting to gain unauthorised access, or interfering with how the website works.",
      ],
    },
    {
      heading: "Third-party links",
      body: [
        "The website links to third-party services such as WhatsApp, Facebook, LinkedIn and Instagram. We are not responsible for their content or practices; their own terms and privacy policies apply.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "We work to keep the website accurate and available, but it is provided \"as is\", without warranties of any kind. To the extent permitted by law, Ciigus Software is not liable for any loss arising from your use of the website or your reliance on its content.",
      ],
    },
    {
      heading: "Privacy",
      body: ["How we handle the information you send us is explained in our Privacy Policy."],
      links: [{ label: "Read the Privacy Policy", to: "/privacy" }],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of Sri Lanka, and any disputes are subject to the jurisdiction of the courts of Sri Lanka.",
      ],
    },
    {
      heading: "Changes to these terms",
      body: ["We may update these terms from time to time. The \"Last updated\" date above shows when they last changed."],
    },
    {
      heading: "Contact us",
      body: ["If you have any questions about these terms, contact us:"],
      showContact: true,
    },
  ],
};

export const footerServiceLinks = services.map((s) => ({ label: s.title, to: `/services#${s.id}` }));

export const footerCompanyLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Packages", to: "/packages" },
  { label: "Contact", to: "/contact" },
];

export const contactServices = [...services.map((s) => s.title), "Other"];

export const contactNextSteps = [
  { step: 1, title: "We review your message" },
  { step: 2, title: "We schedule a discovery call" },
  { step: 3, title: "We send a proposal" },
];

export const notFound = {
  label: "Error 404",
  title: "This page took a wrong turn.",
  desc: "The page you're looking for doesn't exist or has moved. Try one of these instead:",
  primaryCta: { label: "Back to Home", to: "/" },
  secondaryCta: { label: "Contact Us", to: "/contact" },
};

export const officeHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM (Sri Lanka Time)" },
  { day: "Saturday", hours: "10:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];
