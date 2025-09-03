import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import CustomText from '../ui/CustomText';
import { Logo } from '../../assets';
import { socialLinks, navigation } from '../data/Data';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20'
              : 'bg-transparent'
          }
        `}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer">
              <img
                src={Logo}
                alt="Peter4Tech Logo"
                className="h-16 md:h-20 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-lime-500 transition-colors duration-300 relative group"
                >
                  <CustomText variant="body" weight="medium">
                    {item.name}
                  </CustomText>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Social Links & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-lime-500 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <CustomButton
                variant="primary"
                size="sm"
                onClick={() => setIsHireModalOpen(true)}
              >
                Hire Me
              </CustomButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/20 shadow-lg">
              <nav className="p-4 space-y-4">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-lime-500 transition-colors duration-300"
                  >
                    <CustomText variant="body" weight="medium">
                      {item.name}
                    </CustomText>
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {socialLinks.map(social => (
                        <a
                          key={social.label}
                          href={social.href}
                          className="text-gray-600 hover:text-lime-500 transition-colors duration-300"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                    <CustomButton
                      variant="primary"
                      size="sm"
                      onClick={() => setIsHireModalOpen(true)}
                    >
                      Hire Me
                    </CustomButton>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hire Me Modal */}
      <AnimatePresence>
        {isHireModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsHireModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-80">
                <h2 className="text-xl font-semibold text-center mb-4">
                  Hire Me For
                </h2>

                <div className="flex flex-col gap-3">
                  <CustomButton
                    variant="secondary"
                    onClick={() => alert('Onsite role selected')}
                  >
                    Onsite Roles
                  </CustomButton>
                  <CustomButton
                    variant="secondary"
                    onClick={() => alert('Contract role selected')}
                  >
                    Contract Roles
                  </CustomButton>
                  <CustomButton
                    variant="secondary"
                    onClick={() => alert('Remote role selected')}
                  >
                    Remote Roles
                  </CustomButton>
                </div>

                <button
                  className="mt-5 w-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setIsHireModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
