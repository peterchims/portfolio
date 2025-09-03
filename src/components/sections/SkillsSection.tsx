import React from 'react';
import { skillCategories, additionalTechnologies } from '../data/Data';
import CustomText from '../ui/CustomText';

const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container-custom">
        {/* Section Header */}
        <header className="text-center space-y-4 mb-16">
          <CustomText
            variant="overline"
            font="roboto"
            weight="semibold"
            color="accent"
          >
            Technical Expertise
          </CustomText>

          <CustomText
            variant="h2"
            font="roboto"
            weight="bold"
            color="primary"
            className="text-balance"
          >
            Skills That Drive
            <span className="gradient-text block">Innovation</span>
          </CustomText>

          <CustomText
            variant="body"
            color="secondary"
            className="max-w-2xl mx-auto text-balance"
          >
            A comprehensive toolkit of modern technologies and frameworks that
            enable me to build full-stack applications from conception to
            deployment.
          </CustomText>
        </header>

        {/* Main Skills Content */}
        <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map(category => (
            <article
              key={category.title}
              className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-lime-200 overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <CustomText
                  variant="h6"
                  font="roboto"
                  weight="semibold"
                  color="primary"
                >
                  {category.title}
                </CustomText>

                {/* Skills List */}
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skill}
                      className="flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transitionDelay: `${skillIndex * 50}ms` }}
                    >
                      <div className="w-2 h-2 bg-lime-400 rounded-full" />
                      <CustomText variant="caption" color="secondary">
                        {skill}
                      </CustomText>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </main>

        {/* Additional Skills Section */}
        <section className="mt-16 text-center">
          <CustomText
            variant="h6"
            font="roboto"
            weight="semibold"
            className="mb-6"
          >
            Additional Technologies
          </CustomText>

          <div className="flex flex-wrap justify-center gap-3">
            {additionalTechnologies.map(tech => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-lime-100 hover:to-green-100 text-gray-700 hover:text-green-800 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default SkillsSection;
