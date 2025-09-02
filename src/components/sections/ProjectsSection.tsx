import React from "react";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import CustomText from "../ui/CustomText";
import CustomButton from "../ui/CustomButton";

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      category: "Web Application",
      date: "2024",
      featured: true,
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates, team collaboration, and progress tracking.",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "TypeScript", "Socket.io", "MongoDB"],
      category: "SaaS",
      date: "2024",
      featured: true,
    },
    {
      title: "Weather Analytics Dashboard",
      description:
        "Real-time weather data visualization with predictive analytics and interactive charts.",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Vue.js", "Python", "FastAPI", "Chart.js"],
      category: "Data Visualization",
      date: "2023",
      featured: false,
    },
    {
      title: "Social Media App",
      description:
        "Mobile-first social platform with real-time messaging, media sharing, and social features.",
      image:
        "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React Native", "Firebase", "Redux", "Node.js"],
      category: "Mobile App",
      date: "2023",
      featured: false,
    },
    {
      title: "AI-Powered Blog",
      description:
        "Content management system with AI-assisted writing, SEO optimization, and analytics.",
      image:
        "https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Next.js", "OpenAI API", "Prisma", "Tailwind"],
      category: "AI/ML",
      date: "2024",
      featured: false,
    },
    {
      title: "Crypto Trading Bot",
      description:
        "Automated trading system with machine learning algorithms and risk management.",
      image:
        "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Python", "TensorFlow", "PostgreSQL", "Docker"],
      category: "FinTech",
      date: "2023",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <CustomText
            variant="overline"
            font="roboto"
            weight="semibold"
            color="accent"
          >
            Portfolio
          </CustomText>

          <CustomText
            variant="h2"
            font="roboto"
            weight="bold"
            color="primary"
            className="text-balance"
          >
            Featured
            <span className="gradient-text"> Projects</span>
          </CustomText>

          <CustomText
            variant="body"
            color="secondary"
            className="max-w-2xl mx-auto text-balance"
          >
            A showcase of my recent work, demonstrating expertise across
            different technologies and problem domains.
          </CustomText>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Project Image */}
              <div
                className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <CustomButton variant="outline" size="sm" icon={Github}>
                        Code
                      </CustomButton>
                      <CustomButton
                        variant="primary"
                        size="sm"
                        icon={ExternalLink}
                      >
                        Live Demo
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div
                className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <CustomText variant="caption">{project.date}</CustomText>
                    </div>
                  </div>

                  <CustomText
                    variant="h3"
                    font="roboto"
                    weight="bold"
                    color="primary"
                  >
                    {project.title}
                  </CustomText>

                  <CustomText
                    variant="body"
                    color="secondary"
                    className="leading-7"
                  >
                    {project.description}
                  </CustomText>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <CustomText variant="caption" weight="medium">
                      Technologies Used:
                    </CustomText>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:border-lime-300 hover:bg-lime-50 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <CustomButton variant="primary" icon={ExternalLink}>
                    View Project
                  </CustomButton>
                  <CustomButton variant="outline" icon={Github}>
                    Source Code
                  </CustomButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="space-y-8">
          <CustomText
            variant="h3"
            font="roboto"
            weight="semibold"
            align="center"
          >
            More Projects
          </CustomText>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project) => (
              <div
                key={project.title}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-lime-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-md text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <CustomText
                      variant="h6"
                      font="roboto"
                      weight="semibold"
                      color="primary"
                    >
                      {project.title}
                    </CustomText>

                    <CustomText
                      variant="caption"
                      color="secondary"
                      className="leading-6"
                    >
                      {project.description}
                    </CustomText>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <CustomButton variant="ghost" size="sm" icon={Github}>
                      Code
                    </CustomButton>
                    <CustomButton variant="ghost" size="sm" icon={ExternalLink}>
                      Demo
                    </CustomButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
