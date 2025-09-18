import React from "react";

const AboutSection = ({ content = {}, isPreview = false }) => {
    // Helper function to get content value by key
    const getContentValue = (key, defaultValue = '') => {
        const item = content.find(item => item.key === key);
        return item ? item.value : defaultValue;
    };

    // Get dynamic content from CMS
    const title = getContentValue('title', 'About Us');
    const description = getContentValue('description', 'We are a pioneering technology company dedicated to bringing innovative IoT solutions to agricultural, aquacultural, and urban sectors, making technology accessible and impactful for everyone.');
    const image = getContentValue('image', '/assets/images/omah-iot1.png');
    const featuresTitle = getContentValue('features_title', 'Why Choose OmahIoT?');
    const feature1Title = getContentValue('feature1_title', 'Innovative IoT Solutions');
    const feature1Desc = getContentValue('feature1_description', 'We design and develop custom IoT solutions that address real-world challenges in agriculture, aquaculture, and urban environments.');
    const feature2Title = getContentValue('feature2_title', 'Expert Technical Team');
    const feature2Desc = getContentValue('feature2_description', 'Our team combines expertise in hardware design, software development, and data analytics to create comprehensive solutions.');
    const feature3Title = getContentValue('feature3_title', 'Sustainable Development');
    const feature3Desc = getContentValue('feature3_description', 'We prioritize sustainability in our designs, helping clients reduce environmental impact while improving operational efficiency.');
    const experienceNumber = getContentValue('experience_number', '5+');
    const experienceText = getContentValue('experience_text', 'Years Experience');
return (
    <section
      id="about"
      className={`${isPreview ? 'py-8' : 'py-24'} bg-gradient-to-b from-[hsl(146,51%,91%)] via-white to-[hsl(146,51%,91%)] relative overflow-hidden`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] pattern-grid [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      </div>

      <div className="container mx-auto relative">
        <div className={`max-w-3xl mx-auto text-center ${isPreview ? 'mb-8' : 'mb-16'}`}>
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(148,41%,58%)]/20 via-[hsl(210,72%,25%)]/20 to-[hsl(148,41%,58%)]/20 rounded-2xl blur-lg opacity-60"></div>
            <h2 className={`${isPreview ? 'text-3xl md:text-4xl' : 'text-5xl md:text-6xl'} font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(210,72%,25%)] via-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] leading-tight`}>
              {title}
            </h2>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] rounded-full"></div>
          </div>
          <p className={`${isPreview ? 'text-base' : 'text-lg'} leading-relaxed mt-6 text-[hsl(210,72%,25%)]/80 max-w-2xl mx-auto`}>
            {description}
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto ${isPreview ? 'px-4' : ''}`}>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[hsl(148,41%,58%)] text-center md:text-left">
              {featuresTitle}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="group hover:bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10 p-0.5 rounded-xl transition-all duration-300">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 border border-[hsl(146,51%,91%)]/50">
                  <div className="bg-gradient-to-br from-[hsl(148,41%,58%)]/15 to-[hsl(210,72%,25%)]/15 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[hsl(148,41%,58%)]/25 group-hover:to-[hsl(210,72%,25%)]/25 transition-colors">
                    <svg
                      className="w-6 h-6 text-[hsl(148,41%,58%)]"
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
                    <h4 className="font-semibold text-base mb-2 text-[hsl(210,72%,25%)] group-hover:text-[hsl(148,41%,58%)] transition-colors">
                      {feature1Title}
                    </h4>
                    <p className="text-sm text-[hsl(210,72%,25%)]/70 group-hover:text-[hsl(210,72%,25%)]/90 transition-colors">
                      {feature1Desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 rounded-lg bg-white/60 hover:bg-[hsl(148,41%,58%)]/10 transition-all duration-300 hover:scale-[1.02] border border-[hsl(146,51%,91%)]/30">
                <div className="bg-[hsl(148,41%,58%)]/15 p-3 rounded-lg group-hover:bg-[hsl(148,41%,58%)]/25 transition-colors">
                  <svg
                    className="w-5 h-5 text-[hsl(148,41%,58%)]"
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
                  <h4 className="font-semibold text-sm mb-1 text-[hsl(210,72%,25%)]">
                    {feature2Title}
                  </h4>
                  <p className="text-sm text-[hsl(210,72%,25%)]/70">
                    {feature2Desc}
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 rounded-lg bg-white/60 hover:bg-[hsl(148,41%,58%)]/10 transition-all duration-300 hover:scale-[1.02] border border-[hsl(146,51%,91%)]/30">
                <div className="bg-[hsl(148,41%,58%)]/15 p-3 rounded-lg group-hover:bg-[hsl(148,41%,58%)]/25 transition-colors">
                  <svg
                    className="w-5 h-5 text-[hsl(148,41%,58%)]"
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
                  <h4 className="font-semibold text-sm mb-1 text-[hsl(210,72%,25%)]">
                    {feature3Title}
                  </h4>
                  <p className="text-sm text-[hsl(210,72%,25%)]/70">
                    {feature3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 md:mt-0">
            <div className="absolute inset-0 bg-[hsl(148,41%,58%)]/20 rounded-lg transform rotate-3 scale-105"></div>
            <div className="relative bg-white/90 rounded-lg p-4 shadow-lg border border-[hsl(146,51%,91%)]/50">
              <img
                src={image}
                alt="About Us"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] text-white p-3 rounded-lg shadow-lg">
                <p className="font-bold text-lg">{experienceNumber}</p>
                <p className="text-xs">{experienceText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
