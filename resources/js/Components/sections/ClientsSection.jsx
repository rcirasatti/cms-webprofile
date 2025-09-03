import React from "react";

const ClientsSection = ({ logos }) => {
  return (
    <section id="clients" className="py-24 bg-gradient-to-br from-[#f8f9fa] via-[#f5f8f5] to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-[url('''/LandingPage-OmahIot/grid.svg''')] bg-center [mask-image:radial-gradient(white,transparent_80%)]"></div>
      </div>
      <div className="absolute w-full h-full opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#4A6741]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#2C3A2F]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float"></div>
      </div>

      <div className="container mx-auto text-center relative">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-block relative mb-4">
            <span className="block text-[#4A6741] font-medium text-lg mb-3 animate-fade-in">TRUSTED BY INDUSTRY LEADERS</span>
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-[#2C3A2F] leading-tight animate-fade-in-delay-1">
              Our Partners & Clients
            </h2>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2C3A2F] to-[#4A6741] rounded-full"></div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mt-6">
            Collaborating with top organizations who trust our innovative solutions
          </p>
        </div>

        {/* Logo Grid with Animation */}
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#f8f9fa] via-[#f8f9fa]/90 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden relative py-12 bg-white/40 rounded-2xl shadow-sm border border-white/20 transition-all duration-500 hover:shadow-lg hover:bg-white/60">
            <div className="scroll-container hover:pause-animation">
              <div className="flex logos-slide animate-infinite-scroll">
                {logos.map((logo, index) => (
                  <div 
                    key={index} 
                    className="relative group bg-white rounded-xl shadow-md p-5 flex items-center justify-center h-28 w-40 mx-4 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/10 via-transparent to-[#2C3A2F]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-h-16 max-w-28 object-contain filter grayscale hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-xs font-medium text-gray-500">{logo.alt}</div>
                  </div>
                ))}
                
                {/* Duplicate for seamless scrolling */}
                {logos.map((logo, index) => (
                  <div 
                    key={`dup-${index}`} 
                    className="relative group bg-white rounded-xl shadow-md p-5 flex items-center justify-center h-28 w-40 mx-4 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/10 via-transparent to-[#2C3A2F]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-h-16 max-w-28 object-contain filter grayscale hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-xs font-medium text-gray-500">{logo.alt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats or CTA */}
        <div className="mt-20 py-10 bg-[#2C3A2F] rounded-2xl shadow-xl overflow-hidden relative max-w-5xl mx-auto">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-[#4CAF50]/30 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[#4CAF50]/20 blur-3xl"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            <div className="flex flex-col items-center p-6 border-r border-white/10 last:border-0">
              <span className="text-4xl font-bold text-white mb-2">500+</span>
              <span className="text-white/80 text-sm font-medium">
                Projects Delivered
              </span>
            </div>
            <div className="flex flex-col items-center p-6 border-r border-white/10 md:border-r">
              <span className="text-4xl font-bold text-white mb-2">50+</span>
              <span className="text-white/80 text-sm font-medium">
                Happy Clients
              </span>
            </div>
            <div className="flex flex-col items-center p-6 border-r border-white/10 md:border-r">
              <span className="text-4xl font-bold text-white mb-2">15+</span>
              <span className="text-white/80 text-sm font-medium">
                Countries Served
              </span>
            </div>
            <div className="flex flex-col items-center p-6">
              <span className="text-4xl font-bold text-white mb-2">24/7</span>
              <span className="text-white/80 text-sm font-medium">
                Customer Support
              </span>
            </div>
          </div>
          
          <div className="mt-10 text-center relative z-10">
            <a href="#contact" className="inline-flex items-center px-8 py-3 bg-white text-[#2C3A2F] rounded-full hover:bg-[#7ab07c] hover:text-white transition duration-300 font-medium group shadow-lg">
              Start Your Project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
