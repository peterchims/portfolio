import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import CustomText from '../ui/CustomText';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <CustomText 
              variant="h4" 
              font="roboto" 
              weight="bold" 
              color="gradient"
              className="cursor-pointer"
            >
              Portfolio
            </CustomText>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
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
              {socialLinks.map((social) => (
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
            <CustomButton variant="primary" size="sm">
              Hire Me
            </CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/20 shadow-lg">
            <nav className="p-4 space-y-4">
              {navigation.map((item) => (
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
                    {socialLinks.map((social) => (
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
                  <CustomButton variant="primary" size="sm">
                    Hire Me
                  </CustomButton>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;