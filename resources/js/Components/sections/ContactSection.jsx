import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = ({ content = [] }) => {
  
  // Helper function to get content value by key
  const getContentValue = (key, defaultValue = '') => {
    const item = content.find(item => item.key === key);
    return item ? item.value : defaultValue;
  };

  // Get dynamic content from CMS
  const title = getContentValue('title', 'Contact Us');
  const subtitle = getContentValue('description', 'Tertarik dengan layanan kami? Hubungi kami sekarang untuk konsultasi gratis dan temukan solusi terbaik untuk bisnis Anda.');
  const email = getContentValue('email', 'omahiot@gmail.com');
  const phone = getContentValue('phone', '+62 8127-6253-242');
  const address = getContentValue('address', 'Jl. Turus Asri IV No. 6, Bulusan, Kec. Tembalang, Kota Semarang, Jawa Tengah 50277');
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[hsl(146,51%,91%)] to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('''/LandingPage-OmahIot/grid.svg''')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-[hsl(210,72%,25%)]">{title}</h2>
          <p className="text-lg text-[hsl(210,72%,25%)]/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-4">
            {/* Email Card */}
            <div className="group relative bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_hsl(148,41%,58%,0.3)] h-[150px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/20 via-[hsl(148,41%,58%)]/20 to-[hsl(210,72%,25%)]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl h-full flex items-center border border-[hsl(146,51%,91%)]/50">
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-gradient-to-br from-[hsl(148,41%,58%)]/15 to-[hsl(210,72%,25%)]/15 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[hsl(148,41%,58%)]/25 group-hover:to-[hsl(210,72%,25%)]/25 transition-colors flex-shrink-0">
                    <Mail className="w-6 h-6 text-[hsl(148,41%,58%)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 text-[hsl(210,72%,25%)] group-hover:text-[hsl(148,41%,58%)] transition-colors duration-300">
                      Email Us
                    </h3>
                    <p className="text-sm text-[hsl(210,72%,25%)]/60 mb-2">
                      24/7 Support
                    </p>
                    <a
                      href="mailto:omahiot@gmail.com"
                      className="text-base font-medium text-[hsl(148,41%,58%)] hover:text-[hsl(148,41%,58%)]/80 transition-all duration-300"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group relative bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_hsl(148,41%,58%,0.3)] h-[150px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/20 via-[hsl(148,41%,58%)]/20 to-[hsl(210,72%,25%)]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl h-full flex items-center border border-[hsl(146,51%,91%)]/50">
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-gradient-to-br from-[hsl(148,41%,58%)]/15 to-[hsl(210,72%,25%)]/15 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[hsl(148,41%,58%)]/25 group-hover:to-[hsl(210,72%,25%)]/25 transition-colors flex-shrink-0">
                    <Phone className="w-6 h-6 text-[hsl(148,41%,58%)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 text-[hsl(210,72%,25%)] group-hover:text-[hsl(148,41%,58%)] transition-colors duration-300">
                      Call Us
                    </h3>
                    <p className="text-sm text-[hsl(210,72%,25%)]/60 mb-2">
                      Mon-Fri, 9-5
                    </p>
                    <a
                      href="tel:+62 8127-6253-242"
                      className="text-base font-medium text-[hsl(148,41%,58%)] hover:text-[hsl(148,41%,58%)]/80 transition-all duration-300"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_hsl(148,41%,58%,0.3)] h-[175px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/20 via-[hsl(148,41%,58%)]/20 to-[hsl(210,72%,25%)]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl h-full flex items-center border border-[hsl(146,51%,91%)]/50">
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-gradient-to-br from-[hsl(148,41%,58%)]/15 to-[hsl(210,72%,25%)]/15 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[hsl(148,41%,58%)]/25 group-hover:to-[hsl(210,72%,25%)]/25 transition-colors flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[hsl(148,41%,58%)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 text-[hsl(210,72%,25%)] group-hover:text-[hsl(148,41%,58%)] transition-colors duration-300">
                      Visit Us
                    </h3>
                    <p className="text-sm text-[hsl(210,72%,25%)]/60 mb-2">
                      Office Location
                    </p>
                    <p className="text-base font-medium text-[hsl(148,41%,58%)] hover:text-[hsl(148,41%,58%)]/80 transition-all duration-300">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="group relative bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10 rounded-xl p-0.5 transition-all duration-500 hover:shadow-[0_0_25px_hsl(148,41%,58%,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/20 via-[hsl(148,41%,58%)]/20 to-[hsl(210,72%,25%)]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-xl h-full flex flex-col border border-[hsl(146,51%,91%)]/50">
              <form className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-[hsl(210,72%,25%)] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[hsl(146,51%,91%)] hover:border-[hsl(148,41%,58%)]/50 focus:border-[hsl(148,41%,58%)] focus:ring-2 focus:ring-[hsl(148,41%,58%)]/20 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-[hsl(210,72%,25%)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[hsl(146,51%,91%)] hover:border-[hsl(148,41%,58%)]/50 focus:border-[hsl(148,41%,58%)] focus:ring-2 focus:ring-[hsl(148,41%,58%)]/20 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-[hsl(210,72%,25%)] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What is your message about?"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[hsl(146,51%,91%)] hover:border-[hsl(148,41%,58%)]/50 focus:border-[hsl(148,41%,58%)] focus:ring-2 focus:ring-[hsl(148,41%,58%)]/20 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-[hsl(210,72%,25%)] mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[hsl(146,51%,91%)] hover:border-[hsl(148,41%,58%)]/50 focus:border-[hsl(148,41%,58%)] focus:ring-2 focus:ring-[hsl(148,41%,58%)]/20 transition-all duration-200 resize-none backdrop-blur-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-[hsl(148,41%,58%)] via-[hsl(210,72%,25%)] to-[hsl(148,41%,58%)] rounded-xl font-medium text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_hsl(148,41%,58%,0.4)] active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[hsl(146,51%,91%)]/10 via-white/10 to-[hsl(146,51%,91%)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
                  <span className="relative flex items-center justify-center font-semibold">
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
