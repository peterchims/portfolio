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
