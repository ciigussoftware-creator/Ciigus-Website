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
    description: "Ciigus Software builds websites, mobile apps, dashboards and custom business software for growing businesses in Sri Lanka and worldwide.",
  },
  "/services": {
    title: "Software Development Services | Ciigus Software",
    description: "Web and mobile apps, restaurant systems, dashboards, industry and business software, plus SEO, digital marketing, graphic design and AI video.",
  },
  "/work": {
    title: "Our Work & Projects | Ciigus Software",
    description: "Restaurant websites, a digital menu system, LogMaster for the timber industry and a payroll platform: what Ciigus Software has built and is building.",
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
    features: [
      "Everything in Growth",
      "Full custom software (ERP, payroll, SaaS)",
      "Dedicated project manager",
      "Multi-phase delivery",
      "6 months support + SLA",
    ],
  },
];

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

export const footerServiceLinks = [
  { label: "Web Development", to: "/services" },
  { label: "Mobile Applications", to: "/services" },
  { label: "Custom Business Software", to: "/services" },
  { label: "Dashboard & Analytics", to: "/services" },
  { label: "SEO & Search Visibility", to: "/services" },
  { label: "Graphic Design", to: "/services" },
];

export const footerCompanyLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Packages", to: "/packages" },
  { label: "Contact", to: "/contact" },
];

export const contactServices = [
  "Web Development",
  "Mobile App",
  "Custom Software",
  "Restaurant System",
  "Dashboard & Analytics",
  "SEO & Marketing",
  "Graphic Design",
  "Other",
];

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
