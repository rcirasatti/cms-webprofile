import React from "react";

const AboutSection = () => {
return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-background via-card to-background relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.02] pattern-grid [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      </div>

      <div className="container mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-50"></div>
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-[#2C3A2F] leading-tight">
              About Us
            </h2>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2C3A2F] to-[#4A6741] rounded-full"></div>
          </div>
          <p className="text-lg leading-relaxed mt-6 text-foreground/80 max-w-2xl mx-auto">
            We are a pioneering technology company dedicated to bringing
            innovative IoT solutions to agricultural, aquacultural, and urban
            sectors, making technology accessible and impactful for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary text-center md:text-left">
              Why Choose OmahIoT?
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="group hover:bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-0.5 rounded-xl transition-all duration-300">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-card backdrop-blur-sm transition-all duration-300">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                      Innovative IoT Solutions
                    </h4>
                    <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
                      We design and develop custom IoT solutions that address
                      real-world challenges in agriculture, aquaculture, and
                      urban environments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 rounded-lg bg-background/50 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    Expert Technical Team
                  </h4>
                  <p className="text-sm text-foreground/70">
                    Our team combines expertise in hardware design, software
                    development, and data analytics to create comprehensive
                    solutions.
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 rounded-lg bg-background/50 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    Sustainable Development
                  </h4>
                  <p className="text-sm text-foreground/70">
                    We prioritize sustainability in our designs, helping
                    clients reduce environmental impact while improving
                    operational efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 md:mt-0">
            <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3 scale-105"></div>
            <div className="relative bg-card rounded-lg p-4 shadow-lg">
              <img
                src="/assets/images/omah-iot1.png"
                alt="About Us"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg">
                <p className="font-bold text-lg">5+</p>
                <p className="text-xs">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
