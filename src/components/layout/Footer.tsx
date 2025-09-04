import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

import CustomText from '../ui/CustomText';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <CustomText
              variant="h4"
              font="roboto"
              weight="bold"
              color="gradient"
            >
              Portfolio
            </CustomText>
            <CustomText
              variant="body"
              color="white"
              className="text-gray-200 leading-7"
            >
              Building digital experiences that matter. Passionate about
              creating innovative solutions and helping businesses grow through
              technology.
            </CustomText>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-lime-500 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <CustomText
              variant="h6"
              font="roboto"
              weight="semibold"
              color="white"
            >
              Quick Links
            </CustomText>
            <nav className="space-y-2">
              {quickLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  color="muted"
                  className="block text-red-900 hover:text-lime-400
                   transition-colors duration-300"
                >
                  <CustomText color="muted" variant="body">
                    {link.name}
                  </CustomText>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <CustomText
              variant="h6"
              font="roboto"
              weight="semibold"
              color="white"
            >
              Let's Connect
            </CustomText>
            <div className="space-y-3 text-gray-400">
              <div>
                <CustomText variant="caption" color="muted">
                  Open to new opportunities and exciting projects.
                </CustomText>
              </div>
              <div>
                <CustomText variant="caption" weight="medium" color="muted">
                  peter4tech@gmail.com
                </CustomText>
              </div>
              <div>
                <CustomText variant="caption" color="muted">
                  Available for freelance and full-time positions.
                </CustomText>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <CustomText
              variant="caption"
              color="white"
              className="text-gray-200"
            >
              © 2025 Your Name. All rights reserved.
            </CustomText>

            <div className="flex items-center space-x-2 text-gray-200">
              <CustomText variant="caption" color="muted">
                Made with
              </CustomText>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <CustomText variant="caption" color="muted">
                and lots of coffee
              </CustomText>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
