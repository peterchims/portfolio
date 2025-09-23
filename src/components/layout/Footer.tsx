import React from 'react';
import { socialLinks, quickLinks } from '../data/Data';

import CustomText from '../ui/CustomText';
import {
  Clock,
  Code2,
  FolderOpen,
  Globe,
  Heart,
  Home,
  Mail,
  Shield,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { Logo } from '../../assets';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={Logo}
                alt="Peter4tech Portfolio"
                className="w-32 h-32 mb-4 filter invert sepia hue-rotate-90 rounded-lg border-2 border-gray-700 p-2"
              />
              <CustomText
                variant="h5"
                font="roboto"
                weight="bold"
                color="white"
                className="mb-2"
              >
                Peter4tech
              </CustomText>
              <CustomText
                variant="caption"
                color="lime-400"
                weight="medium"
                className="italic"
              >
                Full Stack Developer
              </CustomText>
            </div>

            <CustomText
              variant="body"
              color="white"
              className="text-gray-300 leading-7 text-center"
            >
              Crafting digital excellence through innovative solutions.
              Passionate about building scalable applications that drive
              business growth and user satisfaction.
            </CustomText>

            <div className="flex justify-center space-x-3 pt-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 hover:bg-lime-500 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <CustomText
              variant="h5"
              font="roboto"
              weight="semibold"
              color="white"
              className="border-b border-gray-700 pb-3"
            >
              Quick Links
            </CustomText>
            <nav className="space-y-3">
              {quickLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center text-gray-300 hover:text-lime-400 transition-all
               duration-300 gap-4 p-3 rounded-lg hover:bg-gray-800 group"
                >
                  <span
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center
               group-hover:bg-lime-500 transition-colors duration-300"
                  >
                    {link.name === 'Home' && <Home className="w-5 h-5" />}
                    {link.name === 'About' && <User className="w-5 h-5" />}
                    {link.name === 'Skills' && <Code2 className="w-5 h-5" />}
                    {link.name === 'Projects' && (
                      <FolderOpen className="w-5 h-5" />
                    )}
                    {link.name === 'Contact' && <Mail className="w-5 h-5" />}
                  </span>
                  <CustomText
                    variant="body"
                    weight="medium"
                    className="group-hover:text-lime-400 "
                  >
                    {link.name}
                  </CustomText>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <CustomText
              variant="h5"
              font="roboto"
              weight="semibold"
              color="white"
              className="border-b border-gray-700 pb-3"
            >
              Get In Touch
            </CustomText>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-800/50">
                <Mail className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
                <div>
                  <CustomText variant="body" weight="medium" color="white">
                    Email
                  </CustomText>
                  <CustomText
                    variant="caption"
                    color="lime-400"
                    className="break-all"
                  >
                    peter4tech@gmail.com
                  </CustomText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-800/50">
                <Clock className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
                <div>
                  <CustomText variant="body" weight="medium" color="white">
                    Response Time
                  </CustomText>
                  <CustomText variant="caption" color="gray-300">
                    Within 24 hours
                  </CustomText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-800/50">
                <Globe className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
                <div>
                  <CustomText variant="body" weight="medium" color="white">
                    Location
                  </CustomText>
                  <CustomText variant="caption" color="gray-300">
                    Available Worldwide
                  </CustomText>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Status */}
          <div className="space-y-6">
            <CustomText
              variant="h5"
              font="roboto"
              weight="semibold"
              color="white"
              className="border-b border-gray-700 pb-3"
            >
              Professional Status
            </CustomText>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-lime-500 rounded-full animate-pulse"></div>
                  <CustomText variant="body" weight="bold" color="white">
                    Currently Available
                  </CustomText>
                </div>
                <CustomText variant="caption" color="gray-300">
                  Open for new projects and collaborations. Let's discuss how we
                  can work together.
                </CustomText>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <Zap className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                  <CustomText variant="caption" weight="medium" color="white">
                    Fast Delivery
                  </CustomText>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <Shield className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                  <CustomText variant="caption" weight="medium" color="white">
                    Quality Code
                  </CustomText>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <Users className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                  <CustomText variant="caption" weight="medium" color="white">
                    Team Player
                  </CustomText>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <TrendingUp className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                  <CustomText variant="caption" weight="medium" color="white">
                    Results Driven
                  </CustomText>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <CustomText
                variant="body"
                weight="medium"
                color="white"
                className="mb-2"
              >
                Peter4tech Professional Services
              </CustomText>
              <CustomText variant="caption" color="gray-400">
                © {new Date().getFullYear()} All rights reserved. | Crafting
                digital excellence since 2023
              </CustomText>
            </div>

            <div className="flex items-center space-x-3">
              <CustomText variant="caption" color="gray-400">
                Built with passion
              </CustomText>
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
              <CustomText variant="caption" color="gray-400">
                and expertise
              </CustomText>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
