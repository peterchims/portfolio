import { motion } from 'framer-motion';
import { GlassCard, StaggerContainer, StaggerItem } from '../common/Animations';

const skillData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React & TypeScript', proficiency: 95 },
      { name: 'Tailwind CSS', proficiency: 95 },
      { name: 'Framer Motion', proficiency: 90 },
      { name: 'Next.js', proficiency: 88 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: '.NET Core', proficiency: 92 },
      { name: 'Node.js', proficiency: 88 },
      { name: 'PostgreSQL', proficiency: 90 },
      { name: 'API Design', proficiency: 92 },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Docker & Kubernetes', proficiency: 85 },
      { name: 'Git & CI/CD', proficiency: 92 },
      { name: 'AWS & Azure', proficiency: 80 },
      { name: 'Linux', proficiency: 88 },
    ],
  },
];

export default function SkillsModern() {
  return (
    <section id="skills" className="py-20">
      <div className="container">
        <StaggerContainer>
          <motion.div className="text-center mb-16">
            <h2>Professional Skills</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              A comprehensive toolkit built through years of practical experience
            </p>
          </motion.div>

          <div className="grid grid-3 gap-8">
            {skillData.map((skillGroup, groupIndex) => (
              <GlassCard key={skillGroup.category} delay={groupIndex * 0.1}>
                <h3 className="text-2xl font-bold mb-8 text-accent-1">{skillGroup.category}</h3>
                
                <div className="space-y-6">
                  {skillGroup.skills.map((skill) => (
                    <StaggerItem key={skill.name}>
                      <div>
                        <div className="flex justify-between mb-3">
                          <span className="font-semibold text-text-primary">{skill.name}</span>
                          <span className="text-accent-1 font-bold">{skill.proficiency}%</span>
                        </div>
                        
                        <div className="w-full h-3 bg-primary-lighter rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-accent-1 to-accent-2"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
