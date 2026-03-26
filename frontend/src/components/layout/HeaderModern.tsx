import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HeaderModern() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['Projects', 'Skills', 'Blog', 'Contact'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md">
      <div className="glass-card rounded-none border-b">
        <nav className="container flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold bg-gradient-to-r from-accent-1 to-accent-2 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {'<Dev />'}
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-text-secondary hover:text-accent-1 transition-colors font-medium"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="hidden md:block btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-accent-1" />
            ) : (
              <Menu className="w-6 h-6 text-text-secondary" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 },
          }}
        >
          <div className="px-6 py-6 space-y-4 border-t border-glass-border">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-text-secondary hover:text-accent-1 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
            <motion.button
              className="w-full btn btn-primary"
              whileHover={{ scale: 1.02 }}
            >
              Let's Talk
            </motion.button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
