import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function FooterModern() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Navigation', links: ['Home', 'Projects', 'Blog', 'Contact'] },
    { title: 'Resources', links: ['Resume', 'GitHub', 'LinkedIn', 'Email'] },
  ];

  const socialLinks = [
    { icon: Github, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Mail, href: '#' },
  ];

  return (
    <footer className="border-t border-glass-border bg-gradient-to-t from-primary-light to-transparent">
      <div className="container py-16">
        <motion.div
          className="grid md:grid-cols-4 gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-accent-1 mb-4">{'<Dev />'}</h3>
            <p className="text-text-secondary">
              Building beautiful, performant web experiences
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-text-primary mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-text-secondary hover:text-accent-1 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="p-2 glass-card rounded-lg hover:border-accent-1"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5 text-text-secondary hover:text-accent-1 transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center text-text-muted text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Premium Portfolio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent-1 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-accent-1 transition-colors">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
