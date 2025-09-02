import React from "react";
import { User, Award, Target, Heart } from "lucide-react";
import CustomText from "../ui/CustomText";

const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: User,
      title: "Professional",
      description:
        "Dedicated to delivering high-quality solutions with attention to detail.",
    },
    {
      icon: Award,
      title: "Experienced",
      description: "Proven track record in building scalable web applications.",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description:
        "Focused on achieving project objectives and exceeding expectations.",
    },
    {
      icon: Heart,
      title: "Passionate",
      description:
        "Love for clean code, innovative solutions, and continuous learning.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
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
                Crafting Digital Solutions
                <span className="gradient-text block">With Precision</span>
              </CustomText>

              <CustomText
                variant="body"
                color="secondary"
                className="leading-7"
              >
                I'm a passionate full-stack developer with a strong foundation
                in modern web technologies. My journey in software development
                has been driven by curiosity and a commitment to creating
                meaningful digital experiences that make a difference.
              </CustomText>

              <CustomText
                variant="body"
                color="secondary"
                className="leading-7"
              >
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or mentoring fellow
                developers. I believe in the power of technology to solve
                real-world problems and create positive impact.
              </CustomText>
            </div>

            {/* Key Skills */}
            <div className="space-y-4">
              <CustomText variant="h6" font="roboto" weight="semibold">
                Core Competencies
              </CustomText>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <CustomText variant="caption" weight="medium">
                      Frontend Development
                    </CustomText>
                    <CustomText variant="caption" color="accent">
                      95%
                    </CustomText>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full w-[95%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <CustomText variant="caption" weight="medium">
                      Backend Development
                    </CustomText>
                    <CustomText variant="caption" color="accent">
                      90%
                    </CustomText>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full w-[90%] transition-all duration-1000 delay-300"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <CustomText variant="caption" weight="medium">
                      UI/UX Design
                    </CustomText>
                    <CustomText variant="caption" color="accent">
                      85%
                    </CustomText>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full w-[85%] transition-all duration-1000 delay-600"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <CustomText variant="caption" weight="medium">
                      DevOps
                    </CustomText>
                    <CustomText variant="caption" color="accent">
                      80%
                    </CustomText>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full w-[80%] transition-all duration-1000 delay-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
