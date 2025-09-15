import React, { useState, useEffect } from "react";

const Navbar = ({ content = {} }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Helper function to get content value by key
  const getContentValue = (key, defaultValue = '') => {
    const contentArray = content.navbar || [];
    const item = contentArray.find(item => item.key === key);
    return item ? item.value : defaultValue;
  };

  const logoText = getContentValue('logo_text', 'OmahIoT');
  const logoImage = getContentValue('logo_image', '/assets/images/logo_omahiot.png');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      const sections = ["home", "about", "projects", "portfolio", "clients", "contact"];
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "portfolio", label: "Portfolio" },
    { id: "clients", label: "Clients" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="h-10 hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center">
            <img
              src={logoImage}
              alt={logoText}
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    activeSection === id
                      ? isScrolled 
                        ? "text-[hsl(148,41%,58%)] font-semibold"
                        : "text-white font-semibold"
                      : isScrolled
                        ? "text-[hsl(210,72%,25%)] hover:text-[hsl(148,41%,58%)]"
                        : "text-white/90 hover:text-white"
                  }
                `}
              >
                {label}
                {activeSection === id && (
                  <span 
                    className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full transition-all duration-300
                      ${
                        isScrolled 
                          ? "bg-[hsl(148,41%,58%)]" 
                          : "bg-white"
                      }
                    `} 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300
                ${
                  isScrolled
                    ? "text-[hsl(210,72%,25%)] hover:text-[hsl(148,41%,58%)]"
                    : "text-white hover:text-white"
                }
              `}
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div 
              className={`flex flex-col space-y-1 rounded-xl p-3 mt-2 backdrop-blur-lg border transition-all duration-300
                ${
                  isScrolled
                    ? "bg-white/95 border-gray-200/50"
                    : "bg-white/10 border-white/20"
                }
              `}
            >
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      activeSection === id
                        ? isScrolled
                          ? "text-[hsl(148,41%,58%)] font-semibold"
                          : "text-white font-semibold"
                        : isScrolled
                          ? "text-[hsl(210,72%,25%)] hover:text-[hsl(148,41%,58%)]"
                          : "text-white/90 hover:text-white"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;