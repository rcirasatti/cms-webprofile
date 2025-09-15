import React from "react";

const ClientsSection = ({ content = {} }) => {
  // Get client content for title/description from content.client (landing_page_contents)
  const getContentValue = (key, defaultValue = '') => {
    const contentArray = content.client || [];
    const item = contentArray.find(item => item.key === key);
    return item ? item.value : defaultValue;
  };

  // Get dynamic content from CMS
  const title = getContentValue('title', 'Our Partners & Clients');
  const subtitle = getContentValue('subtitle', 'TRUSTED BY INDUSTRY LEADERS');
  const description = getContentValue('description', 'Collaborating with top organizations who trust our innovative solutions');
  
  // Get client logos from dedicated clients table
  const clientLogos = content.clients || [];
  return (
    <section id="clients" className="py-24 bg-gradient-to-br from-[hsl(146,51%,91%)] via-white to-[hsl(146,51%,91%)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0 bg-[url('''/LandingPage-OmahIot/grid.svg''')] bg-center [mask-image:radial-gradient(white,transparent_80%)]"></div>
      </div>
      <div className="absolute w-full h-full opacity-30">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[hsl(148,41%,58%)]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[hsl(210,72%,25%)]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float"></div>
      </div>

      <div className="container mx-auto text-center relative">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-block relative mb-4">
            <span className="block text-[hsl(148,41%,58%)] font-medium text-lg mb-3 animate-fade-in">{subtitle}</span>
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(210,72%,25%)] via-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] leading-tight animate-fade-in-delay-1">
              {title}
            </h2>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] rounded-full"></div>
          </div>

          <p className="text-xl text-[hsl(210,72%,25%)]/80 leading-relaxed mt-6">
            {description}
          </p>
        </div>

        {/* Logo Grid with Animation */}
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[hsl(146,51%,91%)] via-[hsl(146,51%,91%)]/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[hsl(146,51%,91%)] via-[hsl(146,51%,91%)]/90 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden relative py-12 bg-white/60 rounded-2xl shadow-lg border border-[hsl(148,41%,58%)]/20 transition-all duration-500 hover:shadow-xl hover:bg-white/80">
            <div className="scroll-container hover:pause-animation">
              <div className="flex logos-slide animate-infinite-scroll">
                {clientLogos.map((client, index) => (
                  <div 
                    key={client.id} 
                    className="relative group bg-white rounded-xl shadow-lg p-5 flex items-center justify-center h-28 w-40 mx-4 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-[hsl(146,51%,91%)]/50 flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                    <img 
                      src={client.logo_path} 
                      alt={client.name} 
                      className="max-h-16 max-w-28 object-contain filter grayscale hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/assets/images/placeholder.jpg";
                      }}
                    />
                    <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-xs font-medium text-[hsl(210,72%,25%)]">{client.name}</div>
                  </div>
                ))}
                
                {/* Duplicate for seamless scrolling */}
                {clientLogos.map((client, index) => (
                  <div 
                    key={`dup-${client.id}`} 
                    className="relative group bg-white rounded-xl shadow-lg p-5 flex items-center justify-center h-28 w-40 mx-4 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-[hsl(146,51%,91%)]/50 flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                    <img 
                      src={client.logo_path} 
                      alt={client.name} 
                      className="max-h-16 max-w-28 object-contain filter grayscale hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/assets/images/placeholder.jpg";
                      }}
                    />
                    <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-xs font-medium text-[hsl(210,72%,25%)]">{client.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats or CTA */}
        <div className="mt-20 py-10 bg-gradient-to-r from-[hsl(210,72%,25%)] to-[hsl(148,41%,58%)] rounded-2xl shadow-xl overflow-hidden relative max-w-5xl mx-auto">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-[hsl(146,51%,91%)]/30 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[hsl(146,51%,91%)]/20 blur-3xl"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            <div className="flex flex-col items-center p-6 border-r border-white/20 last:border-0">
              <span className="text-4xl font-bold text-white mb-2">500+</span>
              <span className="text-white/90 text-sm font-medium">
                Projects Delivered
              </span>
            </div>
            <div className="flex flex-col items-center p-6 border-r border-white/20 md:border-r">
              <span className="text-4xl font-bold text-white mb-2">50+</span>
              <span className="text-white/90 text-sm font-medium">
                Happy Clients
              </span>
            </div>
            <div className="flex flex-col items-center p-6 border-r border-white/20 md:border-r">
              <span className="text-4xl font-bold text-white mb-2">15+</span>
              <span className="text-white/90 text-sm font-medium">
                Countries Served
              </span>
            </div>
            <div className="flex flex-col items-center p-6">
              <span className="text-4xl font-bold text-white mb-2">24/7</span>
              <span className="text-white/90 text-sm font-medium">
                Customer Support
              </span>
            </div>
          </div>
          
          <div className="mt-10 text-center relative z-10">
            <a href="#contact" className="inline-flex items-center px-8 py-3 bg-white text-[hsl(210,72%,25%)] rounded-full hover:bg-[hsl(146,51%,91%)] hover:text-[hsl(210,72%,25%)] transition duration-300 font-medium group shadow-lg">
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
