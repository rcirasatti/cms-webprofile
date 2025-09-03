import React from "react";
import { ChevronRight } from "lucide-react";

const ProjectsSection = ({
  activeFilter,
  setActiveFilter,
  filteredProjects,
}) => {
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] pattern-grid [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="relative inline-block mb-4">
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-[#2C3A2F] leading-tight">
              Our Projects
            </h2>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2C3A2F] to-[#4A6741] rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mt-6 mb-10">
            Explore our innovative solutions across various domains
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-[#2C3A2F] text-white shadow-lg"
                  : "bg-white hover:bg-[#4A6741]/5 border border-[#2C3A2F]/10 hover:border-[#4A6741]/30 shadow-sm hover:shadow"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter("IoT Solution")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === "IoT Solution"
                  ? "bg-[#2C3A2F] text-white shadow-lg"
                  : "bg-white hover:bg-[#4A6741]/5 border border-[#2C3A2F]/10 hover:border-[#4A6741]/30 shadow-sm hover:shadow"
              }`}
            >
              IoT Solutions
            </button>
            <button
              onClick={() => setActiveFilter("Digital Solution")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === "Digital Solution"
                  ? "bg-[#2C3A2F] text-white shadow-lg"
                  : "bg-white hover:bg-[#4A6741]/5 border border-[#2C3A2F]/10 hover:border-[#4A6741]/30 shadow-sm hover:shadow"
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
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full transform hover:-translate-y-2"
            >
              {/* Top decoration line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2C3A2F] to-[#4A6741] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              <div className="p-4">
                <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#2C3A2F]/40 via-[#4A6741]/35 to-primary/30 shadow-md aspect-square">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 p-3 filter brightness-110 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2C3A2F]/50 via-[#4A6741]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[#4A6741]/15 text-[#2C3A2F] rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold mb-2 text-[#2C3A2F] group-hover:text-[#4A6741] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-[#4A6741] hover:text-[#2C3A2F] transition-colors group-hover:underline"
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
