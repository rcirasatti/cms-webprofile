import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-[#2C3A2F] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('''/LandingPage-OmahIot/grid.svg''')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">Contact Us</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Tertarik dengan layanan kami? Hubungi kami sekarang untuk konsultasi
            gratis dan temukan solusi terbaik untuk bisnis Anda.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-4">
            {/* Email Card */}
            <div className="group relative bg-gradient-to-br from-[#2C3A2F]/5 via-transparent to-[#4A6741]/5 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,103,65,0.2)] h-[150px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/20 via-primary/20 to-[#2C3A2F]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm p-4 rounded-xl h-full flex items-center">
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                      Email Us
                    </h3>
                    <p className="text-sm text-foreground/60 mb-2">
                      24/7 Support
                    </p>
                    <a
                      href="mailto:omahiot@gmail.com"
                      className="text-base font-medium text-primary hover:text-primary/80 transition-all duration-300"
                    >
                      omahiot@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group relative bg-gradient-to-br from-[#2C3A2F]/5 via-transparent to-[#4A6741]/5 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,103,65,0.2)] h-[150px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/20 via-primary/20 to-[#2C3A2F]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm p-4 rounded-xl h-full flex items-center">
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                      Call Us
                    </h3>
                    <p className="text-sm text-foreground/60 mb-2">
                      Mon-Fri, 9-5
                    </p>
                    <a
                      href="tel:+62 8127-6253-242"
                      className="text-base font-medium text-primary hover:text-primary/80 transition-all duration-300"
                    >
                      +62 8127-6253-242
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative bg-gradient-to-br from-[#2C3A2F]/5 via-transparent to-[#4A6741]/5 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,103,65,0.2)] h-[175px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/20 via-primary/20 to-[#2C3A2F]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm p-4 rounded-xl h-full flex items-center">
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                      Visit Us
                    </h3>
                    <p className="text-sm text-foreground/60 mb-2">
                      Office Location
                    </p>
                    <p className="text-base font-medium text-primary hover:text-primary/80 transition-all duration-300">
                      Jl. Turus Asri IV No. 6, Bulusan, Kec. Tembalang, Kota
                      Semarang, Jawa Tengah 50277
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="group relative bg-gradient-to-br from-[#2C3A2F]/5 via-transparent to-[#4A6741]/5 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,103,65,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/20 via-primary/20 to-[#2C3A2F]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl h-full flex flex-col">
              <form className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-foreground/90 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-foreground/90 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-foreground/90 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What is your message about?"
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-foreground/90 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none backdrop-blur-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-primary rounded-xl font-medium text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,103,65,0.3)] active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#4A6741]/20 via-primary/20 to-[#2C3A2F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
                  <span className="relative flex items-center justify-center">
                    Send Message
                    <svg
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
