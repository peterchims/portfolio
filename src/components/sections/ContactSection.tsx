import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import CustomText from '../ui/CustomText';
import CustomButton from '../ui/CustomButton';
import { contactInfo } from '../data/Data';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      {/* Background glow effects */}
      <span className="absolute top-20 left-10 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl" />
      <span className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <header className="mb-16 text-center space-y-4">
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
            Let&apos;s Work
            <span className="gradient-text"> Together</span>
          </CustomText>

          <CustomText
            variant="body"
            color="muted"
            className="mx-auto max-w-2xl text-gray-300 text-balance"
          >
            Ready to bring your ideas to life? Let&apos;s discuss your project
            and create something amazing together.
          </CustomText>
        </header>

        {/* Main Content */}
        <main className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information Sidebar */}
          <aside className="space-y-8">
            <section>
              <CustomText
                variant="h4"
                font="roboto"
                weight="semibold"
                color="white"
                className="mb-6"
              >
                Contact Information
              </CustomText>

              <ul className="space-y-4">
                {contactInfo.map(info => (
                  <li key={info.title}>
                    <a
                      href={info.href}
                      className="group flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors duration-300"
                    >
                      <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 group-hover:scale-110 transition-transform">
                        <info.icon className="w-6 h-6 text-white" />
                      </span>
                      <span>
                        <CustomText
                          variant="caption"
                          color="muted"
                          className="text-gray-400"
                        >
                          {info.title}
                        </CustomText>
                        <CustomText
                          variant="body"
                          weight="medium"
                          color="white"
                        >
                          {info.value}
                        </CustomText>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Availability Status */}
            <section className="p-6 rounded-xl border border-lime-400/20 bg-gradient-to-r from-lime-400/10 to-green-500/10">
              <header className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <CustomText
                  variant="h6"
                  font="roboto"
                  weight="semibold"
                  color="white"
                >
                  Available for Projects
                </CustomText>
              </header>
              <CustomText variant="caption" className="text-gray-200">
                Currently open to new opportunities and exciting projects.
                Let&apos;s discuss how I can help bring your vision to life.
              </CustomText>
            </section>
          </aside>

          {/* Contact Form Section */}
          <section className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <fieldset className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="block text-sm font-medium text-gray-300">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-lime-500 transition"
                  />
                </label>

                <label className="space-y-2">
                  <span className="block text-sm font-medium text-gray-300">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-lime-500 transition"
                  />
                </label>
              </fieldset>

              <label className="space-y-2 block">
                <span className="block text-sm font-medium text-gray-300">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Discussion"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-lime-500 transition"
                />
              </label>

              <label className="space-y-2 block">
                <span className="block text-sm font-medium text-gray-300">
                  Message
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-lime-500 transition"
                />
              </label>

              <CustomButton
                type="submit"
                variant="primary"
                size="lg"
                icon={isSubmitted ? CheckCircle : Send}
                className="w-full"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Message Sent!' : 'Send Message'}
              </CustomButton>
            </form>
          </section>
        </main>
      </div>
    </section>
  );
};

export default ContactSection;
