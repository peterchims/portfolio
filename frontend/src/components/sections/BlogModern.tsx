import { motion } from 'framer-motion';
import { StaggerContainer } from '../common/Animations';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable Applications with .NET Core',
    excerpt: 'Learn best practices for architecting large-scale applications using modern .NET Core patterns.',
    category: 'Backend',
    date: 'Mar 20, 2024',
    readTime: '8 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Advanced React Patterns and Performance Optimization',
    excerpt: 'Explore optimization techniques and design patterns that take your React applications to the next level.',
    category: 'Frontend',
    date: 'Mar 15, 2024',
    readTime: '6 min',
    featured: true,
  },
  {
    id: 3,
    title: 'Creating Stunning Glass Morphism UI Effects',
    excerpt: 'Master modern glass morphism design with CSS and JavaScript for visually striking interfaces.',
    category: 'Design',
    date: 'Mar 10, 2024',
    readTime: '5 min',
    featured: false,
  },
];

export default function BlogModern() {
  return (
    <section id="blog" className="py-20">
      <div className="container">
        <StaggerContainer>
          <motion.div className="text-center mb-16">
            <h2>Latest Insights</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Technical deep-dives and design explorations
            </p>
          </motion.div>

          <div className="grid grid-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={`#blog/${post.id}`}
                className="glass-card group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.category === 'Frontend'
                        ? 'bg-accent-1/20 text-accent-1'
                        : post.category === 'Backend'
                        ? 'bg-accent-2/20 text-accent-2'
                        : 'bg-accent-3/20 text-accent-3'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {post.category}
                  </motion.span>
                  {post.featured && <span className="text-accent-1 text-lg">⭐</span>}
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-1 transition-colors">
                  {post.title}
                </h3>

                <p className="text-text-secondary mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{post.date}</span>
                  <span>{post.readTime} read</span>
                </div>

                <motion.div
                  className="mt-4 flex items-center gap-2 text-accent-1 group-hover:translate-x-2 transition-transform"
                  whileHover={{ x: 5 }}
                >
                  Read more <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <motion.a
              href="#blog-archive"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Articles <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
