import {
  Mail,
  Phone,
  MapPin,
  User,
  Award,
  Target,
  Heart,
  Github,
  Linkedin,
  Code2,
  Database,
  Palette,
  Server,
  Smartphone,
  Globe,
} from 'lucide-react';

export const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'peter4tech@gmail.com',
    href: 'mailto:peter4tech@gmail.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+234 8086392101',
    href: 'tel:+2348086392101',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Lagos, Nigeria',
    href: '#',
  },
];
export const highlights = [
  {
    icon: User,
    title: 'Professional',
    description:
      'Dedicated to delivering high-quality solutions with attention to detail.',
  },
  {
    icon: Award,
    title: 'Experienced',
    description: 'Proven track record in building scalable web applications.',
  },
  {
    icon: Target,
    title: 'Goal-Oriented',
    description:
      'Focused on achieving project objectives and exceeding expectations.',
  },
  {
    icon: Heart,
    title: 'Passionate',
    description:
      'Love for clean code, innovative solutions, and continuous learning.',
  },
];
export const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/peterchims',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/peter-ogba-970a0615b/',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=peter4tech@gmail.com&su=Portfolio%20Contact&body=Hello%20Peter%2C%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%2C',
    label: 'Email',
  },
];
export const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend Development',
    color: 'from-blue-400 to-blue-600',
    skills: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'Vue.js',
      'Angular',
    ],
  },
  {
    icon: Server,
    title: 'Backend Development',
    color: 'from-green-400 to-green-600',
    skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'REST APIs'],
  },
  {
    icon: Database,
    title: 'Database & Cloud',
    color: 'from-purple-400 to-purple-600',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    icon: Palette,
    title: 'Design & UX',
    color: 'from-pink-400 to-pink-600',
    skills: [
      'Figma',
      'Adobe XD',
      'Photoshop',
      'UI Design',
      'UX Research',
      'Prototyping',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    color: 'from-orange-400 to-orange-600',
    skills: [
      'React Native',
      'Flutter',
      'iOS',
      'Android',
      'Progressive Web Apps',
      'Responsive Design',
    ],
  },
  {
    icon: Globe,
    title: 'DevOps & Tools',
    color: 'from-teal-400 to-teal-600',
    skills: ['Git', 'CI/CD', 'Jenkins', 'Terraform', 'Monitoring', 'Testing'],
  },
];
export const additionalTechnologies = [
  'JavaScript',
  'Python',
  'Go',
  'Rust',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'GCP',
  'Vercel',
  'Figma',
  'Adobe Creative Suite',
  'Git',
  'Linux',
  'Nginx',
  'GraphQL',
];
export const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image:
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'Web Application',
    date: '2024',
    featured: true,
  },
  {
    title: 'Task Management App',
    description:
      'Collaborative project management tool with real-time updates, team collaboration, and progress tracking.',
    image:
      'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'TypeScript', 'Socket.io', 'MongoDB'],
    category: 'SaaS',
    date: '2024',
    featured: true,
  },
  {
    title: 'Weather Analytics Dashboard',
    description:
      'Real-time weather data visualization with predictive analytics and interactive charts.',
    image:
      'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Vue.js', 'Python', 'FastAPI', 'Chart.js'],
    category: 'Data Visualization',
    date: '2023',
    featured: false,
  },
  {
    title: 'Social Media App',
    description:
      'Mobile-first social platform with real-time messaging, media sharing, and social features.',
    image:
      'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    category: 'Mobile App',
    date: '2023',
    featured: false,
  },
  {
    title: 'AI-Powered Blog',
    description:
      'Content management system with AI-assisted writing, SEO optimization, and analytics.',
    image:
      'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Next.js', 'OpenAI API', 'Prisma', 'Tailwind'],
    category: 'AI/ML',
    date: '2024',
    featured: false,
  },
  {
    title: 'Crypto Trading Bot',
    description:
      'Automated trading system with machine learning algorithms and risk management.',
    image:
      'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker'],
    category: 'FinTech',
    date: '2023',
    featured: false,
  },
];
