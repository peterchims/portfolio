import React from 'react';
import { Download, ArrowRight, Code } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import CustomText from '../ui/CustomText';

const HeroSection: React.FC = () => {
  return (
    <main
      id="home"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
      role="main"
      aria-label="Home section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl floating" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl floating"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-300/5 rounded-full blur-3xl floating"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Content */}
      <section className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Text Content */}
          <article className="space-y-8">
            <header className="space-y-4">
              <CustomText
                variant="overline"
                font="roboto"
                weight="semibold"
                color="accent"
                animated
                delay={1}
              >
                Frontend Engineer
              </CustomText>

              <h1>
                <CustomText
                  variant="h1"
                  font="roboto"
                  weight="bold"
                  color="primary"
                  animated
                  delay={2}
                  className="text-balance"
                >
                  Crafting Modern
                  <span className="gradient-text block">Web Interfaces</span>
                  That Inspire Users
                </CustomText>
              </h1>

              <CustomText
                variant="body"
                font="raleway"
                color="secondary"
                animated
                delay={3}
                className="max-w-xl text-balance leading-7 block"
              >
                I'm a passionate Frontend Engineer skilled in building
                responsive, accessible, and performance-driven applications.
                With expertise in React, TypeScript, and modern UI frameworks, I
                transform ideas into intuitive digital products that delight
                users and scale for growth.
              </CustomText>
            </header>

            {/* Stats */}
            <section
              className="grid grid-cols-3 gap-6 py-6 fade-in-up stagger-4"
              aria-label="Developer Stats"
            >
              <div className="text-center">
                <CustomText
                  variant="h3"
                  font="roboto"
                  weight="bold"
                  color="gradient"
                >
                  10+
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
            </section>

            {/* CTA Buttons */}
            <nav
              className="flex 
              flex-col 
              sm:flex-row 
              gap-4 
              fade-in-up 
              stagger-5"
              aria-label="Call to actions"
            >
              <CustomButton
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                View My Work
              </CustomButton>

              <a
                href="/public/UpdatedTechResume (1).pdf"
                download="Peter4Tech_CV.pdf"
                className="block w-full sm:w-auto"
              >
                <CustomButton
                  variant="outline"
                  size="lg"
                  icon={Download}
                  className="w-full sm:w-auto"
                >
                  Download CV
                </CustomButton>
              </a>
            </nav>

            {/* Tech Stack Preview */}
            <section className="fade-in-up stagger-5" aria-label="Tech Stack">
              <CustomText
                variant="caption"
                color="muted"
                className="mb-3 block"
              >
                Technologies I work with:
              </CustomText>
              <ul className="flex flex-wrap gap-2">
                {[
                  'React',
                  'TypeScript',
                  'Node.js',
                  'Vue',
                  'Angular',
                  'NextJs',
                  'Docker',
                  'Javascript',
                  'React Native',
                ].map(tech => (
                  <li key={tech}>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-lime-100 hover:text-lime-700 transition-colors duration-300">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          {/* Visual Element */}
          <div className="relative lg:block hidden" aria-hidden="true">
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
                    <div className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full w-4/5 animate-pulse" />
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full w-3/5 animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    {/* <div
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full w-4/6 animate-pulse"
                      style={{ animationDelay: '1s' }}
                    /> */}
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
      </section>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-gray-400 rounded-full mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
