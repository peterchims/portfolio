import { motion } from 'framer-motion';
import { GlassCard, StaggerContainer } from '../common/Animations';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechCorp',
    content: 'Outstanding technical expertise combined with exceptional attention to detail. Delivered a scalable solution ahead of schedule.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'CEO',
    company: 'InnovateLabs',
    content: 'A true professional. Transformed our vision into reality with clean code and innovative solutions.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Design Director',
    company: 'CreativeStudio',
    content: 'Perfect collaboration between design and development. Every interaction was smooth and intuitive.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
  },
];

export default function TestimonialsModern() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <StaggerContainer>
          <motion.div className="text-center mb-16">
            <h2>What People Say</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Real feedback from clients and collaborators
            </p>
          </motion.div>

          <div className="grid grid-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={testimonial.id} delay={index * 0.15}>
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-accent-1 opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed">{testimonial.content}</p>

                <div className="flex items-center gap-4">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <p className="font-bold text-text-primary">{testimonial.name}</p>
                    <p className="text-sm text-text-muted">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
