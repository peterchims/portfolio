import { motion } from 'framer-motion';
import { GlassCard, StaggerContainer } from '../common/Animations';
import { ExternalLink, Github, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Premium SaaS Platform',
    description: 'High-performance web application with real-time collaboration features',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db6d?w=600&h=400&fit=crop',
    technologies: ['React', '.NET Core', 'PostgreSQL', 'WebSocket'],
    liveUrl: '#',
    sourceUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'Mobile-First E-Commerce',
    description: 'Responsive shopping platform with advanced filtering and checkout',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    featured: true,
  },
  {
    id: '3',
    title: 'Data Analytics Dashboard',
    description: 'Real-time analytics with interactive data visualizations',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    technologies: ['React', 'D3.js', '.NET Core'],
    featured: false,
  },
];

export default function ProjectsModern() {
  return (
    <section id="projects" className="py-20">
      <div className="container">
        <StaggerContainer>
          <motion.div className="text-center mb-16">
            <h2>Featured Projects</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Crafted with precision, built with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-3 gap-8">
            {projects.map((project, index) => (
              <GlassCard key={project.id} delay={index * 0.1}>
                <div className="relative mb-6 overflow-hidden rounded-lg h-64">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-accent-1 rounded-lg flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-secondary mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-primary-lighter rounded-full text-sm text-accent-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      className="flex items-center gap-2 px-4 py-2 bg-accent-1 text-primary rounded-lg font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                  {project.sourceUrl && (
                    <motion.a
                      href={project.sourceUrl}
                      className="flex items-center gap-2 px-4 py-2 border border-accent-1 text-accent-1 rounded-lg font-semibold"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Code <Github className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
