import React from 'react';
import CustomText from '../ui/CustomText';
import { highlights } from '../data/Data';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <article className="space-y-8">
            <header className="space-y-4">
              <CustomText
                variant="overline"
                font="roboto"
                weight="semibold"
                color="accent"
              >
                About Me
              </CustomText>

              <CustomText
                variant="h2"
                font="roboto"
                weight="bold"
                color="primary"
                className="text-balance"
              >
                Crafting Digital Experiences
                <span className="gradient-text block">With Precision</span>
              </CustomText>

              <CustomText
                variant="body"
                color="secondary"
                className="leading-7"
              >
                I'm a passionate frontend engineer specializing in creating
                responsive, accessible, and performance-driven web applications.
                My journey in frontend development is driven by a love for clean
                code, intuitive design, and creating digital experiences that
                users genuinely enjoy.
              </CustomText>

              <CustomText
                variant="body"
                color="secondary"
                className="leading-7"
              >
                While my primary expertise lies in frontend technologies like
                React and TypeScript, I continuously expand my skills to
                understand the full development lifecycle. When I'm not coding,
                I'm exploring UI/UX design principles, contributing to
                open-source projects, or sharing knowledge with the developer
                community.
              </CustomText>
            </header>

            {/* Key Skills */}
            <section className="space-y-4">
              <CustomText variant="h6" font="roboto" weight="semibold">
                Core Competencies
              </CustomText>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    skill: 'Frontend Development',
                    percentage: '95%',
                    color: 'from-lime-400 to-green-500',
                  },
                  {
                    skill: 'React & TypeScript',
                    percentage: '90%',
                    color: 'from-blue-400 to-blue-500',
                    delay: '300',
                  },
                  {
                    skill: 'API  Testing / Integration',
                    percentage: '88%',
                    color: 'from-purple-400 to-purple-500',
                    delay: '600',
                  },
                  {
                    skill: 'Performance Optimization',
                    percentage: '85%',
                    color: 'from-orange-400 to-red-500',
                    delay: '900',
                  },
                ].map((item, index) => (
                  <div key={item.skill} className="space-y-2">
                    <div className="flex justify-between">
                      <CustomText variant="caption" weight="medium">
                        {item.skill}
                      </CustomText>
                      <CustomText variant="caption" color="accent">
                        {item.percentage}
                      </CustomText>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full w-[${item.percentage}] transition-all duration-1000 ${item.delay ? `delay-${item.delay}` : ''}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Right Column - Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map(item => (
              <article
                key={item.title}
                className="group p-6 bg-gray-50 hover:bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-lime-200"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="space-y-2">
                    <CustomText
                      variant="h6"
                      font="roboto"
                      weight="semibold"
                      color="primary"
                    >
                      {item.title}
                    </CustomText>

                    <CustomText
                      variant="caption"
                      color="secondary"
                      className="leading-6"
                    >
                      {item.description}
                    </CustomText>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
