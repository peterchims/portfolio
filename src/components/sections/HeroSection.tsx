import React from 'react';
import { Download, ArrowRight, Code, Briefcase } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import CustomText from '../ui/CustomText';

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl floating"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl floating"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-300/5 rounded-full blur-3xl floating"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <CustomText
                variant="overline"
                font="roboto"
                weight="semibold"
                color="accent"
                animated
                delay={1}
              >
                Frontend Developer
              </CustomText>

              <CustomText
                variant="h1"
                font="roboto"
                weight="bold"
                color="primary"
                animated
                delay={2}
                className="text-balance"
              >
                Building Digital
                <span className="gradient-text block">Experiences</span>
                That Matter
              </CustomText>

              <CustomText
                variant="body"
                font="raleway"
                color="secondary"
                animated
                delay={3}
                className="max-w-xl text-balance leading-7"
              >
                Passionate full-stack developer with expertise in modern web
                technologies. I create scalable, user-centric applications that
                solve real-world problems and deliver exceptional user
                experiences.
              </CustomText>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 fade-in-up stagger-4">
              <div className="text-center">
                <CustomText
                  variant="h3"
                  font="roboto"
                  weight="bold"
                  color="gradient"
                >
                  50+
                </CustomText>
                <CustomText variant="caption" color="muted">
                  Projects Completed
                </CustomText>
              </div>
              <div className="text-center">
                <CustomText
                  variant="h3"
                  font="roboto"
                  weight="bold"
                  color="gradient"
                >
                  3+
                </CustomText>
                <CustomText variant="caption" color="muted">
                  Years Experience
                </CustomText>
              </div>
              <div className="text-center">
                <CustomText
                  variant="h3"
                  font="roboto"
                  weight="bold"
                  color="gradient"
                >
                  100%
                </CustomText>
                <CustomText variant="caption" color="muted">
                  Client Satisfaction
                </CustomText>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 fade-in-up stagger-5">
              <CustomButton
                variant="primary"
                size="lg"
                icon={Briefcase}
                className="group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </CustomButton>

              <CustomButton variant="outline" size="lg" icon={Download}>
                Download CV
              </CustomButton>
            </div>

            {/* Tech Stack Preview */}
            <div className="fade-in-up stagger-5">
              <CustomText variant="caption" color="muted" className="mb-3">
                Technologies I work with:
              </CustomText>
              <div className="flex flex-wrap gap-2">
                {[
                  'React',
                  'TypeScript',
                  'Node.js',
                  'Python',
                  'Docker',
                  'AWS',
                ].map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-lime-100 hover:text-lime-700 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Main Card */}
              <div className="glass-effect rounded-2xl p-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CustomText variant="h6" font="roboto" weight="semibold">
                        Clean Code
                      </CustomText>
                      <CustomText variant="caption" color="muted">
                        Best Practices
                      </CustomText>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full w-4/5 animate-pulse"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full w-3/5 animate-pulse"
                        style={{ animationDelay: '0.5s' }}
                      ></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full w-4/6 animate-pulse"
                        style={{ animationDelay: '1s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center floating"
                style={{ animationDelay: '1s' }}
              >
                <CustomText
                  variant="h5"
                  font="roboto"
                  weight="bold"
                  color="gradient"
                >
                  JS
                </CustomText>
              </div>

              <div
                className="absolute -bottom-4 -left-4 w-28 h-28 bg-white rounded-xl shadow-lg flex items-center justify-center floating"
                style={{ animationDelay: '3s' }}
              >
                <CustomText
                  variant="h5"
                  font="roboto"
                  weight="bold"
                  color="gradient"
                >
                  TS
                </CustomText>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
