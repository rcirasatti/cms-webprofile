import React from "react";
import { ChevronRight } from "lucide-react";

const ProjectsSection = ({
  activeFilter,
  setActiveFilter,
  filteredProjects = [],
  content = {},
}) => {
  
  // Get dynamic content from CMS
  const getContentValue = (key, defaultValue = '') => {
    const contentArray = content.projects || [];
    const item = contentArray.find(item => item.key === key);
    return item ? item.value : defaultValue;
  };

  const title = getContentValue('title', 'Our Projects');
  const description = getContentValue('description', 'Explore our innovative solutions across various domains');
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-white to-[hsl(146,51%,91%)] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] pattern-grid [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/5 via-transparent to-[hsl(210,72%,25%)]/5" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="relative inline-block mb-4">
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(210,72%,25%)] via-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] leading-tight">
              {title}
            </h2>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] rounded-full"></div>
          </div>
          <p className="text-xl text-[hsl(210,72%,25%)]/80 leading-relaxed mt-6 mb-10">
            {description}
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-[hsl(210,72%,25%)] text-white shadow-lg"
                  : "bg-white hover:bg-[hsl(148,41%,58%)]/10 border border-[hsl(148,41%,58%)]/20 hover:border-[hsl(148,41%,58%)]/40 shadow-sm hover:shadow text-[hsl(210,72%,25%)]"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter("IoT Solution")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === "IoT Solution"
                  ? "bg-[hsl(210,72%,25%)] text-white shadow-lg"
                  : "bg-white hover:bg-[hsl(148,41%,58%)]/10 border border-[hsl(148,41%,58%)]/20 hover:border-[hsl(148,41%,58%)]/40 shadow-sm hover:shadow text-[hsl(210,72%,25%)]"
              }`}
            >
              IoT Solutions
            </button>
            <button
              onClick={() => setActiveFilter("Digital Solution")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === "Digital Solution"
                  ? "bg-[hsl(210,72%,25%)] text-white shadow-lg"
                  : "bg-white hover:bg-[hsl(148,41%,58%)]/10 border border-[hsl(148,41%,58%)]/20 hover:border-[hsl(148,41%,58%)]/40 shadow-sm hover:shadow text-[hsl(210,72%,25%)]"
              }`}
            >
              Digital Solutions
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full transform hover:-translate-y-2 border border-[hsl(146,51%,91%)]/50"
            >
              {/* Top decoration line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              <div className="p-4">
                <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[hsl(148,41%,58%)]/20 via-[hsl(210,72%,25%)]/15 to-[hsl(146,51%,91%)]/30 shadow-md aspect-square">
                  <img
                    src={project.image_path}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 p-3 filter brightness-110 contrast-110"
                    onError={(e) => {
                      e.target.src = "/assets/images/placeholder.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(148,41%,58%)]/20 via-[hsl(210,72%,25%)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[hsl(148,41%,58%)]/15 text-[hsl(210,72%,25%)] rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold mb-2 text-[hsl(210,72%,25%)] group-hover:text-[hsl(148,41%,58%)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[hsl(210,72%,25%)]/70 mb-4">
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-[hsl(148,41%,58%)] hover:text-[hsl(210,72%,25%)] transition-colors group-hover:underline"
                >
                  Learn more
                  <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
