/* ═══════════════════════════════════════════════
   CIIGUS — content.js
   All editable website content lives here.
   Change text, add services / work / values etc.
═══════════════════════════════════════════════ */

export const stats = [
  { val: '2+',   lbl: 'Products Shipped' },
  { val: '3+',   lbl: 'Active Projects' },
  { val: '100%', lbl: 'Client Focused' },
]

export const marqueeItems = [
  'Web Development',
  'Mobile Apps',
  'SaaS Products',
  'Restaurant Systems',
  'Business Software',
  'Dashboard Systems',
  'Payroll Solutions',
  'Industry Management',
]

export const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    desc: 'Business websites, promotional pages, booking systems, and fully custom web platforms built for speed and reliability.',
  },
  {
    icon: '📱',
    title: 'Mobile Applications',
    desc: 'Android and iOS apps designed for real users — with smooth experiences that drive engagement and retention.',
  },
  {
    icon: '🍽️',
    title: 'Restaurant Systems',
    desc: 'Digital menus, restaurant websites, and ordering systems that modernize how hospitality businesses operate.',
  },
  {
    icon: '📊',
    title: 'Dashboard & Analytics',
    desc: 'Business dashboards and data visualization tools that give teams the visibility they need to make smart decisions.',
  },
  {
    icon: '🏭',
    title: 'Industry Management',
    desc: 'Custom management systems built for specific industries — replacing manual workflows with clean, digital operations.',
  },
  {
    icon: '⚙️',
    title: 'Custom Business Software',
    desc: 'Payroll systems, HR tools, inventory management, and bespoke software tailored to your exact business needs.',
  },
]

export const processSteps = [
  {
    num: '01',
    title: 'Understand Your Business',
    desc: 'We start by learning your goals, operations, and pain points — so we build what you actually need, not just what looks good.',
  },
  {
    num: '02',
    title: 'Plan & Architect',
    desc: 'We define scope, design the system architecture, and create a roadmap — balancing speed with long-term scalability.',
  },
  {
    num: '03',
    title: 'Design & Build',
    desc: 'UI/UX design, frontend, backend, APIs, and QA — all handled by one focused team following professional engineering practices.',
  },
  {
    num: '04',
    title: 'Launch & Support',
    desc: 'We deploy, monitor, and stay with you after launch — fixing issues, adding features, and helping your product grow.',
  },
]

export const workItems = [
  {
    variant: 'blue',
    emoji: '🏔️',
    tag: 'Hospitality',
    title: 'Restaurant Website — Ella, Sri Lanka',
    desc: 'A full restaurant website with online presence, branding, and digital menu system for a client in Ella.',
    status: 'done',
    statusLabel: 'Completed & Live',
  },
  {
    variant: 'blue',
    emoji: '📋',
    tag: 'Hospitality',
    title: 'Digital Menu System',
    desc: 'A QR-based digital menu system for the same Ella restaurant — replacing printed menus with a modern, updatable interface.',
    status: 'done',
    statusLabel: 'Completed & Live',
  },
  {
    variant: 'green',
    emoji: '🪵',
    tag: 'Industry · SaaS',
    title: 'LogMaster — Timber Industry Platform',
    desc: 'A digital management system for Sri Lankan timber and plywood businesses — replacing pen-and-paper with smart workflows for log tracking, supplier management, and billing.',
    status: 'active',
    statusLabel: 'In Development',
  },
  {
    variant: 'purple',
    emoji: '💰',
    tag: 'HR & Finance',
    title: 'Payroll Management System',
    desc: 'A modern payroll platform that automates salary computation, deductions, and reporting for businesses of all sizes.',
    status: 'active',
    statusLabel: 'In Development',
  },
]

export const roles = [
  'Developers',
  'QA Engineers',
  'Business Analysts',
  'Project Managers',
  'UI/UX Designers',
]

export const values = [
  {
    icon: '🏗️',
    title: 'Clean Architecture',
    desc: 'We build systems designed to last — scalable, maintainable, and easy to extend as your business grows.',
  },
  {
    icon: '🎨',
    title: 'UI/UX Quality',
    desc: 'Great software feels as good as it works. We invest in interfaces that users actually enjoy.',
  },
  {
    icon: '⚡',
    title: 'Agile Workflows',
    desc: 'We ship iteratively, communicate clearly, and adapt fast — keeping clients in the loop every step of the way.',
  },
  {
    icon: '🚀',
    title: 'Long-Term Thinking',
    desc: 'From commissioned projects today to SaaS platforms tomorrow — we build with the future in mind.',
  },
]

export const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#work',     label: 'Work' },
  { href: '#about',    label: 'About' },
  { href: '#contact',  label: 'Contact' },
]

// Contact details — update with your real info
export const contact = {
  email: 'hello@ciigus.com',
  whatsapp: '94000000000', // international format, no + or spaces
}
