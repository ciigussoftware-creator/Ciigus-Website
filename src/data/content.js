/* ═══════════════════════════════════════════════
   CIIGUS — content.js
   All editable website content lives here.
   Change text, add services / work / values etc.
═══════════════════════════════════════════════ */

export const stats = [
  { val: "2+", lbl: "Products Shipped" },
  { val: "3+", lbl: "Active Projects" },
  { val: "100%", lbl: "Client Focused" },
];

export const marqueeItems = [
  "Web Development",
  "Mobile Apps",
  "SaaS Products",
  "Restaurant Systems",
  "Business Software",
  "Dashboard Systems",
  "Payroll Solutions",
  "Industry Management",
  "Digital Marketing",
  "SEO & Search Visibility",
  "Graphic Design",
  "AI Video Creation",
  "Desktop Applications",
];

export const services = [
  {
    icon: "🌐",
    title: "Web Development",
    desc: "Business websites, promotional pages, booking systems, and fully custom web platforms built for speed and reliability.",
    image: "/assets/Services/ciigus-web-development-sri-lanka.webp",
  },
  {
    icon: "📱",
    title: "Mobile Applications",
    desc: "Android and iOS apps designed for real users — with smooth experiences that drive engagement and retention.",
    image: "/assets/Services/ciigus-mobile-app-development-android-ios.webp",
  },
  {
    icon: "🍽️",
    title: "Restaurant Systems",
    desc: "Digital menus, restaurant websites, and ordering systems that modernize how hospitality businesses operate.",
    image: "/assets/Services/restaurant-digital-menu-ordering-system.webp",
  },
  {
    icon: "📊",
    title: "Dashboard & Analytics",
    desc: "Business dashboards and data visualization tools that give teams the visibility they need to make smart decisions.",
    image: "/assets/Services/business-dashboard-analytics-software.webp",
  },
  {
    icon: "🏭",
    title: "Industry Management",
    desc: "Custom management systems built for specific industries — replacing manual workflows with clean, digital operations.",
    image: "/assets/Services/industry-management-system-software.webp",
  },
  {
    icon: "⚙️",
    title: "Custom Business Software",
    desc: "Payroll systems, HR tools, inventory management, and bespoke software tailored to your exact business needs.",
    image: "/assets/Services/custom-business-software-payroll-hr.webp",
  },
  {
    icon: "🔍",
    title: "SEO & Search Visibility",
    desc: "On-page SEO, technical audits, and content strategies that get your business ranking higher and found by the right people.",
    image: "/assets/Services/seo-search-visibility-service-sri-lanka.webp",
  },
  {
    icon: "📣",
    title: "Digital Marketing",
    desc: "Social media campaigns, ad management, and growth strategies that turn online attention into real business results.",
    image: "/assets/Services/digital-marketing-social-media-campaigns.webp",
  },
  {
    icon: "🖥️",
    title: "Desktop Applications",
    desc: "Cross-platform desktop software for Windows and macOS — built for businesses that need powerful tools running locally.",
    image: "/assets/Services/desktop-application-development-windows-mac.webp",
  },
  {
    icon: "🎨",
    title: "Graphic Design",
    desc: "Brand identities, marketing materials, UI assets, and visual content that make your business look as good as it works.",
    image: "/assets/Services/graphic-design-branding-ui-assets.webp",
  },
  {
    icon: "🎬",
    title: "AI Video Creation",
    desc: "Promotional videos, product demos, and social content produced with AI tools — fast, affordable, and visually compelling.",
    image: "/assets/Services/ai-video-creation-promotional-content.webp",
  },
];
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

export const workItems = [
  {
    variant: "blue",
    emoji: "🏔️",
    tag: "Hospitality",
    title: "Restaurant Website — Ella, Sri Lanka",
    desc: "A full restaurant website with online presence, branding, and digital menu system for a client in Ella.",
    status: "done",
    statusLabel: "Completed & Live",
  },
  {
    variant: "blue",
    emoji: "📋",
    tag: "Hospitality",
    title: "Digital Menu System",
    desc: "A QR-based digital menu system for the same Ella restaurant — replacing printed menus with a modern, updatable interface.",
    status: "done",
    statusLabel: "Completed & Live",
  },
  {
    variant: "green",
    emoji: "🪵",
    tag: "Industry · SaaS",
    title: "LogMaster — Timber Industry Platform",
    desc: "A digital management system for Sri Lankan timber and plywood businesses — replacing pen-and-paper with smart workflows for log tracking, supplier management, and billing.",
    status: "active",
    statusLabel: "In Development",
  },
  {
    variant: "purple",
    emoji: "💰",
    tag: "HR & Finance",
    title: "Payroll Management System",
    desc: "A modern payroll platform that automates salary computation, deductions, and reporting for businesses of all sizes.",
    status: "active",
    statusLabel: "In Development",
  },
];

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
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Contact details — update with your real info
export const contact = {
  email: "ciigussoftware@gmail.com",
  whatsapp: "+94782612328", // international format, no + or spaces
};
