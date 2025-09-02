import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import CustomText from "../ui/CustomText";
import CustomButton from "../ui/CustomButton";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@yourname.com",
      href: "mailto:hello@yourname.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Your City, Country",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-4 mb-16">
          <CustomText
            variant="overline"
            font="roboto"
            weight="semibold"
            color="accent"
          >
            Get In Touch
          </CustomText>

          <CustomText
            variant="h2"
            font="roboto"
            weight="bold"
            color="white"
            className="text-balance"
          >
            Let's Work
            <span className="gradient-text"> Together</span>
          </CustomText>

          <CustomText
            variant="body"
            color="muted"
            className="max-w-2xl mx-auto text-balance text-gray-300"
          >
            Ready to bring your ideas to life? Let's discuss your project and
            create something amazing together.
          </CustomText>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <CustomText
                variant="h4"
                font="roboto"
                weight="semibold"
                color="white"
              >
                Contact Information
              </CustomText>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="group flex items-center space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CustomText
                        variant="caption"
                        color="muted"
                        className="text-gray-400"
                      >
                        {info.title}
                      </CustomText>
                      <CustomText variant="body" weight="medium" color="white">
                        {info.value}
                      </CustomText>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 bg-gradient-to-r from-lime-400/10 to-green-500/10 rounded-xl border border-lime-400/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <CustomText
                  variant="h6"
                  font="roboto"
                  weight="semibold"
                  color="white"
                >
                  Available for Projects
                </CustomText>
              </div>
              <CustomText variant="caption" className="text-gray-300">
                Currently open to new opportunities and exciting projects. Let's
                discuss how I can help bring your vision to life.
              </CustomText>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300"
                  placeholder="Project Discussion"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <CustomButton
                type="submit"
                variant="primary"
                size="lg"
                icon={isSubmitted ? CheckCircle : Send}
                className="w-full"
                disabled={isSubmitted}
              >
                {isSubmitted ? "Message Sent!" : "Send Message"}
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
